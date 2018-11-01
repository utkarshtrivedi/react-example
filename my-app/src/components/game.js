import React from 'react';
import { Board } from './board';
import { arrayClone, calculateWinner } from "../utils";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        const squares = [
            Array(3).fill(null),
            Array(3).fill(null),
            Array(3).fill(null),
        ];
        this.state = {
            history: [
                {
                    squares: squares,
                    winingIndices: []
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            isMoveAscending: true,
        };
    }
    handleClick(row, col) {
        const history = arrayClone(this.state.history).slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = arrayClone(current.squares);
        if (calculateWinner(squares).player || squares[row][col]) {
            return;
        }
        squares[row][col] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    moveDesc: `(${row},${col})`,
                    winingIndices: calculateWinner(squares).indices
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
    sortMoves() {
        this.setState({
            isMoveAscending: !this.state.isMoveAscending
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares).player;
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' ' + step.moveDesc :
                'Go to game start';
            const className = this.state.stepNumber === move ? "bold" : "";
            return (<li key={move}>
                <button className={className} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>);
        });
        let status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (<div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(row, col) => this.handleClick(row, col)} winingIndices={current.winingIndices} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{this.state.isMoveAscending ? moves : moves.reverse()}</ol>
                <div><button onClick={() => this.sortMoves()}>Sort</button></div>
            </div>
        </div>);
    }
}