import { Colors } from './colors';
import { Variables } from './variables';
import { createTheme } from '@nextui-org/react';
import { css } from '@emotion/react';

export const LIGHT_THEME = createTheme({ type: 'light' });
export const DARK_THEME = createTheme({ type: 'dark' });

export const GlobalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto&family=Russo+One&display=swap');
  /* @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css'); */

  /* reset */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  html,
  body {
    line-height: 1;
    overflow: hidden;
    font-family: ${Variables.fontDfaultFamily};
    color: ${Colors.gray9};
  }
  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q::before,
  q::after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  div[data-overlay-container] {
    width: 100%;
    height: 100vh;
    word-break: break-all;
    max-width: 900px;
    margin: 0 auto;
    border-left: var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor);
    border-right: var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor);
    & > div {
      width: 100%;
      height: 100%;
    }
  }
  * {
    box-sizing: border-box;
    scrollbar-width: none; /* Firefox */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0;
    background: transparent;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  a:visited {
    color: inherit;
  }

  button {
    cursor: pointer;
    padding: 0;
    border: none;
    background-color: transparent;
  }
  #root {
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent !important;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .dark-theme .logo-bg-animate {
    .logo {
      text {
        fill: var(--nextui-colors-secondary);
      }
    }
    &:after {
      background-image: linear-gradient(120deg, transparent, transparent, #1a1c2342) !important;
    }
  }
`;
