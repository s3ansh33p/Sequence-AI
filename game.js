/**
 * @description Contains the game logic for Sequence.
 */

/**
 * @description This is the board layout for the game.
 */
const board = [
    ["B",  "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "B"],
    ["C6", "C5", "C4", "C3", "C2", "HA", "HK", "HQ", "H10","S10"],
    ["C7", "SA", "D2", "D3", "D4", "D5", "D6", "D7", "H9", "SQ"],
    ["C8", "SK", "C6", "C5", "C4", "C3", "C2", "D8", "H8", "SK"],
    ["C9", "SQ", "C7", "H6", "H5", "H4", "HA", "D9", "H7", "SA"],
    ["C10","S10","C8", "H7", "H2", "H3", "HK", "D10","H6", "D2"],
    ["CQ", "S9", "C9", "H8", "H9", "H10","HQ", "DQ", "H5", "D3"],
    ["CK", "S8", "C10","CQ", "CK", "CA", "DA", "DK", "H4", "D4"],
    ["CA", "S7", "S6", "S5", "S4", "S3", "S2", "H2", "H3", "D5"],
    ["B",  "DA", "DK", "DQ", "D10","D9", "D8", "D7", "D6", "B"]
]

// value map from strings to numbers for model
const valueMap = {
    "B": 0,
    "S2": 1,
    "S3": 2,
    "S4": 3,
    "S5": 4,
    "S6": 5,
    "S7": 6,
    "S8": 7,
    "S9": 8,
    "S10": 9,
    "SJ": 10,
    "SQ": 11,
    "SK": 12,
    "SA": 13,
    "C2": 14,
    "C3": 15,
    "C4": 16,
    "C5": 17,
    "C6": 18,
    "C7": 19,
    "C8": 20,
    "C9": 21,
    "C10": 22,
    "CJ": 23,
    "CQ": 24,
    "CK": 25,
    "CA": 26,
    "D2": 27,
    "D3": 28,
    "D4": 29,
    "D5": 30,
    "D6": 31,
    "D7": 32,
    "D8": 33,
    "D9": 34,
    "D10": 35,
    "DJ": 36,
    "DQ": 37,
    "DK": 38,
    "DA": 39,
    "H2": 40,
    "H3": 41,
    "H4": 42,
    "H5": 43,
    "H6": 44,
    "H7": 45,
    "H8": 46,
    "H9": 47,
    "H10": 48,
    "HJ": 49,
    "HQ": 50,
    "HK": 51,
    "HA": 52
};

/**
 * @description This is the deck of cards for the game.
 */
function createDeck() {
    let deck = [];
    let suits = ["S", "H", "D", "C"];
    let cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < cards.length; j++) {
            // deck.push(suits[i] + cards[j]);
            // deck.push(suits[i] + cards[j]);
            // use valueMap
            deck.push(valueMap[suits[i] + cards[j]]);
            deck.push(valueMap[suits[i] + cards[j]]);
        }
    }
    return deck;
}

/**
 * @description Shuffles the deck of cards.
 */
function shuffleDeck() {
    let deck = createDeck();
    for (let i = 0; i < deck.length; i++) {
        let rand = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[rand];
        deck[rand] = temp;
    }
    return deck;
}

/**
 * @description Creates the game board by adding the player, turn and cardPlayed properties to each space.
 */
function createBoard() {
    let gameBoard = board;
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            gameBoard[i][j] = {value: valueMap[gameBoard[i][j]], player: null, turn: null, cardPlayed: null};
        }
    }
    return gameBoard;
}

/**
 * @description Determine if there are any 5-in-a-row sequences on the board, and which player has won.
 * @param {Array} board The game board.
 * @returns {Number} The player that has won, or null if there is no winner.
 */
function checkForWinner(board) {
    let winner = null;
    // Check for horizontal sequences
    for (let i = 0; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < board[i].length; j++) {
            sequence.push(board[i][j].player);
        }
        if (checkForSequence(sequence)) {
            winner = sequence[0];
        }
    }
    // Check for vertical sequences
    for (let i = 0; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < board[i].length; j++) {
            sequence.push(board[j][i].player);
        }
        if (checkForSequence(sequence)) {
            winner = sequence[0];
        }
    }
    // Check for diagonal sequences
    let sequence = [];
    for (let i = 0; i < board.length; i++) {
        sequence.push(board[i][i].player);
    }
    if (checkForSequence(sequence)) {
        winner = sequence[0];
    }
    sequence = [];
    for (let i = 0; i < board.length; i++) {
        sequence.push(board[i][board.length - 1 - i].player);
    }
    if (checkForSequence(sequence)) {
        winner = sequence[0];
    }
    return winner;
}

/**
 * @description Determines if there is a sequence of 5-in-a-row.
 * @param {Array} sequence The sequence to check.
 * @returns {Boolean} True if there is a sequence, false otherwise.
 */
function checkForSequence(sequence) {
    let isSequence = false;
    let player = sequence[0];
    if (player !== null) {
        let count = 0;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] === player) {
                count++;
            } else {
                count = 0;
            }
            if (count === 5) {
                isSequence = true;
            }
        }
    }
    return isSequence;
}

