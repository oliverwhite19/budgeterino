import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '../stitches.config';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <title>Budgeterino</title>
                    <meta name="description" content="Budget App for Budget People" />
                    <link rel="icon" href="/favicon.ico" />
                    <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
