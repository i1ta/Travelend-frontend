import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const OAuthNaver = () => {
  const router = useRouter();
  console.log(router.query);
  const code = router.query.code;
  console.log(code);

  useEffect(() => {
    if (code) {
      axios.post('https://api.tripyle.xyz/user/login/naver', {
          "code": router.query.code,
          "state": router.query.state,
      }, { "Content-Type": "application/json" })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem('login-token', response.data.accessToken);
            router.push('/main');
            setIsLoggedIn(true);
          }
      })
    }
  }, [code]);

  return <div>네이버 인가코드 받아서 넘기고 토큰 받아오는 과정</div>;
};

export default OAuthNaver;