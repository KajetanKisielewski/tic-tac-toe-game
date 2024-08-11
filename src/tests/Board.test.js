import { render, screen, fireEvent } from '@testing-library/react';

import Board from "../components/Board";
import { createEmptyBoard } from "../utils/utils";

describe('Board Component', () => {
    let handleSquareClick;
    let squares

    beforeEach(() => {
        handleSquareClick = jest.fn();
        squares = createEmptyBoard();
    });

    it('renders 9 squares', () => {
        render(<Board squares={squares} onSquareClick={handleSquareClick} />);

        const squareButtons = screen.getAllByRole('button');
        expect(squareButtons.length).toBe(9);
    });

    it('calls onSquareClick when a square is clicked', () => {
        render(<Board squares={squares} onSquareClick={handleSquareClick} />);

        const firstSquare = screen.getAllByRole('button')[0];
        fireEvent.click(firstSquare);

        expect(handleSquareClick).toHaveBeenCalledTimes(1);
        expect(handleSquareClick).toHaveBeenCalledWith(0);
    });
});