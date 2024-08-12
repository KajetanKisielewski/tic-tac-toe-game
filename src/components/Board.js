import React from "react";

import Square from './Square';
import { BoardContainer } from "../styles/Board.styles";

const Board = ({ squares, onSquareClick, gridSize }) => {
    const renderSquare = (i) => {
        return <Square key={i} value={squares[i]} onClick={() => onSquareClick(i)} />;
    };

    const renderRows = () => {
        const rows = [];
        for (let row = 0; row < gridSize; row++) {
            const rowSquares = [];

            for (let col = 0; col < gridSize; col++) {
                rowSquares.push(renderSquare(row * gridSize + col));
            }

            rows.push(
                <div key={row}>
                    {rowSquares}
                </div>
            );
        }
        return rows;
    };

    return (
        <BoardContainer size={gridSize}>
            {renderRows().map((row, index) => (
                <div key={index}>
                    {row}
                </div>
            ))}
        </BoardContainer>
    );
};

export default Board;
