import { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";

import Board from "./components/Board";
import gameMachine from "./states/gameMachine";
import useAIMove from "./hooks/useAIMove";
import { AppContainer, StatusText, ResetButton, StartButton } from "./styles/App.styles";

const apiKey = process.env.REACT_APP_API_KEY

const App = () => {
    const [snapshot, send] = useMachine(gameMachine);
    const { makeMove, loading } = useAIMove(apiKey);
    const [gameMode, setGameMode] = useState(null);

    const isAITurn = gameMode === 'ai' && !snapshot.context.isXNext && snapshot.matches('playing');

    useEffect(() => {
        if (isAITurn) {
            const aiMove = async () => {
                const move = await makeMove(snapshot.context.squares);
                const isValidMove = move !== null && move >= 0 && move < snapshot.context.squares.length;

                if (isValidMove) {
                    send({ type: 'MAKE_MOVE', value: move });
                }
            };

            aiMove();
        }
    }, [isAITurn, makeMove, send, snapshot.context.squares]);

    const handleGameModeSelect = (mode) => {
        setGameMode(mode);
        send({ type: 'START' });
    };

    const handleSquareClick = (index) => {
        if (snapshot.context.squares[index] || loading) return;

        if (gameMode === 'ai' && !snapshot.context.isXNext) return;

        send({ type: 'MAKE_MOVE', value: index });
    };

    const handleReset = () => {
        send({ type: 'RESET' })
        setGameMode(null);
    }

    const status = snapshot.matches('won')
        ? `Winner: ${snapshot.context.isXNext ? 'O' : 'X'}`
        : snapshot.matches('draw')
            ? "It's a draw!"
            : `Player's turn: ${snapshot.context.isXNext ? 'X' : 'O'}`;

    return (
        <AppContainer>
            <h1>Tic-Tac-Toe</h1>
            {gameMode === null ? (
                <>
                    <h2>Select Game Mode</h2>
                    <StartButton onClick={() => handleGameModeSelect('human')}>Human vs Human</StartButton>
                    <StartButton onClick={() => handleGameModeSelect('ai')}>Human vs AI</StartButton>
                </>
            ) : (
                <>
                    <Board squares={snapshot.context.squares} onSquareClick={handleSquareClick} />
                    <StatusText>{status}</StatusText>
                    <ResetButton onClick={handleReset}>Reset Game</ResetButton>
                </>
            )}
        </AppContainer>
    );
}

export default App;