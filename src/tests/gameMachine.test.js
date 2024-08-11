import { createActor } from 'xstate';

import gameMachine from "../states/gameMachine";

describe('gameMachine', () => {
    let service;

    beforeEach(() => {
        service = createActor(gameMachine).start();
    });

    afterEach(() => {
        if (service) service.stop();
    });

    it('should start in idle state', () => {
        expect(service.getSnapshot().matches('idle')).toBe(true);
    });

    it('should transition from idle to playing on START', () => {
        service.send({ type: 'START' });
        expect(service.getSnapshot().matches('playing')).toBe(true);
    });

    it('should update board and switch turn after a valid move', () => {
        service.send({ type: 'START' });
        service.send({ type: 'MAKE_MOVE', value: 0 });
        expect(service.getSnapshot().context.squares[0]).toBe('X');
        expect(service.getSnapshot().context.isXNext).toBe(false);
    });

    it('should transition to won when a player wins', () => {
        service.send({ type: 'START' });
        service.send({ type: 'MAKE_MOVE', value: 0 });
        service.send({ type: 'MAKE_MOVE', value: 3 });
        service.send({ type: 'MAKE_MOVE', value: 1 });
        service.send({ type: 'MAKE_MOVE', value: 4 });
        service.send({ type: 'MAKE_MOVE', value: 2 });
        expect(service.getSnapshot().matches('won')).toBe(true);
    });

    it('should transition to draw when the game ends in a draw', () => {
        service.send({ type: 'START' });
        const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
        moves.forEach(move => service.send({ type: 'MAKE_MOVE', value: move }));
        expect(service.getSnapshot().matches('draw')).toBe(true);
    });

    it('should reset to idle on RESET', () => {
        service.send({ type: 'START' });
        service.send({ type: 'MAKE_MOVE', value: 0 });
        service.send({ type: 'RESET' });
        expect(service.getSnapshot().matches('idle')).toBe(true);
        expect(service.getSnapshot().context.squares.every(square => square === null)).toBe(true);
    });

    it('should not allow invalid moves', () => {
        service.send({ type: 'START' });
        service.send({ type: 'MAKE_MOVE', value: 0 });
        service.send({ type: 'MAKE_MOVE', value: 0 });
        expect(service.getSnapshot().context.squares[0]).toBe('X');
        expect(service.getSnapshot().context.isXNext).toBe(false);
    });
});
