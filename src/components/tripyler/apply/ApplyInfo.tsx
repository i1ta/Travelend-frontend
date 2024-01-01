import styled from "styled-components";
import { IoHelpCircleOutline } from "react-icons/io5";

export default function ApplyInfo() {
  return (
    <Container>
      <Title>
        <IoHelpCircleOutline style={{ color: "#666", fontSize: "24px" }} />
        <div>Traveler 신청폼</div>
      </Title>
      <Content>
        트리플리는 플랫폼 내에서 불건전한 행동을 예방하기 위해, 유저들이
        Traveler로 신청할 때 간단한 자기소개와 여행 스타일을 작성하도록 유도하고
        있습니다. 이 정보는 상대방이 확인하고 수락해야만 쪽지 채팅이 가능하며,
        이는 더 적합한 여행 파트너를 찾기 위한 조치입니다.
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 80px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  div {
    color: #666;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Content = styled.div`
  padding: 20px 30px;
  border-radius: 5px;
  background: rgba(217, 217, 217, 0.3);

  color: #333;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;
