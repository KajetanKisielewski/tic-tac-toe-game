export const createEmptyBoard = (size = 3) => {
    return Array(size * size).fill(null);
};

export const checkWinner = (board, gridSize) => {
    const winningCombinations = [];

    for (let row = 0; row < gridSize; row++) {
        const rowCombination = [];
        for (let col = 0; col < gridSize; col++) {
            rowCombination.push(row * gridSize + col);
        }
        winningCombinations.push(rowCombination);
    }

    for (let col = 0; col < gridSize; col++) {
        const colCombination = [];
        for (let row = 0; row < gridSize; row++) {
            colCombination.push(row * gridSize + col);
        }
        winningCombinations.push(colCombination);
    }

    const diag1Combination = [];
    const diag2Combination = [];

    for (let i = 0; i < gridSize; i++) {
        diag1Combination.push(i * (gridSize + 1));
        diag2Combination.push((i + 1) * (gridSize - 1));
    }

    winningCombinations.push(diag1Combination, diag2Combination);

    for (const combination of winningCombinations) {
        if (combination.every(index => board[index] && board[index] === board[combination[0]])) {
            return board[combination[0]];
        }
    }

    return board.includes(null) ? null : 'draw';
};

