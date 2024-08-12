import { checkWinner } from '../utils/utils'

describe('checkWinner', () => {
    it('should return null when the game is ongoing', () => {
        const board = [null, 'X', 'O', 'X', null, 'O', null, null, null];
        expect(checkWinner(board, 3)).toBeNull();
    });

    it('should return "X" when X wins horizontally', () => {
        const board = ['X', 'X', 'X', 'O', null, 'O', null, null, null];
        expect(checkWinner(board, 3)).toBe('X');
    });

    it('should return "O" when O wins vertically', () => {
        const board = ['O', 'X', null, 'O', null, 'X', 'O', null, null];
        expect(checkWinner(board, 3)).toBe('O');
    });

    it('should return "X" when X wins diagonally', () => {
        const board = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
        expect(checkWinner(board, 3)).toBe('X');
    });

    it('should return "draw" when the game is a draw', () => {
        const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
        expect(checkWinner(board, 3)).toBe('draw');
    });
});
