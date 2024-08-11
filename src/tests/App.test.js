import { render, screen, fireEvent } from '@testing-library/react';

import App from "../App";

describe('App component', () => {
    it('renders Tic-Tac-Toe title', () => {
        render(<App />);

        const titleElement = screen.getByText(/Tic-Tac-Toe/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('renders Start Game button', () => {
        render(<App />);

        const startButton = screen.getByText(/Start Game/i);
        expect(startButton).toBeInTheDocument();
    });

    it('transitions to playing state when Start Game is clicked', () => {
        render(<App />);

        const startButton = screen.getByText(/Start Game/i);
        fireEvent.click(startButton);

        expect(screen.getByText(/Player's turn: X/i)).toBeInTheDocument();
    });

    it('displays winner message when a player wins', () => {
        render(<App />);

        const startButton = screen.getByText(/Start Game/i);
        fireEvent.click(startButton);

        const squares = screen.getAllByRole('button');
        fireEvent.click(squares[0]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[2]);

        expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
    });

    it('displays draw message when the game ends in a draw', () => {
        render(<App />);

        const startButton = screen.getByText(/Start Game/i);
        fireEvent.click(startButton);

        const squares = screen.getAllByRole('button');
        fireEvent.click(squares[0]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[2]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[5]);
        fireEvent.click(squares[7]);
        fireEvent.click(squares[6]);
        fireEvent.click(squares[8]);

        expect(screen.getByText(/It's a draw!/i)).toBeInTheDocument();
    });

    it('resets the game when Reset Game is clicked', () => {
        render(<App />);

        const startButton = screen.getByText(/Start Game/i);
        fireEvent.click(startButton);

        const resetButton = screen.getByText(/Reset Game/i);
        fireEvent.click(resetButton);

        expect(screen.queryByText(/Player's turn: X/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Are you ready for the game/i)).toBeInTheDocument();
    });
});
