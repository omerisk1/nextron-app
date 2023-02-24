import React from "react";
import type { AppProps } from "next/app";
import "react-circular-progressbar/dist/styles.css";

import "../styles/globals.css";
import "react-modern-drawer/dist/index.css";

import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
