import Head from "next/head";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Layout from "../src/components/commons/Layout/Layout";
import Loading from "../src/components/units/loading/Loading.js";
import GlobalStyle from "../src/styles/globalStyles";
import theme from "../src/styles/theme";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Travelend</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <GlobalStyle />
        <Suspense fallback={<Loading />}>
          <Layout pathname={router.pathname}>
            <Component {...pageProps} />
          </Layout>
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
}
