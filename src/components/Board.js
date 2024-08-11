import React from "react";

import Square from './Square';
import { BoardContainer } from "../styles/Board.styles";

const Board = ({ squares, onSquareClick }) => {
    return (
        <BoardContainer>
            {squares.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    onClick={() => onSquareClick(index)}
                />
            ))}
        </BoardContainer>
    );
};

export default Board;
