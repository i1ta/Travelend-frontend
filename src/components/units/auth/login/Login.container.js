import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useRouter } from "next/router";

import * as S from "./Login.styles";

import { 
  login, 
  NicknameState, 
  IsFirstLogin, 
  LoginState, 
  JwtTokenState, 
  IsAdmin 
} from "@/States/LoginState";

import axios from "axios";

export default function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({
    password: "",
    username: "",
  });

  // 로그인 상태 설정
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [nickname, setNickname] = useRecoilState(NicknameState);
  const [isFirstLogin, setIsFirstLogin] = useRecoilState(IsFirstLogin);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const [isAdmin, setIsAdmin] = useRecoilState(IsAdmin);

  // Sign In 버튼 클릭 시
  const onSubmit = async (data) => {
    try {
      setState(data);
      setIsSubmitting(true);
      if (username == "") {
        alert("아이디를 입력해주세요.");
      } else if (password == "") {
        alert("비밀번호를 입력해주세요.");
      } else {
        const requestData = {
          password: data.password,
          username: data.username,
        };

        const response = await axios.post(
          "https://api.tripyle.xyz/user/login",
          requestData,
          { "Content-Type": "application/json; charset=utf-8" }
        );

        if (response.status === 200 && response.data.data.accessToken) {
          localStorage.setItem("login-token", response.data.data.accessToken);
          login({jwtToken: response.data.data.accessToken, setJwtToken});
          setIsLoggedIn(true);
          setNickname(response.data.data.nickname);
          setIsFirstLogin(response.data.data.firstLogin);
          response.data.data.userRole === "ROLE_ADMIN"
            ? setIsAdmin(true)
            : setIsAdmin(false);
          router.push("/");
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response.status === 400) {
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
              {...register("username", { required: true })}
            />
            <S.Input
              id="password"
              type="password"
              placeholder="PASSWORD"
              required
              {...register("password", { required: true })}
            />
          </S.InputWrapper>
          <S.CheckboxContainer>
            <S.CheckboxWrapper>
              <S.CheckboxInput type="checkbox" id="loginChk" />
              <S.Label htmlFor="loginChk">Remember me</S.Label>
            </S.CheckboxWrapper>
            <S.Button type="submit" disabled={isSubmitting}>
              Sign In
            </S.Button>
          </S.CheckboxContainer>
        </S.Form>
      </S.Container>
    </>
  );
}
