import { useEffect } from "react";
import { useRouter } from 'next/router';
import styled from "@emotion/styled";
import Image from "next/image";

export default function Layout(props) {
  const router = useRouter();
  useEffect(() => {
    console.log(props);
  }, [props]);

  const onLoginBtn = () => {
    router.push('/auth/signIn')
  };

  const onJoinBtn = () => {
    router.push('/auth/join');
  }

  return (
    <>
      <Nav>
        <NavContainer>
          <Container>
            <Image src="/assets/logo.png" alt="로고" width="150" height="60" />
          </Container>
          <List>
            <Item>
              <Link href='/'>Trip'yler 소개</Link>
            </Item>
            <Item>
              <Link href='/'>Trip'yler 찾기</Link>
            </Item>
            <Item>
              <Link href='/'>여행 후기</Link>
            </Item>
            <Item>
              <Link href='/'>여행 가이드</Link>
            </Item>
            <Item>
              <Link href='/'>Contact</Link>
            </Item>
        </List>
          {props.login === true ? (
            <List hideText>
              <UserItem>
                <SignInBtn>로그인2</SignInBtn>
              </UserItem>
              <UserItem>
                <SignUpBtn>회원가입1</SignUpBtn>
              </UserItem>
            </List>
          ) : (
            <List>
              <UserItem>
                <SignInBtn
                  onClick={
                    onLoginBtn
                  }
                >
                  로그인
                </SignInBtn>
              </UserItem>
              <UserItem>
                <SignUpBtn
                  onClick={
                    onJoinBtn
                  }
                >
                  회원가입
                </SignUpBtn>
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

const NavBottom = styled.div`
  width: 100%;
  height: 120px;
`;

const Nav = styled.nav`
  background-color: #ffffff;
  padding: 30px 0;
  box-shadow: 0px 1px 10px #999;
  z-index: 100;

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
  max-width: 1440px;
  margin: 0 auto;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding-left: 0;
  
  visibility: ${(props) => (props.hideText ? 'hidden' : 'visible')}

`

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
  border: 2px solid #C8B6FF;

  color: #C8B6FF;
  letter-spacing: -2px;

  font-size: 18px;

  padding: 0.7rem 1.5rem;
  cursor: pointer;


`;

const SignUpBtn = styled.button`
  
  background-color: #C8B6FF;
  color: white;
  border-radius: 50px;
  border: 2px solid #c8b6ff;
  color: white;
  letter-spacing: -2px;

  font-size: 18px;

  padding: 0.7rem 1.5rem;
  cursor: pointer;
`;
