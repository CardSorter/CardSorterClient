"use client"

import React from 'react';
import '../index.css'
import '../App.css';
import GetInitialStateFromServer from "../elements/components/GetInitialStateFromServer";
import {Provider} from "react-redux";
import initializeStore from "../Store";
import { Lato } from 'next/font/google'
import 'material-symbols';

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
                <div id="root">{children}</div>
            </Provider>
          </body>
        </html>
  )
}