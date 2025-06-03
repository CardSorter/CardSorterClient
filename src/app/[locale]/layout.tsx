import React from 'react';
import 'index.css'
import 'App.css';
import { Lato } from 'next/font/google'
import 'material-symbols';
import {NextIntlClientProvider} from 'next-intl';
import MainContent from "elements/MainContent";

const lato = Lato({weight: ["100", "300", "400", "700", "900"], subsets:['latin-ext']});

export default async function RootLayout(
  {
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
  }) {

  const {locale} = await params;

  return (
        <html lang={locale}>
          <head>
              <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet"/>
              <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
              <title>CardSorter</title>
          </head>
          <body className={lato.className}>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <NextIntlClientProvider>
              <MainContent locale={locale}>{children}</MainContent>
            </NextIntlClientProvider>
          </body>
        </html>
  )
}