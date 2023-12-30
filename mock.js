// imports
const { initializeGame, dealCards, drawCard, playCard, nextPlayer, getValidMoves, drawGame } = require("./game.js");
const { scoreBoard } = require("./score.js");

// mock game
async function mockGame() {
    let game = initializeGame();
    game = dealCards(game);
    game.currentPlayer = "player1";
    while (game.winner === null) {
        await doMockTurn(game);
        // wait 1 second
        drawGame(game);
        // score the board for both players
        let p1Score = scoreBoard(game, "player1");
        let p2Score = scoreBoard(game, "player2");
        console.log("Player 1 Score: " + p1Score);
        console.log("Player 2 Score: " + p2Score);
        // await new Promise(resolve => setTimeout(resolve, 200));
    }

}

async function doMockTurn(game) {
    // get valid moves for player
    let validMoves = getValidMoves(game);
    // if no valid moves, then game ends in tie
    if (validMoves.length === 0) {
        game.winner = "Tie";
    } else {
        // do random move
        let rand = Math.floor(Math.random() * validMoves.length);
        let move = validMoves[rand];
        if (move.card === "SJ" || move.card === "HJ") {
            console.log("Turn " + game.turn + ": " + game.currentPlayer + " removes marker at (" + move.row + ", " + move.col + ") with " + move.card);
        } else {
            console.log("Turn " + game.turn + ": " + game.currentPlayer + " plays " + move.card + " at (" + move.row + ", " + move.col + ")");
        }
        game = playCard(game, move.row, move.col, move.card);
        // draw card
        game = drawCard(game);
        // change player
        game = nextPlayer(game);
    }
    // check if winner  
    if (game.winner !== null) {
        console.log(game.winner + " wins!");
    }
}

mockGame();