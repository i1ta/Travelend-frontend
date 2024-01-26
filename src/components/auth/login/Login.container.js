import Axios from "@/apis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";

import * as S from "./Login.styles";

import {
  IsAdmin,
  IsFirstLogin,
  JwtTokenState,
  LoginState,
  NicknameState,
  UserIdState,
  login,
} from "@/States/LoginState";


export default function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({
    password: "",
    username: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 아이디 기억하기
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberUser"]);

  // 로그인 상태 설정
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [nickname, setNickname] = useRecoilState(NicknameState);
  const [isFirstLogin, setIsFirstLogin] = useRecoilState(IsFirstLogin);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const setUserIdState = useSetRecoilState(UserIdState);
  const [isAdmin, setIsAdmin] = useRecoilState(IsAdmin);

  useEffect(() => {
    if (cookies.rememberUser !== undefined) {
      setUsername(cookies.rememberUser.username);
      setPassword(cookies.rememberUser.password);
      // setState({...state, username: cookies.rememberId});
    }
  }, []);

  // Sign In 버튼 클릭 시
  const onSubmit = async () => {
    try {
      // setState(data);
      setIsSubmitting(true);
      if (username == "") {
        alert("아이디를 입력해주세요.");
      } else if (password == "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        const requestData = {
          password: password,
          username: username,
        };

        const response = await Axios.post("/user/login", requestData, {
          "Content-Type": "application/json; charset=utf-8",
        });

        if (response.status === 200 && response.data.data.accessToken) {
          // 아이디 기억하기
          if (isRemember) {
            setCookie(
              "rememberUser",
              {
                username: username,
                password: password,
              },
              { maxAge: 24 * 60 * 60 * 7 * 1000 }
            );
            setIsRemember(false);
          }

          localStorage.setItem("login-token", response.data.data.accessToken);
          localStorage.setItem("refreshToken", response.data.data.refreshToken);
          login({ jwtToken: response.data.data.accessToken, setJwtToken });
          setIsLoggedIn(true);
          setNickname(response.data.data.nickname);
          setIsFirstLogin(response.data.data.firstLogin);
          setUserIdState(response.data.data.id);
          response.data.data.userRole === "ROLE_ADMIN"
            ? setIsAdmin(true)
            : setIsAdmin(false);
          router.push("/");
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response?.status === 400) {
        alert("존재하지 않는 회원정보입니다.");
      }
      console.log(error);
    }
  };

  return (
    <>
      <S.Container>
        <S.Title>로그인</S.Title>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputWrapper>
            <S.Input
              id="username"
              type="text"
              placeholder="ID"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <S.Input
              id="password"
              type="password"
              placeholder="PASSWORD"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSubmit();
                }
              }}
            />
          </S.InputWrapper>
          <S.CheckboxContainer>
            <S.CheckboxWrapper>
              <S.CheckboxInput
                type="checkbox"
                id="loginChk"
                onClick={() => {
                  setIsRemember((prev) => !prev);
                }}
              />
              <S.Label htmlFor="loginChk">Remember me</S.Label>
            </S.CheckboxWrapper>
            <S.Button type="button" disabled={isSubmitting} onClick={onSubmit}>
              Sign In
            </S.Button>
          </S.CheckboxContainer>
        </S.Form>
      </S.Container>
    </>
  );
}
