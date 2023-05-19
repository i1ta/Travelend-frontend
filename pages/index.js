import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginState } from '../src/States/LoginState';


export default function HomeScreen() {
  const isLoggedIn = useRecoilValue(LoginState);
  const setIsLoggedIn = useSetRecoilState(LoginState);

  const onLogoutHandler = (e) => {
    localStorage.removeItem('login-token');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('login-token') !== null);
  }, []);
  return (
    <>
      <div>
      {isLoggedIn === true
        ?
        <button onClick={onLogoutHandler}>로그아웃</button>
          :
          <div>로그아웃 상태입니다.</div>
        }
        </div>
    </>
  );
}
