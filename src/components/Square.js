import React from 'react';

import {SquareButton} from "../styles/Square.styles";

const Square = ({ value, onClick }) => {
    return <SquareButton onClick={onClick}>{value}</SquareButton>;
};

export default Square;