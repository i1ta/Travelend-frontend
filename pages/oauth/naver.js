import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const OAuthNaver = () => {
  const router = useRouter();
  const code = router.query.code;
  console.log(code);

  // useEffect(() => {
  //   if (code) {
  //     axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=9dd98e572c5ca5fb5da7011d9ef2f27f&redirect_uri=http://127.0.0.1:3000/oauth/kakao&code=${router.query.code}&client_secret=kgyjs7zgBqJ7141qoYq4xqSgOtjdFJKi`,
      
  //       {
  //         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         if (response.status === 200) {
  //           axios.post('https://api.tripyle.xyz/user/login/kakao', {
  //               "snsId": response.data.id_token,
  //               "snsToken": response.data.access_token,
  //           },{"Content-Type": "application/json; charset=utf-8"})
  //         }
  //       });
  //     }
  // }, [code]);

  return <div>네이버 인가코드 받아서 넘기고 토큰 받아오는 과정</div>;
};

export default OAuthNaver;