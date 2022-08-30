import { createTheme } from '@nextui-org/react';
import { css } from '@emotion/react';

export const LIGHT_THEME = createTheme({ type: 'light' });
export const DARK_THEME = createTheme({ type: 'dark' });
export const GLOBAL_STYLES = css`
  div[data-overlay-container] {
    width: 100%;
    word-break: break-all;
  }
`;
