import React, { useState } from 'react';

import { createEmptyBoard } from "./utils/utils";
import Board from "./components/Board";

const App = () => {
    const [squares, setSquares] = useState(createEmptyBoard());
    const [isXNext, setIsXNext] = useState(true);

    const handleSquareClick = (index) => {
        if (squares[index]) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';

        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    return (
        <div className="App">
            <h1>Tic-Tac-Toe</h1>
            <Board squares={squares} onSquareClick={handleSquareClick} />
        </div>
    );
}

export default App;