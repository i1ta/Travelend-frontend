import styled from '@emotion/styled';

import FindPwForm from '@/components/units/FindPwForm';
import Header from '@/components/commons/Layout/Layout';

import naver from '../../public/assets/naver.png';

export default function findPw() {
  return (
    <>
      <Header />
      <Container>
        <FindPwForm />
        <Box>
          <Link href='/auth/findId'>아이디 찾기</Link>
        </Box>
        <Box>
          <Text>Trip'yle 가 처음이신가요?</Text>
          <Button>
            <LinkUp href='/auth/signUp'>Sign Up</LinkUp>
          </Button>
        </Box>
        <Box>
          <span>⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼ </span>
          <Text> SNS 로그인 </Text>
          <span> ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼</span>
        </Box>
        <Box>
          <a>
            <img src={naver} />
          </a>
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
  line-height: 200%;
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