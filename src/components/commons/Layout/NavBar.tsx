import {
  FindCardFilter,
  IsAdmin,
  IsFirstLogin,
  JwtTokenState,
  LoginState,
  logout,
} from "@/States/LoginState";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { CgProfile } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const jwtInfo = useRecoilValue(JwtTokenState);
  const [findCardFilter, setFindCardFilter] = useRecoilState(FindCardFilter);
  const [isFirstLogin, setIsFirstLogin] = useRecoilState(IsFirstLogin);
  const [isAdmin, setIsAdmin] = useRecoilState(IsAdmin);
  const [infoMsg, setInfoMsg] = useState<string[]>([]);
  const [infoMsgNum, setInfoMsgNum] = useState<number>(-1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 스크롤 이벤트
  let prevScrollPos = window.pageYOffset;

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isScrollingDown = currentScrollPos > prevScrollPos;

    prevScrollPos = currentScrollPos;
  };

  // 토큰이 만료되었을 경우
  function checkToken() {
    if (jwtInfo.expiryTime < new Date().getTime()) {
      alert("토큰이 만료되었습니다. 로그인을 다시 진행하여 주세요.");
      router.push("/auth/signIn");
      logout({ setJwtToken });
      setIsLoggedIn(false);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (isFirstLogin) {
      setInfoMsg([
        "여행동행자와 나눈 메세지를\n확인해보세요!",
        "내가 스크랩한 여행 동행자와\n여행 후기를 한눈에!",
        "마이프로필에서 정보 추가 시,\n나와 잘맞는 동행자와 매칭률도 UP!",
      ]);
      setInfoMsgNum(0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoggedIn]);

  const router = useRouter();

  const onLoginBtn = () => {
    router.push("/auth/signIn");
  };

  const onJoinBtn = () => {
    router.push("/auth/join");
  };

  const onMesseageBtn = () => {
    if (!checkToken()) {
      router.push({
        pathname: "/auth/profile",
        query: { category: "message" },
      });
    }
  };

  const onLikeBtn = () => {
    if (!checkToken()) {
      router.push({
        pathname: "/auth/profile",
        query: { category: "myCollections" },
      });
    }
  };

  const onProfileBtn = () => {
    if (!checkToken()) {
      router.push("/auth/profile");
    }
  };

  const onClickInfoMsgBtn = () => {
    if (!checkToken()) {
      if (infoMsgNum < 2) {
        setInfoMsgNum((prev) => prev + 1);
      } else {
        setInfoMsgNum(-1);
        setIsFirstLogin(false);
        router.push("/auth/profile");
      }
    }
  };

  // prettier-ignore
  return (
      <Nav>
        <NavContainer>
          <Container>
            <HomeLogo 
                src="/assets/logo.svg"
                alt="로고"
                onClick={() => {router.push("/"); setFindCardFilter({});}} />
          </Container>
          <PageList>
            <Item onClick={() => router.push("/introduce")}>Travelend 소개</Item>
            <Item onClick={() => {
              if(isLoggedIn) {
                if(!checkToken()) {
                  router.push("/findTripyler"); setFindCardFilter({});
                }
              } 
            }}>Travelender 찾기</Item>
            <Item onClick={() => {
              if(isLoggedIn) {
                if(!checkToken()){
                  router.push("/review")}}
                }
              } 
            >여행 후기</Item>
            <Item onClick={() => router.push("/contact")}>Contact</Item>
            {isAdmin && <AdminItem onClick={() => router.push("/admin")}>관리자 페이지</AdminItem>}
          </PageList>

          {!isLoggedIn ? (
            <AuthList>
              <BeforeLoginItem>
                <SignInBtn onClick={onLoginBtn}>로그인</SignInBtn>
              </BeforeLoginItem>
              <BeforeLoginItem>
                <SignUpBtn onClick={onJoinBtn}>회원가입</SignUpBtn>
              </BeforeLoginItem>
            </AuthList>
          ) : (
            <AuthList>
              <AfterLoginItem id="0" infoMsgNum={infoMsgNum}>
                <FiSend onClick={onMesseageBtn} style={{color: "#666", fontSize: "24px", cursor: "pointer"}}/>
              </AfterLoginItem>

              <AfterLoginItem id="1" infoMsgNum={infoMsgNum}>
                <IoMdHeartEmpty  onClick={onLikeBtn} style={{color: "#666", fontSize: "28px", cursor: "pointer"}}/>
              </AfterLoginItem>

              <AfterLoginItem id="2" infoMsgNum={infoMsgNum}>
                <CgProfile onClick={onProfileBtn} style={{color: "#666", fontSize: "24px", cursor: "pointer"}}/>
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

          <MenuBtnWrapper onClick={() => setIsMenuOpen(true)}>
            <MenuBtn src="/icon/menu.png"/>
          </MenuBtnWrapper>
        </NavContainer>

        {isMenuOpen && (
          <MenuWrapper>
            <MenuCloseBoxWrapper onClick={() => setIsMenuOpen(false)}></MenuCloseBoxWrapper>
            <MenuBoxWrapper>
              <MenuCloseBtnWrapper>
                <MenuCloseBtn 
                  src="/icon/close_menu.png" 
                  alt="close"
                  onClick={() => setIsMenuOpen(false)}
                />
              </MenuCloseBtnWrapper>

              <MenuCategoryWrapper>
                <MenuCategory onClick={() => {router.push("/addition/introduce"); setIsMenuOpen(false);}}>Trip'yler 소개</MenuCategory>
                <MenuCategory onClick={() => {
                  if(isLoggedIn) {
                    if(!checkToken()) {
                      router.push("/findTripyler"); setFindCardFilter({});
                    }
                  } 
                  setIsMenuOpen(false);
                }}>Trip'yler 찾기</MenuCategory>
                <MenuCategory
                  onClick={() => {
                  if(isLoggedIn) {
                    if(!checkToken()){
                      router.push("/review")
                    }
                  }
                  setIsMenuOpen(false);
                }}>여행 후기</MenuCategory>
                <MenuCategory onClick={() => {router.push("/addition/contact"); setIsMenuOpen(false);}}>Contact</MenuCategory>
              </MenuCategoryWrapper>
            </MenuBoxWrapper>
          </MenuWrapper>
        )}
      </Nav>
  );
}

const HomeLogo = styled.img`
  width: 120px;
  cursor: pointer;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  &.hidden {
    transform: translateY(-120px);
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  width: 95%;
  margin: auto;
`;

const PageList = styled.ul`
  display: flex;
  padding-left: 0;
  gap: 15px;

  ${({theme}) => theme.media.tablet}{
    display: none;
  }
  
  ${({theme}) => theme.media.mobile}{
    display: none;
  }

`;

const AuthList = styled(PageList)`
  gap: 0px;
  position: relative;

  ${({theme}) => theme.media.tablet}{
    display: none;
  }
  
  ${({theme}) => theme.media.mobile}{
    display: none;
  }
`;

const Item = styled.li`
  padding: 10px 20px;
  font-size: 16px;
  white-space: nowrap;
  margin: 0 0.5vw;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  border-radius: 5px;
`;

const AdminItem = styled(Item)`
  background-color: #9ab3f5;
  color: #fff;
`;

const BeforeLoginItem = styled.li`
  margin-right: 1rem;
  white-space: nowrap;
  font-weight: bold;
`;

const AfterLoginItem = styled.li<{ infoMsgNum: number }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background-color: ${(props) =>
    props.id == String(props.infoMsgNum)
      ? "rgba(179, 136, 235, 30%)"
      : "transparent"};

  border-radius: 50%;
`;

const Container = styled.div`
  padding-left: 0;
`;

const SignInBtn = styled.button`
  width: 100px;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid #9ab3f5;
  padding: 10px 0;
  text-align: center;

  color: #9ab3f5;
  font-size: 18px;
  cursor: pointer;
`;

const SignUpBtn = styled.button`
  width: 100px;
  background-color: #9ab3f5;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
`;

const InfoMsg = styled.div`
  width: 320px;
  height: 120px;
  border: 1px solid #b388eb;
  border-radius: 15px;
  background-color: #ffffff;
  position: absolute;
  top: 60px;
  left: -70px;

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

// 메뉴
const MenuBtnWrapper = styled.div`
  ${({theme}) => theme.media.desktop}{
    display: none;
  }
`;

const MenuBtn = styled.img`
    width: 2rem;
    height: 2rem;
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  z-index: 102;
`;

const MenuCloseBoxWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 60%;
  height: 100vh;

`;

const MenuBoxWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-direction: column;
`;

const MenuCloseBtnWrapper = styled.div`
  width: 100%;
  height: 7vh;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`;

const MenuCloseBtn = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const MenuCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  align-items: center;
`;

const MenuCategory = styled.li`
  font-size: 1.2rem;
  font-weight: 700;
  height: 8vh;
  text-align: center;
`;