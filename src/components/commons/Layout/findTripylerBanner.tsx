import theme from "@/styles/theme";
import { css, styled } from "styled-components";

export default function FindTripylerBanner(props: any) {
  return (
    <>
      <Banner review={props?.review}>
        <BannerContentsWrapper>
          <BannerContents>
            <BannerTitle review={props?.review}>{props?.title}</BannerTitle>
            {typeof props?.subTitle === "string" ? (
              <BannerSubTitle review={props?.review}>{props?.subTitle}</BannerSubTitle>
            ) : (
              <>
                {props.subTitle?.map((e: any, i: number) => (
                  <BannerSubTitle
                    key={i}
                    style={{ top: `calc(${i} * 45px + 246px)` }}
                    review={props?.review}
                  >
                    {e}
                  </BannerSubTitle>
                ))}
              </>
            )}
          </BannerContents>
          <BannerImgWrppaer>
            {/* <BannerImg src="/img/airplane.png"></BannerImg> */}
          </BannerImgWrppaer>
        </BannerContentsWrapper>
      </Banner>
    </>
  );
}

const Banner = styled.div<{ review: boolean }>`
  max-width: 1640px;
  width: 100%;
  height: 570px;
  margin: 0 auto;

  ${(props) => (props.review 
    ? 
      css`
        background-color: ${theme.colors.main2};
        margin-bottom: 150px;
      ` 
    : 
      css`
        background-image: url("img/bannerImg.png");
        background-size: cover;
      `
  )};
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const BannerContentsWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BannerContents = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const BannerTitle = styled.div<{ review: boolean }>`
  position: absolute;
  top: 150px;
  font-weight: bold;
  font-size: 3rem;
  display: flex;
  color: ${(props) => (props.review ? '#fff' : '#000')};
`;

const BannerSubTitle = styled.div<{ review: boolean }>`
  position: absolute;
  top: 246px;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  color: ${(props) => (props.review ? '#fff' : theme.colors.text)};
`;

const BannerImgWrppaer = styled.div`
  // background-image: url("img/airplane.png");
  // background-size: cover;

  // width: 500px;
  // height: 200px;
  // margin-left: 320px;
`;

const BannerImg = styled.img`
  // background-image: url("img/airplane.png");
  // background-size: cover;
`;
