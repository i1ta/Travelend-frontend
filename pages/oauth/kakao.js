import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useSetRecoilState } from 'recoil';

import { LoginState, NicknameState } from '@/States/LoginState';

const OAuthKaKao = () => {
  // 로그인 상태 설정
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const setNickname = useSetRecoilState(NicknameState);

  const router = useRouter();
  console.log(router);
  const code = router.query.code;
  
  useEffect(() => {
    if (code) {
      axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=9dd98e572c5ca5fb5da7011d9ef2f27f&redirect_uri=https://tripyle.xyz/oauth/kakao&code=${router.query.code}&client_secret=kgyjs7zgBqJ7141qoYq4xqSgOtjdFJKi`,
      // axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=9dd98e572c5ca5fb5da7011d9ef2f27f&redirect_uri=http://localhost:3000/oauth/kakao&code=${router.query.code}&client_secret=kgyjs7zgBqJ7141qoYq4xqSgOtjdFJKi`,
      
        {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        })
        .then((response) => {
          if (response.status === 200) {
            axios.post('https://api.tripyle.xyz/user/login/kakao', {
              // axios.post('http://localhost:3000/user/login/kakao', {
                "snsId": response.data.id_token,
                "snsToken": response.data.access_token,
            }, { "Content-Type": "application/json" })
              .then((response2) => {
                console.log(response2.data);
                if (response2.status === 200) {
                  setIsLoggedIn(true);
                  setNickname(response2.data.data.nickname);
                  localStorage.setItem('login-token', response2.data.data.accessToken);
                  // localStorage.setItem('nickname', response2.data.data.nickname);
                  if (response2.data.data.needsAdditionalSignUp === true){
                    router.push('/auth/join/signup');
                  }
                  router.push('/main');
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