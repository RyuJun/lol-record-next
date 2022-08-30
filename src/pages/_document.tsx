import Document, { Head, Html, Main, NextScript } from 'next/document';

import { CssBaseline } from '@nextui-org/react';
import React from 'react';

export default function MyDocument() {
  return (
    <Html>
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <div
          id="portals-modal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#f2f4f7',
          }}
        />
        <NextScript />
      </body>
    </Html>
  );
}
