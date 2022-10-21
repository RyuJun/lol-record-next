import React from 'react';
import styled from '@emotion/styled';

export const HomeContainer = styled.main<React.CSSProperties>`
  position: absolute;
  top: calc(50% - 350px);
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    opacity: 0.4;
    max-height: 400px;
  }
`;
