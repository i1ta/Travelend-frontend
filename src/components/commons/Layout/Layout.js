import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
  // 푸터를 나타내지 않는 경로를 배열에 입력
  const excludedPaths = ["/auth/profile", "auth/singIn"];
  const showFooter = !excludedPaths.includes(props.pathname);

  return (
    <>
      <NavBar />
      {props.children}
      {showFooter && <Footer />}
    </>
  );
}
