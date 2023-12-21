import { styled } from "styled-components";

export default function FindTripylerBanner(props) {
  return (
    <Banner>
      <BannerContents>
        <BannerTitle>{props.title}</BannerTitle>
        <BannerSubTitle>{props.subTitle} </BannerSubTitle>
        <BannerImg src="/img/airplane.png" />
      </BannerContents>
    </Banner>
  );
}

const Banner = styled.div`
  width: 100%;
  height: 450px;
  background-color: #ddfaff;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 150px;
`;

const BannerContents = styled.div`
  width: 1400px;
  height: 100%;
  position: relative;
`;

const BannerTitle = styled.div`
  position: absolute;
  top: 150px;
  font-weight: 700;
  font-size: 60px;
  display: flex;
  color: #000000;
`;

const BannerSubTitle = styled.div`
  position: absolute;
  top: 246px;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  color: #a7a7a7;
`;

const BannerImg = styled.img`
  position: absolute;
  left: 720px;
`;
