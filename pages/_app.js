// 가장 먼저 렌더링되는 페이지
import GlobalStyle from "@/commons/styles/globalStyles";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilSnapshot  } from "recoil";
import Layout from "@/components/commons/Layout/Layout";

import { NicknameState } from '../src/States/LoginState';


export default function App({ Component, pageProps }) {

  const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
  return (
      <RecoilRoot>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
  );
}
