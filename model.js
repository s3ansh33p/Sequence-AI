import * as tf from '@tensorflow/tfjs';

// use CPU
// tf.setBackend('cpu');

// ACTION SPACE: (number from 0-35)
// OBSERVATION SPACE: Array with [10][10][4] (board) + [36] (possible moves) + [1] (turn counter)
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


