import React from "react";
import type { AppProps } from "next/app";
import "react-circular-progressbar/dist/styles.css";
import "../styles/globals.css";
import "react-modern-drawer/dist/index.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function MyApp({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
