import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export default function FindCard () {
  const router = useRouter();
    return(
        <ReviewCard>
            <ReviewImg src="/img/review1.png"></ReviewImg>
            <ReviewCardHeader>
              <ReviewInfo>
                <CountryWrapper>
                  <ReviewIcon src="/icon/location.png"></ReviewIcon>
                  <ReviewInfoTxt>그리스</ReviewInfoTxt>
                </CountryWrapper>
                <ReviewCity>산토리니</ReviewCity>
              </ReviewInfo>
              <ReviewInfo>
                <ReviewInfoWrapper>
                  <ReviewIcon src="/icon/user.png"></ReviewIcon>
                  <ReviewInfoTxt>2인 모집 중/총 4인</ReviewInfoTxt>
                </ReviewInfoWrapper>
                <ReviewInfoWrapper style={{ "margin-bottom": "5px" }}>
                  <ReviewIcon src="/icon/calendar.png"></ReviewIcon>
                  <ReviewDateTxt>
                    <ReviewInfoTxt>23.01.12</ReviewInfoTxt>
                    <ReviewDateLine></ReviewDateLine>
                    <ReviewInfoTxt>23.01.23</ReviewInfoTxt>
                  </ReviewDateTxt>
                </ReviewInfoWrapper>
              </ReviewInfo>
            </ReviewCardHeader>
            <ReviewUserWrapper>
              <ReviewUser>
                <ReviewUserImg src="/img/cheolsoo.jpg"></ReviewUserImg>
                <ReviewUserInfoWrapper>
                  <ReviewUsername>ilta0101</ReviewUsername>
                  <ReviewAge>20대 여성</ReviewAge>
                </ReviewUserInfoWrapper>
              </ReviewUser>
              <ReviewHashTagWrapper>
                <ReviewHashTag>#뚜벅이</ReviewHashTag>
                <ReviewHashTag>#관광지</ReviewHashTag>
                <ReviewHashTag>#사진찍기</ReviewHashTag>
            </ReviewHashTagWrapper>
            </ReviewUserWrapper>
            <ReviewLine></ReviewLine>
            <ReviewCardContents>
              <ReviewCardContentsTitle>
                3박 4일 산토리니 여행 동행 구합니다
              </ReviewCardContentsTitle>
              <ReviewCardContentsContent>
                여름 휴가는 보통 친구들이랑 날짜 맞춰서 가는데 이번에는 맞지 않아서 트리플리를 통해 동행 구해보고자 합니다. ...
              </ReviewCardContentsContent>
            </ReviewCardContents>
            <ReviewCardFooter>
              <ReviewReactWrapper>
                <ReviewCardTime>7시간 전</ReviewCardTime>
                <ReviewReactContent>
                  <ReviewReactIcon src="/icon/heart.png"></ReviewReactIcon>
                  <ReviewReactTxt>1.2k</ReviewReactTxt>
                  <ReviewReactIcon src="/icon/comment.png"></ReviewReactIcon>
                  <ReviewReactTxt>24</ReviewReactTxt>
                  <ReviewReactIcon src="/icon/message.png"></ReviewReactIcon>
                  <ReviewReactMsgTxt>Message</ReviewReactMsgTxt>
                  <ReviewReactIcon src="/icon/views.png"></ReviewReactIcon>
                  <ReviewReactTxt>1,200</ReviewReactTxt>
                </ReviewReactContent>
              </ReviewReactWrapper>
              <ReviewDetailBtn>
                <ReviewDetailBtnTxt onClick={(e) => router.push("/findTripyler/detail")}>상세보기</ReviewDetailBtnTxt>
                <BtnArrow></BtnArrow>
              </ReviewDetailBtn>
            </ReviewCardFooter>
          </ReviewCard>
    )
}

const ReviewCard = styled.div`
  width: 335px;
  height: 453px;
  background: #ffffff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ReviewImg = styled.img`
  width: 335px;
  height: 200px;
  margin-bottom: 20px;
`;

const ReviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 295px;
  margin-bottom: 14px;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 102px;
`;

const CountryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 3px;
`;

const ReviewInfoTxt = styled.div`
  font-weight: 300;
  font-size: 10px;
  line-height: 1;
  color: #666666;
`;

const ReviewCity = styled.div`
  margin-top: 7px;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  color: #000000;
`;

const ReviewInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 0;
`;

const ReviewDateTxt = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewDateLine = styled.div`
  width: 4px;
  height: 0.7px;
  background-color: #666666;
  margin: 0px 4px;
`;

const ReviewUserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 3px;
  margin-bottom: 3px;
  width: 310px;
`;

const ReviewUser = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const ReviewUserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  margin-right: 8px;
`;

const ReviewUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewUsername = styled.div`
  color: #C8B6FF;
  font-size: 10px;
`;

const ReviewAge = styled.div`
  color: #666666;
  font-size: 10px;
`;

const ReviewHashTagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ReviewHashTag = styled.button`
  height: 20px;
  padding: 0px 8px;
  margin-right: 8px;
  background: #00b4d8;
  border-radius: 30px;

  font-weight: 500;
  font-size: 10px;
  color: #ffffff;
`;

const ReviewLine = styled.div`
  width: 295px;
  height: 1px;
  background-color: #d6d6d6;
  margin-bottom: 8px;
  
`;

const ReviewCardContents = styled.div`
  width: 295px;
  height: 90px;

  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color: #333333;
`;

const ReviewCardContentsTitle = styled.div`
  color: #9AB3F5;
  font-size: 15px;
  font-weight: bold;
  margin: 8px 0;
`

const ReviewCardContentsContent = styled.div`
  color: #333333;
  font-size: 12;
  line-height: 15px;
`;

const ReviewCardFooter = styled.div`
  width: 295px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid rgba(214, 214, 214, 0.3);
`;

const ReviewCardTime = styled.div`
  color: #666666;
  font-size: 10px;
`;

const ReviewReactContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px 0;
`

const ReviewReactWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewReactIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 4px;
`;

const ReviewReactTxt = styled.div`
  width: 25px;
  margin: 0 2px;  
  font-weight: 400;
  font-size: 10px;
  line-height: 1;
  color: #666666;
`;

const ReviewReactMsgTxt = styled(ReviewReactTxt)`
  margin-right: 23px;
`

const ReviewDetailBtn = styled.button`
  width: 62px;
  height: 24px;
  background: #9ab3f5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewDetailBtnTxt = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  color: #ffffff;
`;

const BtnArrow = styled.img``;
