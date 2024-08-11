import React from 'react';

import {SquareButton} from "../styles/Square.styles";

const Square = ({ value, onClick }) => (
    <SquareButton onClick={onClick}>
        {value && <span>{value}</span>}
    </SquareButton>
);

export default Square;
