"use client"

import React from 'react';
import '../index.css'
import '../App.css';
import GetInitialStateFromServer from "elements/GetInitialStateFromServer";
import {Provider} from "react-redux";
import initializeStore from "../Store";
import { Lato } from 'next/font/google'
import 'material-symbols';
import Header from "elements/Header";

const lato = Lato({weight: ["100", "300", "400", "700", "900"]})
const store = initializeStore();

export default function RootLayout({children,}: { children: React.ReactNode }) {

  return (
        <html lang="en">
          <head>
              <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet"/>
              <title>CardSorter</title>
          </head>
          <body className={lato.className}>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <Provider store={store}>
                <GetInitialStateFromServer />
                <div id="root">
                  <main>
                    <Header showBackButton={false} />
                    {children}
                  </main>
                </div>
            </Provider>
          </body>
        </html>
  )
}