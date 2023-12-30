import * as tf from '@tensorflow/tfjs';
import { initializeGame, dealCards, drawCard, playCard, nextPlayer, getValidMoves, drawGame } from "./game.js";
import { scoreBoard } from "./score.js";

const DEBUG = false;

// use CPU
tf.setBackend('cpu');

// UPDATE: POSSIBLE MOVES COULD BE CLOSE TO 600 DUE TO JACKS BEING WILDS

// ACTION SPACE: (number from 0-35)
// OBSERVATION SPACE: Array with [10][10][4] (board) + [600] (possible moves) + [1] (turn counter)
// i.e [ [ [ [0, 0, 0, 0], [0, 0, 0, 0], ... ], ... ], [0, 0, 0, 0, ...], 0 ]
// where [0, 0, 0, 0] is a space on the board with [player, turn, cardPlayed, value]

// STARTING STATE: [ [ [ [null, null, null, 0], [null, null, null, 0], ... ], ... ], [1, 1, 1, 1, ...], 0 ]
// Each of the spaces value is constant (maybe this can be reworked / redundant?)

// REWARDS:
// 100 for winning
// -100 for losing
// 0 for tie
// -1 for each turn taken (incentivize shorter games / more aggressive play)
// In a given state:
// 4-in-a-row is worth 20 points
// 3-in-a-row is worth 5 points
// 2-in-a-row is worth 1 point

// ENDS WHEN:
// No valid moves for player - tie
// Board is full - tie
// Player wins - player wins


// ========== [ MODEL START ] ==========

// Using as reference:
//  - https://github.com/tensorflow/tfjs-examples/blob/master/snake-dqn/dqn.js
//  - https://gymnasium.farama.org/environments/toy_text/blackjack/

// [!] SKIPPING TURN COUNTER FOR NOW

const outputSize = 600;

// two input layers
const input1 = tf.input({shape: [10, 10, 4]});
const input2 = tf.input({shape: [outputSize]}); // [!] THIS WILL NEED TO BE REVISED!!!

// flatten inputs
const flat1 = tf.layers.flatten().apply(input1);

// join input layers
const merged = tf.layers.concatenate().apply([flat1, input2]);

// hidden layers
const dense1 = tf.layers.dense({ units: 128, activation: 'relu' }).apply(merged);

// output layer
const output = tf.layers.dense({ units: outputSize, activation: 'softmax' }).apply(dense1);

const model = tf.model({ inputs: [input1, input2], outputs: output });

// compile model
model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy']});
model.summary();

// ========== [ MODEL END ] ==========

// ========== [ TRAINING START ] ==========

function getAction(game) {
    // get valid moves for player
    let validMoves = getValidMoves(game);
    // if no valid moves, then game ends in tie
    if (validMoves.length === 0) {
        return null;
    } else {
        // do random move
        let rand = Math.floor(Math.random() * validMoves.length);
        let move = validMoves[rand];
        return move;
    }
}

function getReward(game) {
    // get winner
    let winner = game.winner;
    // if tie
    if (winner === null) {
        return 0;
    } else {
        // if player won
        if (winner === 0) {
            return 100;
        } else {
            return -100;
        }
    }
}

function getObservation(game) {
    let observation = [];
    let input1 = [];
    let input2 = [];
    // add board
    for (let i = 0; i < game.board.length; i++) {
        for (let j = 0; j < game.board[i].length; j++) {
            let space = game.board[i][j];
            input1.push(space.player);
            input1.push(space.turn);
            input1.push(space.cardPlayed);
            input1.push(space.value);
        }
    }
    // add valid moves
    let validMoves = getValidMoves(game);
    if (DEBUG) console.log("getObservation() - validMoves: ", validMoves);
    for (let i = 0; i < validMoves.length; i++) {
        let move = validMoves[i];
        let index = move.row * 10 + move.col;
        input2.push(index);
    }
    // add inputs to observation
    observation.push(input1);
    observation.push(input2);
    return observation;
}

