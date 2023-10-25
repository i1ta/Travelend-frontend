// 가장 먼저 렌더링되는 페이지
import GlobalStyle from "@/commons/styles/globalStyles";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import Layout from "@/components/commons/Layout/Layout";
import { useRouter } from "next/router";
import Head from 'next/head';

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
      <Layout pathname={router.pathname}>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
