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
    border-left: var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor);
    border-right: var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor);
  }
`;

export const MAIN_VISUAL = {
  src: 'https://opgg-static.akamaized.net/logo/20220829091001.a10d5ec86a664da2963553fab72d467d.png?image=q_auto,f_png,w_auto&amp;v=1661751970892',
  alt: 'OP.GG logo (카서스)',
  title: '카서스',
};

export const DEFAULT_STAIL_TIME = 5000;
export const OPGG_IMG_URL = 'https://opgg-static.akamaized.net/images';
