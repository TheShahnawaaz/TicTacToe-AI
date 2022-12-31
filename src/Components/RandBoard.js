import React from "react";
import Board from "./Board";
import Reset from "./Reset";
const RandBoard = () => {
  const sqrname = [
    "Top-left",
    "Top-middle",
    "Top-right",
    "Middle-left",
    "Center",
    "Middle-right",
    "Bottom-left",
    "Bottom-middle",
    "Bottom-right",
  ];

  class Player {
    constructor(letter) {
      this.letter = letter;
    }

    getMove(game) {
      // This function will be overridden in the child classes
    }
  }

  class RandomCP extends Player {
    constructor(letter) {
      super(letter);
    }

    getMove(game) {
      const square =
        game.availableMoves()[
          Math.floor(Math.random() * game.availableMoves().length)
        ];
      return square;
    }
  }

  class HumanP extends Player {
    constructor(letter) {
      super(letter);
    }

    getMove(game) {
      let validSquare = false;
      let val = null;

      while (!validSquare) {
        const square = prompt(`${this.letter}'s turn. Input move(1-9): `);
        //   const square = "1"
        const squareInt = parseInt(square, 10) - 1;
        // console.log(squareInt);
        try {
          val = parseInt(squareInt, 10);
          if (!game.availableMoves().includes(val)) {
            throw new Error();
          }
          validSquare = true;
        } catch (e) {
          //   console.log("Invalid square. Try again.");
          //   setHeading("Invalid square. Try again.");
          game.heading[0] = "Invalid square. Try again.";
          game.heading[1] = "error";
        }
      }

      return val;
    }
  }

  class GenCp extends Player {
    constructor(letter) {
      super(letter);
    }

    getMove(game) {
      if (game.availableMoves().length === 9) {
        const square =
          game.availableMoves()[
            Math.floor(Math.random() * game.availableMoves().length)
          ];
        return square;
      } else {
        return this.minimax(game, this.letter).position;
      }
    }

    minimax(state, player) {
      const maxPlayer = this.letter;
      const otherPlayer = player === "X" ? "O" : "X";

      if (state.currentWinner === otherPlayer) {
        return {
          position: null,
          score:
            otherPlayer === maxPlayer
              ? 1 * (state.numEmptySquares() + 1)
              : -1 * (state.numEmptySquares() + 1),
        };
      } else if (!state.emptySquares()) {
        return { position: null, score: 0 };
      }

      let best;
      if (player === maxPlayer) {
        best = { position: null, score: -Infinity };
      } else {
        best = { position: null, score: Infinity };
      }

      for (const possibleMove of state.availableMoves()) {
        state.makeMove(possibleMove, player);
        const simScore = this.minimax(state, otherPlayer);

        state.board[possibleMove] = " ";
        state.currentWinner = null;
        simScore.position = possibleMove;

        if (player === maxPlayer) {
          if (simScore.score > best.score) {
            best = simScore;
          }
        } else {
          if (simScore.score < best.score) {
            best = simScore;
          }
        }
      }

      return best;
    }
  }

  class TicTacToe {
    constructor() {
      this.board = new Array(9).fill(" ");
      this.heading = new Array(2).fill("WElCOME");
      this.heading[1] = "info";
      this.currentWinner = null;
    }

    printBoard() {
      for (let i = 0; i < this.board.length; i += 3) {
        console.log(
          `| ${this.board[i]} | ${this.board[i + 1]} | ${this.board[i + 2]} |`
        );
      }
    }

    static printBoardNums() {
      const numBoard = [...new Array(3)].map((_, i) =>
        [...new Array(3)].map((_, j) => i * 3 + j)
      );
      for (const row of numBoard) {
        console.log(`| ${row.join(" | ")} |`);
      }
    }

    availableMoves() {
      return this.board
        .map((square, i) => (square === " " ? i : null))
        .filter((x) => x !== null);
    }

    emptySquares() {
      return this.board.includes(" ");
    }

    numEmptySquares() {
      return this.board.filter((square) => square === " ").length;
    }

    makeMove(square, letter) {
      if (this.board[square] === " ") {
        this.board[square] = letter;
        if (this.winner(square, letter)) {
          this.currentWinner = letter;
        }
        return true;
      }
      return false;
    }

    winner(square, letter) {
      const rowInd = Math.floor(square / 3);
      const row = this.board.slice(rowInd * 3, (rowInd + 1) * 3);
      if (row.every((spot) => spot === letter)) {
        return true;
      }

      const colInd = square % 3;
      // const column = [this.board[colInd + i * 3] for (const i of [0, 1, 2])];
      const column = [];
      for (let i = 0; i < 3; i++) {
        column.push(this.board[colInd + i * 3]);
      }

      if (column.every((spot) => spot === letter)) {
        return true;
      }

      if (square % 2 === 0) {
        //   const diagonal1 = [this.board[i] for (const i of [0, 4, 8])];
        const diagonal1 = [];
        for (let i = 0; i < 3; i++) {
          diagonal1.push(this.board[i * 4]);
        }

        if (diagonal1.every((spot) => spot === letter)) {
          return true;
        }
        //   const diagonal2 = [this.board[i] for (const i of [2, 4, 6])];
        const diagonal2 = [];
        for (let i = 0; i < 3; i++) {
          diagonal2.push(this.board[2 + i * 2]);
        }

        if (diagonal2.every((spot) => spot === letter)) {
          return true;
        }
      }

      return false;
    }
  }

  function play(game, Xp, Op, printGame = true, letter, square) {
    if (printGame) {
    //   TicTacToe.printBoardNums();
    }

    //   let letter = "O";

    //   while (game.emptySquares()) {
    //   let square;
    if (letter === "O") {
      square = Op.getMove(game);
    }

    if (game.makeMove(square, letter)) {
      if (printGame) {
        // setHeading(`${letter} makes a move to square ${square + 1}`);
        game.heading[0] = `${letter === "X" ? "You" : "AI"} made a move to ${
          sqrname[square]
        }`;
        game.heading[1] = "info";
        // console.log(`${letter} made a move to square ${square + 1}`);
        // console.log(game.heading);
        // game.printBoard();
        // console.log("");
      }

      if (game.currentWinner) {
        if (printGame) {
          //   setTimeout(() => {
          game.heading[0] = `${letter === "X" ? "You Wins!!" : "AI Wins!!"}`;
          game.heading[1] = `${letter === "X" ? "success" : "error"}`;

          // alert(`${letter} wins!`);
          //   }, 1000);
          for (let i = 0; i < 9; i++) {
            if (game.board[i] === " ") game.board[i] = "  ";
          }
        }
        return letter;
      }

      letter = letter === "X" ? "O" : "X";

      // }
    }


    if (printGame && game.emptySquares() === false && !game.currentWinner) {
      //   console.log("It's a tie.");

      game.heading[0] = "It's a tie.";
      game.heading[1] = "warning";
    }
  }

  const turn = (square) => {
    play(game, Xp, Op, true, "X", square);

    setTimeout(() => {
      play(game, Xp, Op, true, "O", square);
    }, 500);
  };

  const game = new TicTacToe();
  const Xp = new HumanP("X");
  const Op = new RandomCP("O");
  //   console.log("X goes first.");
  // play(game, Xp, Op, true);
  return (
    <div>
      <Board turn={turn} heading={game.heading} board={game.board} />
      <br />
      <Reset difficulty="easy" />
    </div>
  );
};

export default RandBoard;
