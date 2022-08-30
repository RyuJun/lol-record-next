import { Content } from '@/components/Content/Content';
import React from 'react';
import { styled } from '@nextui-org/react';

const Box = styled('div', {
  boxSizing: 'border-box',
});

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: '100%',
      position: 'relative',
      overflow: 'visible scroll',
    }}
  >
    {children}
    <Content />
  </Box>
);
