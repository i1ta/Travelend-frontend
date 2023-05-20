// 가장 먼저 렌더링되는 페이지
import GlobalStyle from "@/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";
import Layout from "@/components/commons/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}
