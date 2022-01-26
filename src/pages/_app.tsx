import React from "react";
import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";
import { Providers } from "../components/Providers";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

export default App;
