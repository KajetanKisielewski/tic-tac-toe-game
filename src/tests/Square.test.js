import { render, screen, fireEvent } from '@testing-library/react';

import Square from "../components/Square";

describe('Square Component', () => {
    let handleClick;

    beforeEach(() => {
        handleClick = jest.fn();
    });

    it('renders a square with given value', () => {
        render(<Square value="X" onClick={handleClick} />);

        const squareButton = screen.getByRole('button');
        expect(squareButton).toHaveTextContent('X');
    });

    it('calls onClick when square is clicked', () => {
        render(<Square value={null} onClick={handleClick} />);

        const squareButton = screen.getByRole('button');
        fireEvent.click(squareButton);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
