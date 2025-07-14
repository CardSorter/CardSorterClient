"use client";

import GetInitialStateFromServer from "../GetInitialStateFromServer/GetInitialStateFromServer";
import AuthRedirect from "../AuthRedirect/AuthRedirect";
import Header from "../Header/Header";
import React from "react";
import { usePathname } from "i18n/navigation";
import initializeStore from "../../Store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApplicationAlerts from "../ApplicationAlerts/ApplicationAlerts";
import {ApplicationAlertContext} from "../../reducers/applicationAlertsReducer";

const theme = createTheme({
  palette: {
    primary: {
      main: '#352466',
      light: '#D6D0EC',
      dark: '#201e24',
      contrastText: '#F8F8F9',
    },
    secondary: {
      main: '#9783B6',
      light: '#D6D0EC',
      dark: '#352466',
      contrastText: '#F8F8F9',
    },
    error: {
      main: '#D9534F',
    },
    warning: {
      main: '#E0A02B',
    },
    success: {
      main: '#3C9D6E',
    },
    text: {
      primary: '#24212C',
      secondary: '#56535E',
    },
    background: {
      default: '#F8F8F9',
      paper: '#FFFFFF',
    },
    divider: '#E0E0E0',
    action: {
      active: '#352466',
      hover: '#D6D0EC',
      selected: '#9783B6',
      disabled: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: 'inherit',
    h1: {
      color: '#24212C',
      fontWeight: 500,
    },
    h2: {
      color: '#24212C',
      fontWeight: 500,
    },
    h3: {
      color: '#24212C',
      fontWeight: 500,
    },
    h4: {
      color: '#24212C',
      fontWeight: 500,
    },
    h5: {
      color: '#24212C',
      fontWeight: 500,
    },
    h6: {
      color: '#24212C',
      fontWeight: 500,
    },
    subtitle1: {
      color: '#56535E',
    },
    subtitle2: {
      color: '#56535E',
    },
    body1: {
      color: '#24212C',
    },
    body2: {
      color: '#56535E',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function MainContent({ locale, children }: { locale: string, children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <ThemeProvider theme={theme}>
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
                    <ApplicationAlerts context={ApplicationAlertContext.application} />

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
    </ThemeProvider>
);
}



const store = initializeStore();

