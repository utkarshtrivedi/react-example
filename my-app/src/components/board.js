import React from 'react';
import { Square } from './square.js';
import { convertRowColumnToIndices } from "../utils";
export function Board(props) {
    return (<div>
        {props.squares.map((squaresRow, rowIndex) => {
            return (<div key={rowIndex} className="board-row">
                {squaresRow.map((square, columnIndex) => {
                    return (<Square key={columnIndex} value={square} onClick={() => props.onClick(rowIndex, columnIndex)} highLight={props.winingIndices.includes(convertRowColumnToIndices(rowIndex, columnIndex))} />);
                })}
            </div>);
        })}
    </div>);
}