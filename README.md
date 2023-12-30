## Sequence-AI

Side project to play around/learn some AI techniques.
Made to hopefully give optimal play for the [Sequence Board Game](https://en.wikipedia.org/wiki/Sequence_(game))

In work-in-progress state, but currently has game logic and an AI that can play the game (albeit with random moves).
There is an issue with predictions choosing actions that are outside of the legal moves, which will hopefully be fixed soon.

### Installation

Uses Tensorflow on NodeJS

```
git clone https://github.com/s3ansh33p/Sequence-AI
cd Sequence-AI
npm install
```

### Usage

```
node mock.js # runs a mock game with random moves
node model.js # AI WIP
node test.js # some tests around win logic
```
