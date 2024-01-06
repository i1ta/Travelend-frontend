import { useRouter } from "next/router";
import { styled } from "styled-components";

import { CiMail } from "react-icons/ci";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <FooterTop />
      <Foot>
        <Container>
          <Section>
            <Logo src="/assets/logo.svg" />
            <Content>
              Trip’yle는 여행자들에게 좀 더 색다른 여행 스타일을 <br />
              제공해주는 ‘여행 동행자 매칭 플랫폼’입니다. <br />
              Trip’yle에서 본인과 잘 맞는 여행 동행자들을 찾아 보고 <br />
              각자의 여행 후기를 공유하며 소통해보세요.
            </Content>
          </Section>
          <Section>
            <Title>Quick Link</Title>
            <MenuWrapper>
              <Menu onClick={() => router.push("/main")}>Trip’yle 소개</Menu>
              <Menu onClick={() => router.push("/findTripyler")}>
                Trip’yler 찾기
              </Menu>
              <Menu onClick={() => router.push("/review")}>여행 후기</Menu>
              <Menu onClick={() => router.push("/main")}>Contact</Menu>
            </MenuWrapper>
          </Section>
          <InfoSection>
            <Title>Information</Title>
            <ItemWrapper>
              <Item>
                <IoIosCall style={{ color: "#666", fontSize: "24px" }} />
                <ItemTxt>02-1234-1234</ItemTxt>
              </Item>
              <Item>
                <CiMail style={{ color: "#666", fontSize: "24px" }} />
                <ItemTxt>Tripyler@naver.com</ItemTxt>
              </Item>
              <Item>
                <SnsImgWrapper>
                  <FaInstagram style={{ color: "#fff", fontSize: "35px" }} />
                </SnsImgWrapper>
                <SnsImgWrapper>
                  <FaYoutube style={{ color: "#fff", fontSize: "35px" }} />
                </SnsImgWrapper>
                <SnsImgWrapper>
                  <SnsImg src="/icon/blog.svg" />
                </SnsImgWrapper>
              </Item>
            </ItemWrapper>
          </InfoSection>
        </Container>
      </Foot>
    </>
  );
}

const FooterTop = styled.div`
  height: 200px;
`;

const Foot = styled.div`
  width: 100%;
  height: 500px;
  background-color: rgba(154, 179, 245, 0.2);
  padding-top: 110px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 50px;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  color: #666;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;

  ${({theme}) => theme.media.mobile}{
    display: none;
    align-items: center;
    justify-contents: center;
  }
`;

const InfoSection = styled(Section)`
  ${({theme}) => theme.media.tablet}{
    display: block;
    text-align: center;
  }
  ${({theme}) => theme.media.mobile}{
    display: block;
    text-align: center;
    margin: 0 auto;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 85px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 35px;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Menu = styled(Content)`
  line-height: 16px;
  cursor: pointer;
`;

const ItemWrapper = styled(MenuWrapper)`
  gap: 30px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  ${({theme}) => theme.media.tablet}{
    justify-content: center;
  }
  ${({theme}) => theme.media.mobile}{
    justify-content: center;
  }
`;

const ItemTxt = styled.div`
  font-size: 16px;
  font-weight: 500;
  flex: 1;
`;

const SnsImgWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #666;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SnsImg = styled.img`
  width: 60%;
`;
