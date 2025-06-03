"use client";

import GetInitialStateFromServer from "./GetInitialStateFromServer";
import AuthRedirect from "./AuthRedirect";
import Header from "./Header";
import React from "react";
import { usePathname } from "i18n/navigation";
import initializeStore from "../Store";
import { Provider } from "react-redux";

const store = initializeStore();

export default function MainContent({ locale, children }: { locale: string, children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/'; 

  return (
    <Provider store={store}>
      {isHomePage ? (
        <>{children}</> 
      ) : (
        <>
          {(!pathname.includes("sort") || pathname.includes("sorting")) ? (
            <>
              <GetInitialStateFromServer />
              <AuthRedirect />
              <div id="root">
                <main>
                  <Header />
                  {children}
                </main>
              </div>
            </>
          ) : (
            <div id="root">
              <main>{children}</main>
            </div>
          )}
        </>
      )}
    </Provider>
  );
}

