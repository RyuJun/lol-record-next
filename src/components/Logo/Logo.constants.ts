import React from 'react';
import styled from '@emotion/styled';

export const LogoContainer = styled.div<React.CSSProperties>`
  position: relative;
  max-width: 180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(120deg, transparent, transparent, rgba(255, 255, 255, 0.226));
    animation: animation-16jpnkj 2.5s ease-in-out infinite;
  }
  .logo {
    /* animation: 1s appear; */
    margin: auto;
  }
`;
