import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="w-full h-[100px] bg-blue-600  border-black font-bold border-2 text-2xl text-red-900" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Move: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status font-bold text-center mt-5 text-4xl text-ellipsis">Tic-Tac-Toe</div>
      <div className=' w-full h-full items-center justify-center text-center'>
        <div className="board grid grid-cols-3 gap-x-0 w-[300px] items-center text-center justify-center ml-[770px] mt-5">
          {squares.map((value, index) => (
            <Square key={index} value={value} onSquareClick={() => handleClick(index)}  />
          ))}
        </div>
      </div>
      <div className="status font-bold text-center mt-5 text-2xl">{status}</div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
        <>
        <div>
          <li key={move}>
            <div>
              <button onClick={() => jumpTo(move)} className=' border-6 border-black text-white bg-black p-3 h-[60px] w-[200px] mt-2 ml-7 font-bold'>{description}</button>
            </div>
          </li>
        </div>
        </>
    );
  });

  return (
    <div className="game">
      <div className="game-board bg-blue-">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
