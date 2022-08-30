import Document, { Head, Html, Main, NextScript } from 'next/document';

import { CssBaseline } from '@nextui-org/react';
import React from 'react';

export default function MyDocument() {
  return (
    <Html>
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <div id="portals-modal" />
        <NextScript />
      </body>
    </Html>
  );
}
