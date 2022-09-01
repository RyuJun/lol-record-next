import Box from '@/components/Box/Box';
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar';
import React from 'react';

const Layout = ({ children }): React.ReactElement => (
  <Box>
    <CustomNavbar />
    {children}
  </Box>
);

export default Layout;
