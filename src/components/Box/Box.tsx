import { BoxContainer } from '@/components/Box/Box.styles';
import React from 'react';

const Box = ({ children }): React.ReactElement => {
  return <BoxContainer>{children}</BoxContainer>;
};

export default Box;
