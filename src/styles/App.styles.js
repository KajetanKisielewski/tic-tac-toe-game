import styled, { css } from 'styled-components';

export const AppContainer = styled.div`
    height: 100vh;
    padding: 1.25rem;
    text-align: center;
`;

export const StatusText = styled.div`
    margin: 1.25rem 0;
    font-size: 1.5rem;
`;

const GameButton = styled.button`
    margin: 0.625rem;
    padding: 0.625rem 1.25rem;
    font-size: 1.125rem;
    border: 1px solid rgba(211, 47, 47, 0.5);
    border-radius: 0.25rem;
    color: #FFFFFF;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const hoverEffect = (borderColor, backgroundColor) => css`
    &:hover {
        border-color: ${borderColor};
        background-color: ${backgroundColor};
    }
`;

export const StartButton = styled(GameButton)`
    color: #1B5E20FF;
    border-color: #144d18;

    ${hoverEffect('#1B5E20FF', '#27722B33')}
`;

export const ResetButton = styled(GameButton)`
    color: #D32F2FFF;
    border-color: #D32F2F7F;

    ${hoverEffect('#D32F2FFF', '#D32F2F0A')}
`;
