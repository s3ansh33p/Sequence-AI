// imports
import { checkForWinner, checkForSequence, drawGame } from "./game.js";


const testBoard = [
    [
      { value: 0, player: 1, turn: 1, cardPlayed: 50 },
      { value: 1, player: 1, turn: 95, cardPlayed: 1 },
      { value: 2, player: 1, turn: 29, cardPlayed: 2 },
      { value: 3, player: 1, turn: 75, cardPlayed: 3 },
      { value: 4, player: 2, turn: 20, cardPlayed: 4 },
      { value: 5, player: 2, turn: 32, cardPlayed: 5 },
      { value: 6, player: 1, turn: 15, cardPlayed: 6 },
      { value: 7, player: 1, turn: 97, cardPlayed: 7 },
      { value: 8, player: 1, turn: 93, cardPlayed: 8 },
      { value: 0, player: 1, turn: 7, cardPlayed: 25 }
    ],
    [
      { value: 18, player: 2, turn: 88, cardPlayed: 18 },
      { value: 17, player: 1, turn: 23, cardPlayed: 17 },
      { value: 16, player: 1, turn: 69, cardPlayed: 16 },
      { value: 15, player: 1, turn: 77, cardPlayed: 15 },
      { value: 14, player: 2, turn: 68, cardPlayed: 14 },
      { value: 52, player: 2, turn: 62, cardPlayed: 52 },
      { value: 51, player: 2, turn: 78, cardPlayed: 51 },
      { value: 50, player: null, turn: null, cardPlayed: null },
      { value: 48, player: 2, turn: 30, cardPlayed: 48 },
      { value: 9, player: 2, turn: 40, cardPlayed: 9 }
    ],
    [
      { value: 19, player: 1, turn: 3, cardPlayed: 19 },
      { value: 13, player: 1, turn: 35, cardPlayed: 13 },
      { value: 27, player: 1, turn: 85, cardPlayed: 27 },
      { value: 28, player: 1, turn: 53, cardPlayed: 28 },
      { value: 29, player: 2, turn: 86, cardPlayed: 29 },
      { value: 30, player: 2, turn: 10, cardPlayed: 23 },
      { value: 31, player: 1, turn: 60, cardPlayed: 31 },
      { value: 32, player: 2, turn: 84, cardPlayed: 32 },
      { value: 47, player: 2, turn: 50, cardPlayed: 47 },
      { value: 11, player: 2, turn: 70, cardPlayed: 11 }
    ],
    [
      { value: 20, player: null, turn: null, cardPlayed: null },
      { value: 12, player: 2, turn: 26, cardPlayed: 12 },
      { value: 18, player: 2, turn: 16, cardPlayed: 18 },
      { value: 17, player: 2, turn: 82, cardPlayed: 17 },
      { value: 16, player: 2, turn: 98, cardPlayed: 16 },
      { value: 15, player: 1, turn: 89, cardPlayed: 15 },
      { value: 14, player: 1, turn: 45, cardPlayed: 14 },
      { value: 33, player: 1, turn: 61, cardPlayed: 33 },
      { value: 46, player: 1, turn: 25, cardPlayed: 46 },
      { value: 12, player: 2, turn: 18, cardPlayed: 36 }
    ],
    [
      { value: 21, player: 1, turn: 19, cardPlayed: 21 },
      { value: 11, player: 2, turn: 22, cardPlayed: 11 },
      { value: 19, player: 1, turn: 37, cardPlayed: 19 },
      { value: 44, player: null, turn: null, cardPlayed: null },
      { value: 43, player: 1, turn: 9, cardPlayed: 43 },
      { value: 42, player: null, turn: 59, cardPlayed: 10 },
      { value: 52, player: 2, turn: 96, cardPlayed: 52 },
      { value: 34, player: 2, turn: 80, cardPlayed: 34 },
      { value: 45, player: 2, turn: 14, cardPlayed: 45 },
      { value: 13, player: 2, turn: 74, cardPlayed: 36 }
    ],
    [
      { value: 22, player: 2, turn: 54, cardPlayed: 22 },
      { value: 9, player: 1, turn: 79, cardPlayed: 9 },
      { value: 20, player: 2, turn: 12, cardPlayed: 20 },
      { value: 45, player: 2, turn: 92, cardPlayed: 45 },
      { value: 40, player: 1, turn: 65, cardPlayed: 40 },
      { value: 41, player: 2, turn: 56, cardPlayed: 41 },
      { value: 51, player: 2, turn: 100, cardPlayed: 51 },
      { value: 35, player: 1, turn: 11, cardPlayed: 35 },
      { value: 44, player: 2, turn: 28, cardPlayed: 44 },
      { value: 27, player: 1, turn: 39, cardPlayed: 27 }
    ],
    [
      { value: 24, player: 2, turn: 6, cardPlayed: 24 },
      { value: 8, player: 2, turn: 64, cardPlayed: 8 },
      { value: 21, player: null, turn: 13, cardPlayed: 10 },
      { value: 46, player: 2, turn: 58, cardPlayed: 46 },
      { value: 47, player: 2, turn: 36, cardPlayed: 47 },
      { value: 48, player: 2, turn: 72, cardPlayed: 48 },
      { value: 50, player: null, turn: 90, cardPlayed: 49 },
      { value: 37, player: 1, turn: 33, cardPlayed: 37 },
      { value: 43, player: 1, turn: 17, cardPlayed: 43 },
      { value: 28, player: 2, turn: 76, cardPlayed: 28 }
    ],
    [
      { value: 25, player: 1, turn: 49, cardPlayed: 25 },
      { value: 7, player: 1, turn: 63, cardPlayed: 7 },
      { value: 22, player: 1, turn: 31, cardPlayed: 22 },
      { value: 24, player: 1, turn: 57, cardPlayed: 24 },
      { value: 25, player: null, turn: null, cardPlayed: null },
      { value: 26, player: 2, turn: 34, cardPlayed: 26 },
      { value: 39, player: 1, turn: 71, cardPlayed: 39 },
      { value: 38, player: 2, turn: 8, cardPlayed: 38 },
      { value: 42, player: 2, turn: 52, cardPlayed: 42 },
      { value: 29, player: 1, turn: 73, cardPlayed: 29 }
    ],
    [
      { value: 26, player: null, turn: 24, cardPlayed: 49 },
      { value: 6, player: 1, turn: 81, cardPlayed: 6 },
      { value: 5, player: 1, turn: 51, cardPlayed: 5 },
      { value: 4, player: 1, turn: 91, cardPlayed: 4 },
      { value: 3, player: 2, turn: 94, cardPlayed: 3 },
      { value: 2, player: 1, turn: 55, cardPlayed: 2 },
      { value: 1, player: 2, turn: 44, cardPlayed: 1 },
      { value: 40, player: 1, turn: 99, cardPlayed: 40 },
      { value: 41, player: 1, turn: 43, cardPlayed: 41 },
      { value: 30, player: 1, turn: 67, cardPlayed: 30 }
    ],
    [
      { value: 0, player: 1, turn: 5, cardPlayed: 44 },
      { value: 39, player: 1, turn: 41, cardPlayed: 39 },
      { value: 38, player: 2, turn: 66, cardPlayed: 38 },
      { value: 37, player: 1, turn: 47, cardPlayed: 37 },
      { value: 35, player: 2, turn: 46, cardPlayed: 35 },
      { value: 34, player: 2, turn: 38, cardPlayed: 34 },
      { value: 33, player: 1, turn: 83, cardPlayed: 33 },
      { value: 32, player: 2, turn: 48, cardPlayed: 32 },
      { value: 31, player: 1, turn: 87, cardPlayed: 31 },
      { value: 0, player: 2, turn: 2, cardPlayed: 23 }
    ]
];


drawGame({ board: testBoard, player1: { hand: [] }, player2: { hand: [] } })
// test winner
const winner = checkForWinner(testBoard);
console.log(winner);

console.log(checkForSequence([1,2,1,2,2,2,2,2]))
console.log(checkForSequence([2,null,null,null,null,null,null,1]))