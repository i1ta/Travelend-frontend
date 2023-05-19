import styled from '@emotion/styled';
import axios from 'axios';

import Layout from '../../src/components/commons/Layout/Layout.js';
import LoginForm from '../../src/components/units/LoginForm.js';


import { REST_API_KEY, KAKAO_REDIRECT_URL } from '@/OAuth/kakao.js';
import { CALLBACK_URL } from '@/OAuth/naver.js';


function login() {

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=9dd98e572c5ca5fb5da7011d9ef2f27f&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
  const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=NvJntlXGqc8teHynzWCI&state=9kgsGTfH4j7IyAkg&redirect_uri=${CALLBACK_URL}&response_type=code`;
  const onKaKaoHandler = async () => {
    try {
      window.location.href = KAKAO_AUTH_URI;
    }
    catch (error) {
      console.log(error);
    }
  }

  const onNaverHandler = async () => {
    try {
      window.location.href = NAVER_AUTH_URI;
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Layout login />
      <Container>
        <LoginForm />
        <Box>
          <Link href='/auth/findId'>아이디 찾기</Link>
          <span>⏐</span>
          <Link href='/auth/findPw'>비밀번호 찾기</Link>
        </Box>
        <Box>
          <Text>Trip'yle 가 처음이신가요?</Text>
          <Button>
            <LinkUp href='/auth/signUp'>Sign Up</LinkUp>
          </Button>
        </Box>
        <Box>
          <span>⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼</span>
          <Text> SNS 로그인 </Text>
          <span>⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼</span>
        </Box>
        <Box>
          <div
            onClick={onKaKaoHandler}
          >KaKao</div>
          <div
            onClick={onNaverHandler}
          >Naver</div>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 10rem 0;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.7rem;
`

const Link = styled.a`
  text-decoration: none;
  color: #666666;
  margin: 0 20px;
  font-size: 13px;
  letter-spacing: -1.5px;

  &: hover{
    color: #999999;
  }
`;

const LinkUp = styled.a`
  text-decoration: none;
  color: #C8B6FF;
`;

const Text = styled.span`
  color: #666666;
  margin: 0 20px;
  font-size: 13px;
  letter-spacing: -1px;
  line-height: 250%;
`;

const Button = styled.button`
  border: 2.5px solid #C8B6FF;
  border-radius: 5px;
  background-color: white;
  color: #C8B6FF;

  padding: 7px 15px;
  margin: 0 20px;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  &:hover{
    border: 2.5px solid #9D7DFF;
  }
`

export default login;