import React from "react";
import styled from "@emotion/styled";

export default function Review () {
    return (
        <ReviewContents>
            <ReviewCard>
              <ReviewNum>1</ReviewNum>
              <ReviewUserImg src="img/hooni.jpeg"/>
              <ReviewUserWrapper>
                <ReviewUserNick>ilta0101</ReviewUserNick>
                <ReviewUserAge>20대 여성</ReviewUserAge>
                <ReviewUserHashWrapper>
                  <ReviewUserHashtag>#뚜벅이</ReviewUserHashtag>
                  <ReviewUserHashtag>#관광지</ReviewUserHashtag>
                  <ReviewUserHashtag>#사진찍기</ReviewUserHashtag>
                </ReviewUserHashWrapper>
              </ReviewUserWrapper>
              <ReviewImg src="img/review1.png"/>
              <ReviewInfoWrapper>
                <ReviewInfoCountry>
                <ReviewIcon src="icon/location.png"></ReviewIcon>
                  헝가리
                </ReviewInfoCountry>
                <ReviewInfoCityCal>
                  <ReviewInfoCity>부다페스트</ReviewInfoCity>
                  <ReviewInfoCal><ReviewIcon src="icon/calendar.png"></ReviewIcon>23.01.12 - 23.01.23</ReviewInfoCal>
                </ReviewInfoCityCal>
                <ReviewInfoLine></ReviewInfoLine>
                <ReviewInfoTitle>꿈 같았던 10박 11일 부다페스트 여행 후기</ReviewInfoTitle>
                <ReviewInfoLine></ReviewInfoLine>
                <ReviewIconLike>
                  <ReviewInfoIconWrapper><ReviewIcon src="icon/heart.png"></ReviewIcon>1.2k</ReviewInfoIconWrapper>
                  <ReviewInfoIconWrapper><ReviewIcon src="icon/comment.png"></ReviewIcon>24</ReviewInfoIconWrapper>
                </ReviewIconLike>
              </ReviewInfoWrapper>
            </ReviewCard>
          </ReviewContents>
    );
}

export const ReviewContents = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 20px;
`;

export const ReviewCard = styled.div`
  width: 1400px;
  height: 209px;

  margin-bottom: 50px;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: row;
`;

export const ReviewNum = styled.div`
  font-size: 40px;
  color: #C8B6FF;

  width: 120px;

  margin: 65px 0;
  text-align: center;
  align-items: center;
  justify-content: center;
`

export const ReviewUserImg = styled.img`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  
  border-radius: 100px;
  margin: 30px 0;
`;

export const ReviewUserWrapper = styled.div`
  width: 250px;
  margin-left: 30px;
  justify-content: center;

  display: flex;
  flex-direction: column;
`;

export const ReviewUserNick = styled.div`
    color: #C8B6FF;
    font-size: 36px;
`;

export const ReviewUserAge = styled.div`
    font-size: 32px;
    color: #A7A7A7;
    margin-top: 10px;
`;

export const ReviewUserHashWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;  

export const ReviewUserHashtag = styled.div`
    background-color: #00B4D8;
    color: white;
    border-radius: 30px;
    font-size: 12px;

    width: 70px;
    height: 28px;

    padding: 6px 0;
    margin-right: 15px;
    text-align: center;
`;

export const ReviewImg = styled.img`
  width: 300px;
  height: 160px;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  margin: 24.5px 0;
  margin-left: 40px;
`;

export const ReviewInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin-left: 40px;
    justify-content:center;
`;

export const ReviewInfoCountry = styled.div`
    color: #666666;
    font-size: 20px;

`;

export const ReviewIconLike = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 20px;
`;

export const ReviewInfoIconWrapper = styled.div`
  margin-right: 30px;
`;

export const ReviewIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`


export const ReviewInfoCityCal = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  margin: 8px 0;
`;

export const ReviewInfoCity = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const ReviewInfoCal = styled.div`
  font-size: 20px;
  color: #666666;
`;

export const ReviewInfoLine = styled.div`
    background-color: #D6D6D6;
    width: 380px;
    height: 0.5px;
`;

export const ReviewInfoTitle = styled.div`
    font-size: 18px;
    color: #9AB3F5;
    font-weight: bold;
    margin: 10px 0;
`;