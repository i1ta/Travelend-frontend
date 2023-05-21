import styled from '@emotion/styled';

import FindPwForm from '../../src/components/units/auth/findInfo/FindPw.container.js';
import Header from '@/components/commons/Layout/Layout';
import SocialLogin from '@/components/commons/Layout/SocialLogin.js/SocialLogin.js';

export default function findPw() {
  return (
    <>
      <Header />
      <Container>
        <FindPwForm />
        <Box>
          <Link href='/auth/findId'>아이디 찾기</Link>
        </Box>
        <SocialLogin/>
      </Container>
    </>
  );

};

const Container = styled.div`
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