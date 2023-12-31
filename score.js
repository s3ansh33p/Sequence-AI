/**
 * @description Gives a score to a board state for a player.
 * @param {Object} game The game state.
 * @param {Number} player The player to score.
 * @returns {Number} The score for the player.
 */
export function scoreBoard(game, player) {
    /*
        Logic:
        - Any sequence of 5-in-a-row/win is worth 100 points
        - Any sequence of 4-in-a-row is worth 20 points
        - Any sequence of 3-in-a-row is worth 5 points
        - Any sequence of 2-in-a-row is worth 1 point
    */
    let score = 0;
    let board = game.board;
    // Check for horizontal sequences
    // console.log("========== [ HORIZONTAL ] ==========");
    for (let i = 0; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < board[i].length; j++) {
            sequence.push(board[i][j].player);
        }
        score += scoreSequence(sequence, player);
    }
    // Check for vertical sequences
    // console.log("========== [ VERTICAL ] ==========");
    for (let i = 0; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < board[i].length; j++) {
            sequence.push(board[j][i].player);
        }
        score += scoreSequence(sequence, player);
    }
    // Check for diagonal sequences
    // console.log("========== [ DIAGONAL ] ==========");

    // console.log("TOP LEFT PASS")
    for (let i = 4; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < i; j++) {
            sequence.push(board[i-j][j].player);
        }
        score += scoreSequence(sequence, player);
    }

    // console.log("MIDDLE TO BOTTOM RIGHT PASS")
    for (let i = 0; i < board.length - 4; i++) {
        let sequence = [];
        for (let j = 0; j < board.length - i; j++) {
            sequence.push(board[i+j][j].player);
        }
        score += scoreSequence(sequence, player);
    }

    // console.log("FLIPPED TOP RIGHT PASS")
    for (let i = 4; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < i; j++) {
            sequence.push(board[j][i-j].player);
        }
        score += scoreSequence(sequence, player);
    }

    // console.log("FLIPPED MIDDLE TO BOTTOM LEFT PASS")
    for (let i = 0; i < board.length - 4; i++) {
        let sequence = [];
        for (let j = 0; j < board.length - i; j++) {
            sequence.push(board[j][i+j].player);
        }
        score += scoreSequence(sequence, player);
    }

    return score;
}

/**
 * @description Gives a score to a sequence for a player.
 * @param {Array} sequence The sequence to score.
 * @param {String} player The player to score.
 * @returns {Number} The score for the player.
 */
export function scoreSequence(sequence, player) {
    /*
        Logic:
        - Any sequence of 5-in-a-row/win is worth 100 points
        - Any sequence of 4-in-a-row is worth 20 points
        - Any sequence of 3-in-a-row is worth 5 points
        - Any sequence of 2-in-a-row is worth 1 point
    */
   const scoreCount = [0, 0, 1, 5, 20, 100]
    let score = 0;
    let count = 0;
    let playerFound = false;
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === player) {
            count++;
            playerFound = true;
        } else {
            if (playerFound) {
                score += scoreCount[count]
            }
            count = 0;
            playerFound = false;
        }
    }
    if (playerFound) {
        score += scoreCount[count]
    }
    return score;
}
    
