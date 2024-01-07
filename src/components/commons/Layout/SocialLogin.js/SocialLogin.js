import styled from "@emotion/styled";
import Image from "next/image";


import { KAKAO_REDIRECT_URL } from "@/OAuth/kakao.js";
import { CALLBACK_URL } from "@/OAuth/naver.js";

export default function SocialLogin() {
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
  const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=NvJntlXGqc8teHynzWCI&state=9kgsGTfH4j7IyAkg&redirect_uri=${CALLBACK_URL}&response_type=code`;
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
        <BaseLineWrapper><BaseLine></BaseLine></BaseLineWrapper>
        <Text> SNS 로그인 </Text>
        <BaseLineWrapper><BaseLine></BaseLine></BaseLineWrapper>
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

const BaseLineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BaseLine = styled.span`
  background-color: #000;
  height: 1px;
  width: 128px;

`;