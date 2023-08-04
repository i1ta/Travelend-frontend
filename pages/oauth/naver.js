import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useSetRecoilState } from 'recoil';

import { LoginState } from '@/States/LoginState';


const OAuthNaver = () => {
  const router = useRouter();
  const code = router.query.code;

  const setIsLoggedIn = useSetRecoilState(LoginState);

  useEffect(() => {
    if (code) {
      axios.post('https://api.tripyle.xyz/user/login/naver', {
          "code": router.query.code,
          "state": router.query.state,
      }, { "Content-Type": "application/json" })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem('login-token', response.data.data.accessToken);
            router.push('/main');
            setIsLoggedIn(true);
          }
      })
    }
  }, [code]);

  return <div></div>;
};

export default OAuthNaver;