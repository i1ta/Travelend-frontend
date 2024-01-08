import styled from "styled-components";

interface BannerProps {
  children: React.ReactNode;
  isReview?: boolean;
  isEdit?: boolean;
}

export default function Banner({ children, isReview, isEdit }: BannerProps) {
  return (
    <Container>
      <TitleTxt>
        <Title>
          {isReview ? "여행 후기 " : "Travelend 찾기 "} 게시물
          {isEdit ? " 수정" : " 작성"}
        </Title>
        <SubTitle>
          {isReview
            ? "Travelend와 함께한 여행 후기를 들려주세요"
            : "본인에게 가장 적합한 여행자를 찾아보세요"}
        </SubTitle>
      </TitleTxt>
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 500px;
  background: ${({ theme }) => theme.colors.main2};
  display: flex;
  justify-content: center;
  position: relative;
`;

const TitleTxt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  margin-top: 140px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
