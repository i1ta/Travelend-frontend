import styled from "@emotion/styled";

import SocialLogin from "@/components/commons/Layout/SocialLogin.js/SocialLogin.js";
import FindIdForm from "../../src/components/auth/findInfo/FindId.container.js";

export default function findId() {
  return (
    <>
      <FindIdForm />
      <Box>
        <Link href="/auth/findPw">비밀번호 찾기</Link>
      </Box>
      <SocialLogin />
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
  margin-bottom: 20px;
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
  line-height: 200%;
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
