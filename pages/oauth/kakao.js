import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useSetRecoilState } from 'recoil';

import { LoginState } from '@/States/LoginState';

import { KAKAO_REDIRECT_URL } from '@/OAuth/kakao.js';

const OAuthKaKao = () => {
  // 로그인 상태 설정
  const setIsLoggedIn = useSetRecoilState(LoginState);

  const router = useRouter();
  const code = router.query.code;
  
  useEffect(() => {
    if (code) {
      axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=9dd98e572c5ca5fb5da7011d9ef2f27f&redirect_uri=https://tripyle.xyz/oauth/kakao&code=${router.query.code}&client_secret=kgyjs7zgBqJ7141qoYq4xqSgOtjdFJKi`,
      
        {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        })
        .then((response) => {
          console.log('response' + response);
          if (response.status === 200) {
            axios.post('https://api.tripyle.xyz/user/login/kakao', {
                "snsId": response.data.id_token,
                "snsToken": response.data.access_token,
            }, { "Content-Type": "application/json" })
              .then((response2) => {
                console.log(response2.data.data.accessToken);
                console.log(response2.data);
                console.log('response2' + response2);
                if (response2.status === 200) {
                  localStorage.setItem('login-token', response2.data.data.accessToken);
                  localStorage.setItem('nickname', response2.data.data.nickname);
                  router.push('https://tripyle.xyz/main');
                  setIsLoggedIn(true);
                }
            })
          }
        });
      }
  }, [code]);

  return <div></div>;
};

export default OAuthKaKao;