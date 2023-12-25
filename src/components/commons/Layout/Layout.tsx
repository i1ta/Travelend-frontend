import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  pathname: string;
}

export default function Layout({ pathname, children }: LayoutProps) {
  // 푸터를 나타내지 않는 경로를 배열에 입력
  const excludedPaths = [
    "/auth/profile",
    "/auth/signIn",
    "/auth/join",
    "/auth/findPw",
    "/auth/findId",
    "/auth/chnPw",
    "/404",
  ];
  const showFooter = !excludedPaths.includes(pathname);

  return (
    <>
      <NavBar />
      {children}
      {showFooter && <Footer />}
    </>
  );
}
