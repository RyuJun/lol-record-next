import { LogoContainer } from './Logo.constants';
import React from 'react';

const Logo = (): React.ReactElement => {
  return (
    <LogoContainer className="logo-wrapper logo-bg-animate">
      <svg className="logo" width="100%" height="100%" viewBox="0 0 565 140">
        <text x="30" y="90" fill="rgba(126, 58, 242, var(--bg-opacity)" fontSize="100" fontFamily="'Russo One'">
          lol-record
        </text>
      </svg>
    </LogoContainer>
  );
};

export default Logo;
