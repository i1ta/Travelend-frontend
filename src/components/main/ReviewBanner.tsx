import PreviewCard from "@/components/commons/Card/Preview/Preview";
import styled from "styled-components";

export default function ReviewBanner () {
    return (
        <ReviewBannerWrapper>
            <ReviewBannerImgOneWrapper>
                <ReviewBannerImgOne src="/img/city1.avif" />
            </ReviewBannerImgOneWrapper>
            <ReviewBannerImgTwoWrapper>
                <ReviewBannerImgTwo src="/img/city2.jpg" />
            </ReviewBannerImgTwoWrapper>
            <PreviewWrapper>
                <PreviewCard />
            </PreviewWrapper>
        </ReviewBannerWrapper>
    )
}


/* 리뷰 배너*/
export const ReviewBannerWrapper = styled.div`
    width: 1960px;
    height: 770px;
    background-color: #EBF0FF;
    position: relative;

    margin: 150px auto;
`;

export const ReviewBannerImgOneWrapper = styled.div`
    position: absolute;
    top: 80px;
    left: 200px;
    width: 382px;
    height: 474px;
    border-radius: 30px;
    object-fit: cover;
`;

export const ReviewBannerImgOne = styled.img`
  width: 382px;
  height: 474px;
  border-radius: 30px; 
`;

export const ReviewBannerImgTwoWrapper = styled(ReviewBannerImgOneWrapper)`
    top: 220px;
    left: 450px;
`;

export const ReviewBannerImgTwo = styled(ReviewBannerImgOne)``;

export const PreviewWrapper = styled.div`
    position: absolute;
    right: 0;
`;