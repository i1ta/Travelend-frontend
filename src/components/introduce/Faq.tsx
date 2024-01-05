import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

interface ItemProps {
  que: string;
  ans: string;
}

const Item = ({ que, ans }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ItemContainer>
      <Ask onClick={() => setIsOpen(!isOpen)}>
        <div>{que}</div>
        <IoIosArrowDown
          style={{
            fontSize: "18px",
            color: "#666",
            transform: isOpen ? "rotate(180deg)" : "",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Ask>
      <Line />
      {isOpen && <Answer>{ans}</Answer>}
    </ItemContainer>
  );
};

const Faq = () => {
  const data = [
    {
      que: "여행 스타일 기반 해시태그가 뭔지 궁금해요!",
      ans: "여행자 스타일을 분석한 데이터를 취합해 만든 50가지 태그로 회원가입 시 나를 대표하는 여행스타일 태그를 선택할 수 있습니다. 트래블랜드 이용자들의 프로필에 나와있는 여행스타일 태그로 나와 비슷한 여행스타일을 갖고 있는지를 빠르고 간편하게 파악할 수 있습니다.",
    },
    {
      que: "여행동행자 신청폼이 뭔가요?",
      ans: "불건전한 이용자들을 사전에 차단하거나 여행 스타일을 보다 구체적으로 파악하기 위한 시스템으로 동행 신청을 보낼 시, 동행을 원하는 상대방에게 간단한 자기소개 및 여행스타일 소개를 보내주세요. 상대방이 여러분의 소개를 본 후, 동행 수락 및 거절을 할 수 있습니다. 수락 후, 쪽지 대화 시 불건전한 용어를 사용 시, 신고 및 차단당할 수 있다는 점 유의 부탁드립니다.",
    },
    {
      que: "여행 동행 신청 절차를 자세히 알려주세요.",
      ans: "상대방 프로필에서 여행 스타일 태그로 여행 성향 파악 > 동행 신청폼 작성 및 전송 > 상대방의 수락 > 트래블랜드 내 쪽지 기능 이용 > 일정 수립 후 매칭으로 여행 동행 신청 및 매칭이 이루어집니다.",
    },
    {
      que: "불건전한 언행을 일삼는 이용자들은 어떻게 차단하나요?",
      ans: "쪽지 채팅 중 상대방이 불건전한 언행을 일삼는다면, 쪽지 채팅 기능 내 있는 신고 버튼을 눌러주세요. 우선 신고 후, 차단을 원하는지 물어보는 질문에 ‘네’를 눌러주시면 됩니다. 신고당한 횟수가 3회 누적 시 서비스 이용 2달간 제한됩니다.",
    },
  ];

  return (
    <Container>
      <Content>
        <Title>FAQ</Title>
        <Items>
          {data.map((el, idx) => (
            <Item key={idx} que={`${idx + 1}. ${el.que}`} ans={el.ans} />
          ))}
        </Items>
      </Content>
    </Container>
  );
};

export default Faq;

const Container = styled.div`
  background-color: #f7f9ff;
  padding: 100px 0;
`;

const Content = styled.div`
  width: 95%;
  max-width: 1000px;
  margin: auto;
`;

const Title = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.main2};
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

// Item Styles

const ItemContainer = styled.div`
  width: 100%;
`;

const Ask = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;

  div {
    color: #666;
    font-size: 18px;
  }
`;

const Line = styled.div`
  background-color: #999;
  width: 100%;
  height: 1px;
  margin-bottom: 4px;
`;

const Answer = styled.div`
  width: 100%;
  padding: 20px 24px;
  border-radius: 10px;
  background: #fff;
  color: #666;
  font-size: 16px;
  line-height: 180%;
`;
