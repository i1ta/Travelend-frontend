import { useRecoilValue } from "recoil";
import Main from "../src/components/main/Main.container";
import { LoginState } from "../src/states/LoginState";

export default function MainPage() {
  const loginState = useRecoilValue(LoginState);
  return <>{loginState ? <Main login></Main> : <Main></Main>}</>;
}
