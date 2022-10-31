import { css } from '@emotion/react';

const maxWidth = css`
  max-width: 720px;
`;
const fullWidth = css`
  width: 100%;
`;
const fullHeight = css`
  height: 100%;
`;

const fontDfaultAlternativeFamily = `Roboto, -apple-system, BlinkMacSystemFont, system-ui, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`;

const fontDfaultFamily = `Noto Sans, ${fontDfaultAlternativeFamily}`;

export const Variables = {
  fontDfaultFamily,
  maxWidth,
  fullWidth,
  fullHeight,
};
