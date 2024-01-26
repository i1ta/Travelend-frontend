import { LoginState } from "@/States/LoginState";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function ReviewMain(props) {
  const ref = useRef();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  // 시간 형식 변경
  const formatTime = () => {
    const today = new Date();
    const timeValue = new Date(props.info.regDateTime);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };
  const [timeFormat, setTimeFormat] = useState(
    formatTime(props.info.regDateTime)
  );

  return (
    <ReviewContents>
      <ReviewCard onClick={() => props.onClick()}>
        <ReviewCardContentWrapper>
          <ReviewCardDesWrapper>
            <ReviewCardDes>
              <ReviewCardDesIcon src="/icon/location.png"></ReviewCardDesIcon>
              <ReviewCardDesNameWrapper>
                <ReviewCardNation>{props.info.nationName}</ReviewCardNation>
                <ReviewCardRegion>·</ReviewCardRegion>
                <ReviewCardRegion>{props.info.regionName}</ReviewCardRegion>
              </ReviewCardDesNameWrapper>
            </ReviewCardDes>
            <ReviewHashtagWrapper ref={ref}>
              <ReviewHashtag>#{props.info.hashtags[0]}</ReviewHashtag>
              <ReviewMobileHiddenHashtag>#{props.info.hashtags[1]}</ReviewMobileHiddenHashtag>
              <ReviewHiddenHashtag>#{props.info.hashtags[2]}</ReviewHiddenHashtag>
            </ReviewHashtagWrapper>
          </ReviewCardDesWrapper>
          <ReviewLine></ReviewLine>
          <ReviewDetailWrapper>
            <ReviewDetailTitle>{props.info.title}</ReviewDetailTitle>
            <ReviewDetailContent>
              {props.info.content.length < 169
                ? props.info.content
                : props.info.content.substring(0, 169) + "..."}
            </ReviewDetailContent>
          </ReviewDetailWrapper>
          <ReviewLongLine></ReviewLongLine>
          <ReviewInfoWrapper>
            <ReviewInfoTime>{timeFormat}</ReviewInfoTime>
            <ReviewInfoAdditionWrapper>
              <ReviewInfoAdditionIcon src="/icon/heart.png"></ReviewInfoAdditionIcon>
              <ReviewInfoAdditionTxt>{props.info.likes}</ReviewInfoAdditionTxt>
              <ReviewInfoAdditionIcon src="/icon/comment.png"></ReviewInfoAdditionIcon>
              <ReviewInfoAdditionTxt>
                {props.info.comments}
              </ReviewInfoAdditionTxt>

              <ReviewInfoAdditionIcon src="/icon/view_gray.png"></ReviewInfoAdditionIcon>
              <ReviewInfoAdditionTxt>{props.info.hits}</ReviewInfoAdditionTxt>
            </ReviewInfoAdditionWrapper>
          </ReviewInfoWrapper>
        </ReviewCardContentWrapper>
        <ReviewImgWrapper>
          <ReviewCardImg
            src={
              props.info.image === null
                ? "/img/defaultImg.png"
                : props.info.image
            }
          ></ReviewCardImg>
        </ReviewImgWrapper>
      </ReviewCard>
    </ReviewContents>
  );
}

const ReviewContents = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 1rem;
  width: 100%;
`;

const ReviewCard = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 340px;

  margin-bottom: 50px;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: row;

  align-items: center;
  cursor: pointer;

 


`;

const ReviewCardContentWrapper = styled.div`
  max-width: 824px;
  width: 58.8%;
  height: 340px;
  padding: 1.5rem 0;

  display: flex;
  flex-direction: column;
`;

const ReviewCardDesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 1.5rem;
  height: 70px;
`;

const ReviewCardDes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ReviewCardDesIcon = styled.img`
  width: 0.9rem;
  height: 1rem;

  margin-top: 10px;
`;

const ReviewCardDesNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewCardNation = styled.div`
  font-size: 1.5rem;
  color: #666666;
  margin-left: 0.5rem;
`;

const ReviewCardRegion = styled.div`
  font-size: 1.5rem;
  color: #000000;
  margin-left: 0.5rem;
`;

const ReviewHashtagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;

const ReviewHashtag = styled.div`
  background-color: ${theme.colors.review};
  border-radius: 30px;
  width: 100%;
  height: 43px;

  text-align: center;

  color: #ffffff;
  font-size: 1.25rem;
  font-weight: bold;
  padding-top: 3px;
  padding: 4px 0.75rem 0 0.75rem;
  margin: 0 7px;
  white-space: nowrap;
`;

const ReviewHiddenHashtag = styled(ReviewHashtag)`
  @media screen and (max-width: 1023.9px){
    display: none;
  }
  @media screen and (max-width: 767.9px){
    display: none;
  }
`;

const ReviewMobileHiddenHashtag = styled(ReviewHashtag)`
  @media screen and (max-width: 767.9px){
    display: none;
  }
`;

const ReviewLine = styled.div`
  height: 0.5px;
  // max-width: 294px;
  width: 90%;
  background-color: #d6d6d6;
  margin-left: 1.5rem;
  // margin-top: 20px;
`;
const ReviewLongLine = styled(ReviewLine)`
  // width: 765px;
  width: 90%;
`;

const ReviewDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  height: 150px;
`;

const ReviewDetailTitle = styled.div`
  font-size: 1.25rem;
  color: #9ab3f5;
  font-weight: bold;
  margin: 20px 0 0 0;
`;

const ReviewDetailContent = styled.div`
  height: 117px;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  margin-bottom: 0.5rem;
  // align-items: center;
  // justify-content: center;

  @media screen and (max-width: 767.9px){
    overflow: hidden;
  }
`;

const ReviewInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 1.5rem;
  // margin-top: 30px;
  height: 60px;
`;

const ReviewInfoTime = styled.div`
  font-size: #666666;
  font-size: 0.8rem;
  margin-left: 10px;
`;

const ReviewInfoAdditionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewInfoAdditionIcon = styled.img`
  width: 1.25rem;
  height: 1rem;
  margin-right: 0.4rem;
  margin-top: 5px;
`;

const ReviewInfoAdditionTxt = styled.div`
  font-size: 0.8rem;
  color: #666666;
  margin-right: 0.75rem;
`;

const ReviewImgWrapper = styled.div`
  max-width: 530px;
  width: 100%;
  height: 282px;
  padding-right: 1rem;
`;

const ReviewCardImg = styled.img`
  max-width: 530px;
  width: 100%;
  height: 282px;
  object-fit: cover;
`;
