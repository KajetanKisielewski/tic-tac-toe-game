import {assign, createMachine} from 'xstate';

import { createEmptyBoard } from "../utils/utils";

const checkWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return board.includes(null) ? null : 'draw';
};

const gameMachine = createMachine({
    id: 'game',
    initial: 'idle',
    context: {
        squares: createEmptyBoard(),
        isXNext: true,
    },
    states: {
        idle: {
            on: {
                START: 'playing',
            },
        },
        playing: {
            on: {
                MAKE_MOVE: {
                    actions: 'makeMove',
                },
                RESET: {
                    target: 'idle',
                    actions: 'resetGame'
                }
            },
            always: [
                { target: 'won', guard: 'isWon' },
                { target: 'draw', guard: 'isDraw' },
            ],
        },
        won: {
            on: {
                RESET: {
                    target: 'idle',
                    actions: 'resetGame'
                }
            },
        },
        draw: {
            on: {
                RESET: {
                    target: 'idle',
                    actions: 'resetGame'
                }
            },
        },
    },
}, {
    actions: {
        makeMove: assign(({ context, event }) => {
            if(context.squares[event.value]) return {}

            const newSquares = context.squares.slice();
            newSquares[event.value] = context.isXNext ? 'X' : 'O';

            return {
                squares: newSquares,
                isXNext: !context.isXNext,
            };
        }),
        resetGame: assign({
            squares: () => createEmptyBoard(),
            isXNext: () => true,
        })
    },
    guards: {
        isValidMove: ({ context, event}) => {
            return !context.squares[event.index] && !checkWinner(context.squares);
        },
        isWon: ({ context}) => {
            const winner = checkWinner(context.squares);
            return winner !== null && winner !== 'draw';
        },
        isDraw: ({ context}) => {
            return checkWinner(context.squares) === 'draw';
        },
    },
});

export default gameMachine;
