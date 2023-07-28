import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { LoginState } from '@/States/LoginState';

export default function Review (props) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const checkLogin = async () => {
    if(!isLoggedIn){
      alert('로그인이 필요한 서비스입니다');
      router.push("/auth/signIn");
    } else{
      router.push(`/review/${props.info.reviewId}`)
    }
  };
    return (
        <ReviewContents>
            <ReviewCard onClick={checkLogin}>
              <ReviewNum>{props.idx}</ReviewNum>
              <ReviewUserImg src={props.info.userProfileUrl}/>
              <ReviewUserWrapper>
                <ReviewUserNick>{props.info.username}</ReviewUserNick>
                <ReviewUserAge>{parseInt(parseInt(props.info.age) / 10) * 10}대 {props.info.gender === "M" ? "남성" : "여성"}</ReviewUserAge>
                <ReviewUserHashWrapper>
                  {props.info.hashtags.map((hashtag, i) => { (i >= 0 && i < 3) && (<ReviewUserHashtag>#{hashtag}</ReviewUserHashtag>)})}
                </ReviewUserHashWrapper>
              </ReviewUserWrapper>
              <ReviewImgWrapper>
                <ReviewImg src={props.info.image === null ? "/img/defaultImg.png" : props.info.image}/>
              </ReviewImgWrapper>
              <ReviewInfoWrapper>
                <ReviewInfoCityCal>
                  <ReviewInfoCountry>
                    <ReviewIcon src="icon/location.png"></ReviewIcon>
                      {props.info.nationName} ·
                    <ReviewInfoRegion>
                      {props.info.regionName}
                    </ReviewInfoRegion>
                  </ReviewInfoCountry>
                  
                  <ReviewInfoCal>
                    <ReviewIcon src="icon/calendar.png"></ReviewIcon>
                    {props.info.regDateTime.split("T")[0]}
                  </ReviewInfoCal>
                </ReviewInfoCityCal>
                <ReviewInfoLine></ReviewInfoLine>
                <ReviewInfoTitle>{props.info.title}</ReviewInfoTitle>
                <ReviewInfoLine></ReviewInfoLine>
                <ReviewIconLike>
                  <ReviewInfoIconWrapper><ReviewIcon src="icon/heart.png"></ReviewIcon>{props.info.likes}</ReviewInfoIconWrapper>
                  <ReviewInfoIconWrapper><ReviewIcon src="icon/comment.png"></ReviewIcon>{props.info.comments}</ReviewInfoIconWrapper>
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

  cursor: pointer;
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
    margin-bottom: 10px;
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

export const ReviewImgWrapper = styled.div`

`;

export const ReviewImg = styled.img`
  width: 300px;
  height: 160px;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  margin: 24.5px 0;
  margin-left: 40px;

  object-fit: cover;
`;

export const ReviewInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin-left: 40px;
    justify-content:center;
`;

export const ReviewInfoCountry = styled.div`
    color: #666666;
    font-size: 24px;
    display: flex;
    flex-direction: row;

    align-items: center;
`;

export const ReviewInfoRegion = styled.div`
    font-size: 24px;
    color: #000000;
    margin-left: 10px;
`;

export const ReviewInfoDesWrapper = styled.div`
  display: flex;
  flex-direction: row;

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