import styled from 'styled-components';

export const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    align-content: center;
    justify-content: center;
    gap: 10px;
    margin: auto;
`;
