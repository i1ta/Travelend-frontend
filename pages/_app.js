import Layout from "@/components/commons/Layout/Layout";
import Loading from "@/components/units/loading/Loading";
import GlobalStyle from "@/styles/globalStyles";
import Head from 'next/head';
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

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
      <Head>
        <title>Tripyle</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <GlobalStyle />
      <Suspense fallback={Loading}>
        <Layout pathname={router.pathname}>
          <Component {...pageProps} />
        </Layout>
      </Suspense>
    </RecoilRoot>
  );
}