function getObservationTensor(game) {
    let observation = getObservation(game);
    if (DEBUG) console.log("getObservationTensor() - length: ", observation[0].length, observation[1].length);
    let tensor1 = tf.tensor3d(observation[0], [10, 10, 4]);
    
    // Add a batch dimension to tensor1
    tensor1 = tensor1.expandDims(0);

    // Pad observation[1] with zeros if it has less than outputSize elements
    while (observation[1].length < outputSize) {
        observation[1].push(0);
    }

    let tensor2 = tf.tensor2d(observation[1], [1, outputSize]);
    if (DEBUG) console.log("getObservationTensor() - tensor: ", tensor1.shape, tensor2.shape);

    return [tensor1, tensor2];
}

function getActionTensor(action) {
    let tensor = tf.tensor2d([action]);
    return tensor;
}

function getRewardTensor(reward) {
    let tensor = tf.tensor2d([reward], [1, 1]);
    return tensor;
}

function getPrediction(game) {
    if (DEBUG) console.log("getPrediction()");
    let observation = getObservationTensor(game);
    if (DEBUG) console.log("getPrediction() - tensor: ", observation[0].shape, observation[1].shape);
    let prediction = model.predict(observation);
    return prediction;
}

function getActionFromPrediction(prediction) {
    let action = tf.argMax(prediction, 1).dataSync();
    return action;
}

async function trainModel(game, action, reward) {
    if (DEBUG) console.log("trainModel()");
    let observation = getObservationTensor(game);
    if (DEBUG) console.log("trainModel() - tensor: ", observation[0].shape, observation[1].shape);
    let rewardTensor = getRewardTensor(reward);
    if (DEBUG) console.log("trainModel() - before fit");
    // Create a one-hot encoded tensor for the action taken
    if (DEBUG) console.log(typeof action, action);

    let actionTensor = tf.oneHot(tf.tensor1d(action, 'int32'), outputSize);

    // Apply the reward to the action taken
    let targetTensor = actionTensor.mul(rewardTensor);

    await model.fit(observation, targetTensor, {epochs: 1});
    if (DEBUG) console.log("trainModel() - after fit");
}

// on each move, train model
async function trainGame(game) {
    // get prediction
    let prediction = getPrediction(game);
    // get action
    let action = getActionFromPrediction(prediction);
    // get reward
    let reward = getReward(game);
    // train model
    await trainModel(game, action, reward);
}

// ========== [ TRAINING END ] ==========

// ========== [ PLAYING START ] ==========

async function playGame() {
    // mock game
    let game = initializeGame();
    game = dealCards(game);
    game.currentPlayer = "player1";
    while (game.winner === null) {
        // get prediction
        let prediction = getPrediction(game);
        // if (DEBUG) console.log(prediction);
        // get action
        let action = getActionFromPrediction(prediction);
        // if (DEBUG) console.log(action);
        // if no valid moves, then game ends in tie
        if (action === -1) {
            game.winner = "Tie";
        } else {
            // do move
            let validMoves = getValidMoves(game);
            
            // [!] THIS WILL NEED TO BE REVISED!!!
            if (action >= validMoves.length) {
                console.log("WARNING: INVALID ACTION (" + action + "/" + validMoves.length + ")");
                action = validMoves.length - 1;
            }

            // [!] IF ACTION IS -1, ERROR
            if (action === -1) {
                console.log("ERROR: NO VALID MOVES");
                console.log(game);
                break;
            }
            
            let move = validMoves[action];
            
            
            // SJ or HJ
            if (move.card === 10 || move.card === 49) {
                console.log("Turn " + game.turn + ": " + game.currentPlayer + " removes marker at (" + move.row + ", " + move.col + ") with " + move.card);
            } else {
                console.log("Turn " + game.turn + ": " + game.currentPlayer + " plays " + move.card + " at (" + move.row + ", " + move.col + ")");
            }
            game = playCard(game, move.row, move.col, move.card);
            // draw card
            game = drawCard(game);
            // change player
            game = nextPlayer(game);
            // show game
            drawGame(game);
            // score the board for both players
            let p1Score = scoreBoard(game, 1);
            let p2Score = scoreBoard(game, 2);
            console.log("Player 1 Score: " + p1Score);
            console.log("Player 2 Score: " + p2Score);
        }
        // check if winner  
        if (game.winner !== null) {
            console.log(game.winner + " wins!");
        }
        // train model
        await trainGame(game);
    }
}

// ========== [ PLAYING END ] ==========

playGame();
