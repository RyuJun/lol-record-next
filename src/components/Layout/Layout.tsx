import { Box } from '@/components/Box/Box';
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar';
import React from 'react';

const Layout = ({ children }): React.ReactElement => (
  <Box
    css={{
      maxWidth: '100%',
      position: 'relative',
      overflow: 'visible scroll',
      height: '100%',
    }}
  >
    <CustomNavbar />
    {children}
  </Box>
);

export default Layout;
