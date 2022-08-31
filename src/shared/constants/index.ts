import { createTheme } from '@nextui-org/react';
import { css } from '@emotion/react';

export const LIGHT_THEME = createTheme({ type: 'light' });
export const DARK_THEME = createTheme({ type: 'dark' });
export const GLOBAL_STYLES = css`
  div[data-overlay-container] {
    width: 100%;
    height: 100vh;
    word-break: break-all;
    max-width: 900px;
    margin: 0 auto;
  }
`;

export const DEFAULT_STAIL_TIME = 5000;
