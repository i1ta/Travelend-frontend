import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";

import { css } from "@emotion/styled";

import { KAKAO_REDIRECT_URL } from "@/OAuth/kakao.js";
import { CALLBACK_URL } from "@/OAuth/naver.js";

export default function SocialLogin() {
  const KAKAO_AUTH_URI = "보안상 삭제";
  const NAVER_AUTH_URI = "보안상 삭제";
  const onKaKaoHandler = async () => {
    try {
      window.location.href = KAKAO_AUTH_URI;
    } catch (error) {
      console.log(error);
    }
  };

  const onNaverHandler = async () => {
    try {
      window.location.href = NAVER_AUTH_URI;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
        <Text>Trip'yle 가 처음이신가요?</Text>
        <Button>
          <LinkUp href="/auth/join">Sign Up</LinkUp>
        </Button>
      </Box>
      <Box>
        <span>⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼</span>
        <Text> SNS 로그인 </Text>
        <span>⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼</span>
      </Box>
      <Box>
        <SocialImg onClick={onNaverHandler}>
          <StyledImage
            src="/assets/naver.png"
            alt="naver"
            width="45"
            height="45"
          />
        </SocialImg>
        <SocialImg onClick={onKaKaoHandler}>
          <StyledImage
            src="/assets/kakao.png"
            alt="kakao"
            width="45"
            height="45"
          />
        </SocialImg>
      </Box>
    </>
  );
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.7rem;
`;

const LinkUp = styled.a`
  text-decoration: none;
  color: #c8b6ff;
`;

const Text = styled.span`
  color: #666666;
  margin: 0 20px;
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 250%;
`;

const Button = styled.button`
  border: 2.5px solid #c8b6ff;
  border-radius: 5px;
  background-color: white;
  color: #c8b6ff;

  padding: 7px 20px;
  margin: 0 20px;

  font-size: 18px;
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
