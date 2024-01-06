import { BannerProps } from "@/interfaces/detail";
import styled from "styled-components";

export default function Banner({ imageUrl }: BannerProps) {
  return (
    <Container>
      <BannerImg src={imageUrl || "/img/defaultImg.png"} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ddfaff;
  overflow: hidden;
  margin-bottom: 100px;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
