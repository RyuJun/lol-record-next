import { ILayoutContainer } from './Layout.types';
import styled from '@emotion/styled';

export const LayoutContainer = styled.div<ILayoutContainer>`
  &::before {
    content: ' ';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-image: url(${(props) => (props['visual-bg-src'] ? props['visual-bg-src'] : '')});
    background-repeat: no-repeat;
    background-position: center center;
  }
`;
