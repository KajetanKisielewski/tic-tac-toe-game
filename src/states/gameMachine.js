import { assign, createMachine } from 'xstate';

import { checkWinner, createEmptyBoard } from "../utils/utils";

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
