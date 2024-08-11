import styled, { keyframes } from "styled-components";

const scaleSymbols = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const SquareButton = styled.button`
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background-color: #fff;
    border: 1px solid #000;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }

    span {
        display: inline-block;
        animation: ${scaleSymbols} 0.5s ease-in-out;
    }
`;