/**
 * @description Creates new game state
 * @returns {Object} The new game state
 */
export function initializeGame() {
    let game = {
        board: createBoard(),
        deck: shuffleDeck(),
        player1: {
            name: "Player 1",
            hand: [],
            id: 1
        },
        player2: {
            name: "Player 2",
            hand: [],
            id: 2
        },
        currentPlayer: null,
        winner: null,
        turn: 1
    }
    return game;
}

/**
 * @description Deals the cards to the players.
 * @param {Object} game The game state.
 * @returns {Object} The updated game state.
 */
export function dealCards(game) {
    for (let i = 0; i < 6; i++) {
        game.player1.hand.push(game.deck.pop());
        game.player2.hand.push(game.deck.pop());
    }
    return game;
}

/**
 * @description Draw a card from the deck (if possible).
 * @param {Object} game The game state.
 * @returns {Object} The updated game state.
 */
export function drawCard(game) {
    if (game.deck.length > 0) {
        let card = game.deck.pop();
        game[game.currentPlayer].hand.push(card);
    }
    return game;
}

/**
 * @description Changes to next player.
 * @param {Object} game The game state.
 * @returns {Object} The updated game state.
 */
export function nextPlayer(game) {
    // get keys that start with player
    let keys = Object.keys(game);
    let players = [];
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].startsWith("player")) {
            players.push(keys[i]);
        }
    }
    // get index of current player
    let index = players.indexOf(game.currentPlayer);
    // get next player
    let nextIndex = (index + 1) % players.length;
    game.currentPlayer = players[nextIndex];
    return game;
}

/**
 * @description Determines if a move is valid
 * @param {Object} game The game state.
 * @param {Number} row The row of the move.
 * @param {Number} col The column of the move.
 * @param {String} card The card played.
 * @param {String} player The player making the move.
 * @returns {Boolean} True if the move is valid, false otherwise.
 */
function isValidMove(game, row, col, card, player) {
    let isValid = false;
    // Jack of Spades or Hearts can be used to remove a marker from the board
    if (card === 10 || card === 49) {
        let space = game.board[row][col];
        if (space.player !== null && space.player !== player) {
            isValid = true;
        }
    }

    // If corner, then any card can be played
    const validCorner = (row === 0 && col === 0) || (row === 0 && col === 9) || (row === 9 && col === 0) || (row === 9 && col === 9);
    let space = game.board[row][col];
    if (validCorner && space.player === null) {
        isValid = true;
    } else {
        // Jack of Clubs or Diamonds can be played on any space
        if (space.player === null && (space.value === card || card === 23 || card === 36))
        {
            isValid = true;
        }
    }
    return isValid;
}

/**
 * @description Plays a card on the board.
 * @param {Object} game The game state.
 * @param {Number} row The row of the move.
 * @param {Number} col The column of the move.
 * @param {String} card The card played.
 * @returns {Object} The updated game state.
 */
export function playCard(game, row, col, card) {
    const player = game.currentPlayer;
    const playerId = game[player].id;
    if (isValidMove(game, row, col, card, playerId)) {

        const hand = game[player].hand;
        
        // Update board
        let space = game.board[row][col];

        // If Jack of Spades or Hearts, then remove marker from board
        if (card === "SJ" || card === "HJ") {
            space.player = null;
        } else {
            space.player = playerId;
        }
        space.turn = game.turn;
        space.cardPlayed = card;
        
        // Remove card from player's hand
        hand.splice(hand.indexOf(card), 1);

        // Increase turn
        game.turn++;

        // Check for winner
        game.winner = checkForWinner(game.board);
    }
    return game;
}

/**
 * @description Gets valid moves for a player.
 * @param {Object} game The game state.
 * @returns {Array} An array of valid moves.
 */
export function getValidMoves(game) {
    let validMoves = [];
    const player = game.currentPlayer;
    const hand = game[player].hand;
    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < game.board.length; j++) {
            for (let k = 0; k < game.board[j].length; k++) {
                if (isValidMove(game, j, k, hand[i], player)) {
                    validMoves.push({row: j, col: k, card: hand[i]});
                }
            }
        }
    }
    return validMoves;
}

/**
 * @description Draws the game board to the console.
 * @param {Object} game The game state.
 */
export function drawGame(game) {
    let board = game.board;
    for (let i = 0; i < board.length; i++) {
        let row = "";
        for (let j = 0; j < board[i].length; j++) {
            let space = board[i][j];
            let color = "\x1b[0m";
            if (space.player === 1) {
                color = "\x1b[34m";
            } else if (space.player === 2) {
                color = "\x1b[31m";
            }
            let value = space.value;
            // pad value with spaces
            while (value.toString().length < 2) {
                value = " " + value;
            }
            row += color + value + "\x1b[0m" + " ";
        }
        console.log(row);
    }
    // draw key at bottom
    console.log("\x1b[34m" + "Player 1" + "\x1b[0m" + " = Blue");
    // show hand
    console.log(game.player1.hand);
    console.log("\x1b[31m" + "Player 2" + "\x1b[0m" + " = Red");
    console.log(game.player2.hand);
    console.log();
}
