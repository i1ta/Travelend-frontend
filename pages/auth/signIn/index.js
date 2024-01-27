import styled from "@emotion/styled";
import Image from "next/image";

import LoginForm from "@/components/auth/login/Login.container.js";
import SocialLogin from "@/components/commons/Layout/SocialLogin.js/SocialLogin.js";

function login() {
  return (
    <>
      <div>
        <LoginForm />
        <Box>
          <Link href="/auth/findId">아이디 찾기</Link>
          <span>⏐</span>
          <Link href="/auth/findPw">비밀번호 찾기</Link>
        </Box>
        <SocialLogin />
      </div>
    </>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.7rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #666666;
  margin: 0 20px;
  font-size: 16px;
  letter-spacing: -1.5px;

  &:hover {
    color: #999999;
  }
`;

const LinkUp = styled.a`
  text-decoration: none;
  color: #c8b6ff;
`;

const Text = styled.span`
  color: #666666;
  margin: 0 20px;
  font-size: 13px;
  letter-spacing: -1px;
  line-height: 250%;
`;

const Button = styled.button`
  border: 2.5px solid #c8b6ff;
  border-radius: 5px;
  background-color: white;
  color: #c8b6ff;

  padding: 7px 15px;
  margin: 0 20px;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    border: 2.5px solid #9d7dff;
  }
`;

const SocialImg = styled.div`
  margin: 0 50px;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  border-radius: 50px;
`;

export default login;
