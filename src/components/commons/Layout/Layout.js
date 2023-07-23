import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { useRecoilState, useRecoilValue } from "recoil";
import { LoginState, IsFirstLogin } from "../../../States/LoginState";

export default function Layout(props) {
  const loginState = useRecoilValue(LoginState);
  const [isFirstLogin, setIsFirstLogin] = useRecoilState(IsFirstLogin);
  const [infoMsg, setInfoMsg] = useState([]);
  const [infoMsgNum, setInfoMsgNum] = useState(-1);

  useEffect(() => {
    if (isFirstLogin) {
      setInfoMsg([
        "여행동행자와 나눈 메세지를\n확인해보세요!",
        "내가 스크랩한 여행 동행자와\n여행 후기를 한눈에!",
        "마이프로필에서 정보 추가 시,\n나와 잘맞는 동행자와 매칭률도 UP!",
      ]);
      setInfoMsgNum(0);
    }
  }, [loginState]);

  const router = useRouter();

  const onHomeLogo = () => {
    router.push("/main");
  };

  const onIntroduceBtn = () => {
    router.push("/main");
  };

  const onFindTripylerBtn = () => {
    router.push("/findTripyler/list");
  };

  const onTriplogBtn = () => {
    router.push("/main");
  };

  const onContactBtn = () => {
    router.push("/main");
  };

  const onLoginBtn = () => {
    router.push("/auth/signIn");
  };

  const onJoinBtn = () => {
    router.push("/auth/join");
  };

  const onMesseageBtn = () => {
    router.push("/auth/profile");
  };

  const onLikeBtn = () => {
    router.push("/auth/profile");
  };

  const onProfileBtn = () => {
    router.push("/auth/profile");
  };

  const onClickInfoMsgBtn = () => {
    if (infoMsgNum < 2) {
      setInfoMsgNum((prev) => prev + 1);
    } else {
      setInfoMsgNum(-1);
      setIsFirstLogin(false);
      router.push("/auth/profile");
    }
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Container>
            <HomeLogo src="/assets/logo.png" alt="로고" onClick={onHomeLogo} />
          </Container>
          <PageList>
            <Item onClick={onIntroduceBtn}>Trip'yler 소개</Item>
            <Item onClick={onFindTripylerBtn}>Trip'yler 찾기</Item>
            <Item onClick={onTriplogBtn}>여행 후기</Item>
            <Item onClick={onContactBtn}>Contact</Item>
          </PageList>

          {!loginState ? (
            <AuthList hideText={props.login}>
              <BeforeLoginItem>
                <SignInBtn onClick={onLoginBtn}>로그인</SignInBtn>
              </BeforeLoginItem>
              <BeforeLoginItem>
                <SignUpBtn onClick={onJoinBtn}>회원가입</SignUpBtn>
              </BeforeLoginItem>
            </AuthList>
          ) : (
            <AuthList>
              <AfterLoginItem id="3">
                <NicknameWrapper src="/icon/bell.png" />
              </AfterLoginItem>
              <AfterLoginItem id="0" infoMsgNum={infoMsgNum}>
                <NicknameWrapper
                  src="/icon/messenger.png"
                  onClick={onMesseageBtn}
                />
              </AfterLoginItem>
              <AfterLoginItem id="1" infoMsgNum={infoMsgNum}>
                <NicknameWrapper
                  src="/icon/heart_gray.png"
                  onClick={onLikeBtn}
                />
              </AfterLoginItem>
              <AfterLoginItem id="2" infoMsgNum={infoMsgNum}>
                <NicknameWrapper
                  src="/icon/profile.png"
                  onClick={onProfileBtn}
                />
              </AfterLoginItem>
              {isFirstLogin && (
                <InfoMsg>
                  <InfoMsgTxt>{infoMsg[infoMsgNum]}</InfoMsgTxt>
                  <InfoMsgBtn onClick={onClickInfoMsgBtn}>
                    {infoMsgNum == 2 ? "마이프로필 등록" : "다음"}
                  </InfoMsgBtn>
                </InfoMsg>
              )}
            </AuthList>
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

const PageList = styled.ul`
  display: flex;
  padding-left: 0;
  gap: 30px;
`;

const AuthList = styled(PageList)`
  gap: 0px;
  visibility: ${(props) => (props.hideText ? "hidden" : "visible")};
`;

const Item = styled.li`
  padding: 20px 20px;
  font-size: 20px;
  white-space: nowrap;
  margin: 0 0.5vw;
  font-weight: 600;
  color: 000;
  cursor: pointer;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const BeforeLoginItem = styled.li`
  margin-right: 1rem;
  white-space: nowrap;
  font-weight: bold;
`;

const AfterLoginItem = styled.li`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.id == props.infoMsgNum ? "rgba(179, 136, 235, 30%)" : "transparent"};

  border-radius: 50%;
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

const NicknameWrapper = styled.img`
  cursor: pointer;
`;

const InfoMsg = styled.div`
  width: 320px;
  height: 120px;
  border: 1px solid #b388eb;
  border-radius: 15px;
  background-color: #ffffff;
  position: absolute;
  top: 120%;
  left: -25%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoMsgTxt = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  color: #666666;
  white-space: pre-line;
`;

const InfoMsgBtn = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  background-color: #b388eb;
  color: #ffffff;
  text-align: center;
  border-radius: 10px;
`;
