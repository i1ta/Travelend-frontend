import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import axios from 'axios';

import { useRecoilValue } from "recoil";
import { LoginState, NicknameState } from "../../../States/LoginState";

import { css } from "@emotion/styled";

export default function Layout(props) {
  const loginState = useRecoilValue(LoginState);
  const nicknameState = useRecoilValue(NicknameState);
  console.log(loginState);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  const router = useRouter();

  const onHomeLogo = () => {
    router.push("/main");
  };

  const onLoginBtn = () => {
    router.push("/auth/signIn");
  };

  const onJoinBtn = () => {
    router.push("/auth/join");
  };

  const onProfile = async () => {
    axios.defaults.headers.common["x-auth-token"] = window.localStorage.getItem("login-token");
    const response = await axios
      .get("https://api.tripyle.xyz/profile/my-profile")
      console.log(response)
      if(response.status === 200){
        localStorage.setItem("age", response.data.data.age);
        localStorage.setItem("bio", response.data.data.bio);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("firstTripStyle", response.data.data.firstTripStyle);
        localStorage.setItem("gender", response.data.data.gender);
        localStorage.setItem("mbti", response.data.data.mbti);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("phone", response.data.data.phone);
        localStorage.setItem("profileUrl", response.data.data.profileUrl);
        localStorage.setItem("secondTripStyle", response.data.data.secondTripStyle);
        localStorage.setItem("thirdTripStyle", response.data.data.thirdTripStyle);
        localStorage.setItem("username", response.data.data.username);
        router.push('/auth/profile');
      } else{
        console.log("오류 발생");
        alert("로그인을 진행해주세요.");
        router.push("/auth/signIn");
      }
  }

  return (
    <>
      <Nav>
        <NavContainer>
          <Container>
            <HomeLogo src="/assets/logo.png" alt="로고" onClick={onHomeLogo} />
          </Container>
          <List>
            <Item>
              <Link href="/">Trip'yler 소개</Link>
            </Item>
            <Item>
              <Link href="/">Trip'yler 찾기</Link>
            </Item>
            <Item>
              <Link href="/">여행 후기</Link>
            </Item>
            <Item>
              <Link href="/">여행 가이드</Link>
            </Item>
            <Item>
              <Link href="/">Contact</Link>
            </Item>
          </List>

          {!loginState ? (
            <List hideText={props.login}>
              <UserItem>
                <SignInBtn onClick={onLoginBtn}>로그인</SignInBtn>
              </UserItem>
              <UserItem>
                <SignUpBtn onClick={onJoinBtn}>회원가입</SignUpBtn>
              </UserItem>
            </List>
          ) : (
            <List>
              <UserItem>
                <NicknameWrapper>2 건</NicknameWrapper>
              </UserItem>

              <UserItem>
                <NicknameWrapper onClick={onProfile}>{nicknameState} 님</NicknameWrapper>
              </UserItem>
            </List>
          )}
        </NavContainer>
      </Nav>
      <NavBottom />
      {props.children}
    </>
  );
}

const HomeLogo = styled.img`
  width: 150px;
  height: 60px;
  cursor: pointer;
`;

const NavBottom = styled.div`
  width: 100%;
  height: 120px;
`;

const Nav = styled.nav`
  height: 120px;
  background-color: #ffffff;
  padding: 30px 0;
  box-shadow: 0px 1px 10px #999;
  z-index: 100;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  margin: 0 auto;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding-left: 0;

  visibility: ${(props) => (props.hideText ? "hidden" : "visible")};
`;

const Item = styled.li`
  padding: 20px 20px;
  font-size: 20px;
  white-space: nowrap;
  margin: 0 0.5vw;
  font-weight: 600;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const UserItem = styled.li`
  margin-right: 1rem;
  white-space: nowrap;
  font-weight: bold;
`;

const Container = styled.div`
  padding-left: 0;
`;

const SignInBtn = styled.button`
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #c8b6ff;

  color: #c8b6ff;
  letter-spacing: -2px;

  font-size: 18px;

  padding: 0.7rem 1.5rem;
  cursor: pointer;
`;

const SignUpBtn = styled.button`
  background-color: #c8b6ff;
  color: white;
  border-radius: 50px;
  border: 2px solid #c8b6ff;
  color: white;
  letter-spacing: -2px;

  font-size: 18px;

  padding: 0.7rem 1.5rem;
  cursor: pointer;
`;

const NicknameWrapper = styled.div`
  color: #c8b6ff;
  letter-spacing: -2px;

  font-size: 18px;

  padding: 0.7rem 1.5rem;
  cursor: pointer;
`;
