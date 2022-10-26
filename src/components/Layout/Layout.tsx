import CustomNavbar from '@/components/CustomNavbar/CustomNavbar';
import { LayoutContainer } from '@/components/Layout/Layout.styles';
import { MAIN_VISUAL } from '@/shared/constants/common.constants';
import React from 'react';

const Layout = ({ children }): React.ReactElement => {
  return (
    <LayoutContainer visual-bg-src={MAIN_VISUAL.src}>
      <CustomNavbar />
      {children}
    </LayoutContainer>
  );
};

export default Layout;
