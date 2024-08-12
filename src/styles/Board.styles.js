import styled from 'styled-components';

export const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.size}, 100px);
    grid-template-rows: repeat(${props => props.size}, 100px);
    align-content: center;
    justify-content: center;
    gap: 10px;
    margin: auto;
`;
