import CustomNavbar from '@/components/CustomNavbar/CustomNavbar';
import { LayoutContainer } from '@/components/Layout/Layout.styles';
import React from 'react';

const Layout = ({ children }): React.ReactElement => {
  return (
    <LayoutContainer>
      <CustomNavbar />
      {children}
    </LayoutContainer>
  );
};

export default Layout;
