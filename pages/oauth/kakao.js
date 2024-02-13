import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSetRecoilState } from "recoil";

import {
  IsAdmin,
  IsFirstLogin,
  JwtTokenState,
  LoginState,
  NicknameState,
  UserIdState,
  login,
} from "@/States/LoginState";

const OAuthKaKao = () => {
  // 로그인 상태 설정
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const setNickname = useSetRecoilState(NicknameState);
  const setIsFirstLogin = useSetRecoilState(IsFirstLogin);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const setIsAdmin = useSetRecoilState(IsAdmin);
  const setUserIdState = useSetRecoilState(UserIdState);

  const router = useRouter();
  console.log(router);
  const code = router.query.code;

  //&client_secret=kgyjs7zgBqJ7141qoYq4xqSgOtjdFJKi
  useEffect(() => {
    if (code) {
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_PAGE_URL}/oauth/kakao&code=${router.query.code}`,

          {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            axios.get(`${process.env.NEXT_PUBLIC_PAGE_URL}/oauth/kakao?code=${router.query.code}`)
              .then((res) => {
                console.log(response.data.access_token);
                axios
                  .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/login/kakao?accessTokenFromSocial=${response.data.access_token}`,
                    { "Content-Type": "application/json" }
                  )
                  .then((response2) => {
                    console.log(response2.data);
                    if (response2.status === 200) {
                      login({ jwtToken: response2.data.data.accessToken, setJwtToken });
                      setUserIdState(response2.data.data.id);
                      setIsLoggedIn(true);
                      setNickname(response2.data.data.nickname);
                      setIsFirstLogin(response2.data.data.firstLogin);
                      response2.data.data.userRole === "ROLE_ADMIN"
                        ? setIsAdmin(true)
                        : setIsAdmin(false);
                      
                      // access-token
                      localStorage.setItem(
                        "login-token",
                        response2.data.data.accessToken
                      );

                      // refresh-token
                      localStorage.setItem(
                        "refresh",
                        response2.data.data.refreshToken
                      );

                      // 추가 회원가입 필요 시
                      if(response2.data.data.needsAdditionalSignUp){
                        router.push("/auth/join/signup");
                      } else {
                        router.push("/");
                      }
                      setIsLoggedIn(true);
                    }
                  });
              })
              .catch((err) => console.log(err));
          }
        });
    }
  }, [code]);

  return <div></div>;
};

export default OAuthKaKao;
