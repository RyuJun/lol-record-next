import { BoxContainer } from './Box.constants';
import React from 'react';

const Box = ({ children }): React.ReactElement => {
  return <BoxContainer>{children}</BoxContainer>;
};

export default Box;
