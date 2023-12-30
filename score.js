/**
 * @description Gives a score to a board state for a player.
 * @param {Object} game The game state.
 * @param {String} player The player to score.
 * @returns {Number} The score for the player.
 */
function scoreBoard(game, player) {
    /*
        Logic:
        - Any sequence of 5-in-a-row is worth 100 points
        - Any sequence of 4-in-a-row is worth 20 points
        - Any sequence of 3-in-a-row is worth 5 points
        - Any sequence of 2-in-a-row is worth 1 point
    */
    let score = 0;
    const board = game.board;
    // Check for horizontal sequences
    for (let i = 0; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < board[i].length; j++) {
            sequence.push(board[i][j].player);
        }
        score += scoreSequence(sequence, player);
    }
    // Check for vertical sequences
    for (let i = 0; i < board.length; i++) {
        let sequence = [];
        for (let j = 0; j < board[i].length; j++) {
            sequence.push(board[j][i].player);
        }
        score += scoreSequence(sequence, player);
    }
    // Check for diagonal sequences
    let sequence = [];
    for (let i = 0; i < board.length; i++) {
        sequence.push(board[i][i].player);
    }
    score += scoreSequence(sequence, player);
    sequence = [];
    for (let i = 0; i < board.length; i++) {
        sequence.push(board[i][board.length - 1 - i].player);
    }
    score += scoreSequence(sequence, player);
    return score;
}

/**
 * @description Gives a score to a sequence of players.
 * @param {Array} sequence The sequence to score.
 * @param {String} player The player to score.
 * @returns {Number} The score for the player.
 */
function scoreSequence(sequence, player) {
    let score = 0;
    let count = 0;
    for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] === player) {
            count++;
        } else {
            count = 0;
        }
        if (count === 5) {
            score += 100;
        } else if (count === 4) {
            score += 20;
        } else if (count === 3) {
            score += 5;
        } else if (count === 2) {
            score += 1;
        }
    }
    return score;
}

// export
module.exports = { scoreBoard };
