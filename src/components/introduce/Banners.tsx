import styled from "styled-components";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa6";

const Banners = () => {
  const router = useRouter();

  return (
    <>
      <ColoredContainer>
        <Content>
          <ContentImg src="/img/introduce1.svg" />
          <Circle style={{ right: "-350px", top: "-10px" }} />
        </Content>
        <Content>
          <ContentImg src="/img/introduce2.svg" />
          <Circle style={{ left: "-350px", top: "-100px" }} />
        </Content>
      </ColoredContainer>
      <UncoloredContainer>
        <Content>
          <ContentImg src="/img/introduce3.svg" />
          <Btn onClick={() => router.push("/findTripyler")}>
            <div>여행자 찾기 바로가기</div>
            <FaChevronRight style={{ fontSize: "18px", color: "white" }} />
          </Btn>
        </Content>
      </UncoloredContainer>
    </>
  );
};

export default Banners;

const UncoloredContainer = styled.div`
  padding: 100px 0;
  background-color: #fff;
  display: flex;
  overflow: hidden;
`;

const ColoredContainer = styled(UncoloredContainer)`
  background-color: #f7f9ff;
  flex-direction: column;
  align-items: center;
  gap: 300px;
`;

const Content = styled.div`
  position: relative;
  width: 95%;
  max-width: 1000px;
  margin: auto;
  z-index: 0;
`;

const ContentImg = styled.img`
  width: 100%;
`;

const Circle = styled.div`
  background-color: rgba(110, 145, 231, 0.2);
  border-radius: 50%;
  position: absolute;
  width: 500px;
  height: 500px;
  z-index: -1;
`;

const Btn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.main2};
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  padding: 15px 30px;

  div {
    color: white;
    font-size: 18px;
  }
`;
