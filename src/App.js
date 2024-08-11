import React from 'react';
import { useMachine } from "@xstate/react";

import Board from "./components/Board";
import gameMachine from "./states/gameMachine";
import { AppContainer, StatusText, ResetButton, StartButton } from "./styles/App.styles";

const App = () => {
    const [snapshot, send] = useMachine(gameMachine);

    const handleSquareClick = (index) => {
        send({ type: 'MAKE_MOVE', value: index });
    };

    const handleReset = () => {
        send({ type: 'RESET' })
    }

    const handleGameStart = () => {
        send({ type: 'START' });
    }

    const status = snapshot.matches('won')
        ? `Winner: ${snapshot.context.isXNext ? 'O' : 'X'}`
        : snapshot.matches('draw')
            ? "It's a draw!"
            : `Player's turn: ${snapshot.context.isXNext ? 'X' : 'O'}`;

    const isGameActive = ['playing', 'won', 'draw'].some((stateName) => snapshot.matches(stateName));

    return (
        <AppContainer>
            <h1>Tic-Tac-Toe</h1>
            <Board squares={snapshot.context.squares} onSquareClick={handleSquareClick}/>
            <StatusText>
                {isGameActive ? status : 'Are you ready for the game?'}
            </StatusText>
            <StartButton onClick={handleGameStart}>Start Game</StartButton>
            <ResetButton onClick={handleReset} disabled={!isGameActive}>Reset Game</ResetButton>
        </AppContainer>
    );
}

export default App;