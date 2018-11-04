import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i) } />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      winner: null,
      xIsNext: true,
    };
  }

  handleClick(i) {
    if (this.state.winner) {
      return;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const squares = getSquares(history);
    if (squares[i]) {
      return;
    }

    squares[i] = player(this.state.xIsNext);
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });

    this.checkWinner(squares);
  }

  checkWinner(squares) {
    this.setState({
      winner: calculateWinner(squares),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });

    const history = this.state.history.slice(0, step + 1);
    const squares = getSquares(history);
    this.checkWinner(squares);
  }

  render() {
    const fullHistory = this.state.history.slice();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const status = this.state.winner ?
      'Winner: ' + this.state.winner :
      'Next player: ' + player(this.state.xIsNext);

    const moves = fullHistory.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={getSquares(history)}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function getSquares(history) {
  const current = history[history.length - 1];
  return current.squares.slice();
}

function player(xIsNext) {
  return xIsNext ? 'X' : 'O';
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
  let result = null;
  lines.some(line => {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      result = squares[a];
      return true;
    }
    return false;
  });
  return result;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
