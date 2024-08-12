import { assign, createMachine } from 'xstate';

import { checkWinner, createEmptyBoard } from "../utils/utils";

const getGridSize = (round) => {
    return round + 2
}

const gameMachine = createMachine({
    id: 'game',
    initial: 'idle',
    context: {
        squares: createEmptyBoard(3),
        isXNext: true,
        gridSize: 3,
        round: 1,
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
                NEXT_ROUND: {
                    target: 'playing',
                    actions: 'nextRound',
                    guard: 'isFinalRound'
                },
                RESET: {
                    target: 'idle',
                    actions: 'resetGame'
                }
            },
        },
        draw: {
            on: {
                NEXT_ROUND: {
                    target: 'playing',
                    actions: 'nextRound',
                    guard: 'isFinalRound'
                },
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
        nextRound: assign(({ context }) => {
            const newRound = context.round + 1;
            const newGridSize = getGridSize(newRound);

            return {
                squares: createEmptyBoard(newGridSize),
                isXNext: true,
                gridSize: newGridSize,
                round: newRound
            };
        }),
        resetGame: assign({
            squares: () => createEmptyBoard(3),
            isXNext: true,
            gridSize: 3,
            round: 1
        })
    },
    guards: {
        isValidMove: ({ context, event}) => {
            return !context.squares[event.index] && !checkWinner(context.squares);
        },
        isWon: ({ context}) => {
            const winner = checkWinner(context.squares, context.gridSize)
            return winner !== null && winner !== 'draw';
        },
        isDraw: ({ context}) => {
            return checkWinner(context.squares, context.gridSize) === 'draw';
        },
        isFinalRound: ({ context }) => context.round < 3
    },
});

export default gameMachine;
