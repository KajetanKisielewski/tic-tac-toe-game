import { render, fireEvent, renderHook, act, waitFor, screen } from '@testing-library/react';

import useAIMove from '../hooks/useAIMove';
import App from "../App";

const apiKey = process.env.REACT_APP_API_KEY
const invalidApiKey = 'xxx'
let buttons;

const performAIMove = async (result, board) => {
    let move;

    await act(async () => {
        move = await result.current.makeMove(board);
    });

    return move;
};

const startGameAndMakeFirstMove = async () => {
    render(<App />);

    await act(async () => {
        fireEvent.click(screen.getByText('Human vs AI'));
    });

    buttons = screen.getAllByRole('button');

    await act(async () => {
        fireEvent.click(buttons[0]);
    });

    expect(buttons[0]).toHaveTextContent('X');
};

describe('UseAIMove', () => {
    it('should return a valid move', async () => {
        const { result } = renderHook(() => useAIMove(apiKey));
        const board = [null, 'X', 'O', null, 'X', null, null, null, null];

        const move = await performAIMove(result, board);

        expect(move).not.toBeNull();
        expect(move).toBeGreaterThanOrEqual(0);
        expect(move).toBeLessThan(board.length);
    });

    it('should not place on an occupied square', async () => {
        const { result } = renderHook(() => useAIMove(apiKey));
        const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', null];

        const move = await performAIMove(result, board);

        expect(move).toBe(8);
    });

    it('should handle errors gracefully', async () => {
        const { result } = renderHook(() => useAIMove(invalidApiKey));
        const board = [null, 'X', 'O', null, 'X', null, null, null, null];

        const move = await performAIMove(result, board);

        expect(move).toBeNull();
        expect(result.current.error).toBe('Something went wrong with the AI request.');
    });

    it('should allow player to make a move and then AI should respond', async () => {
        await startGameAndMakeFirstMove();

        await waitFor(() => {
            expect(buttons.some(button => button.textContent === 'O')).toBe(true);
        });
    });

    it('should reset the game correctly', async () => {
        await startGameAndMakeFirstMove();

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Reset Game/i }));
        });

        expect(screen.getByText('Select Game Mode')).toBeInTheDocument();
    });
});
