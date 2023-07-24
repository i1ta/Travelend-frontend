import styled from "@emotion/styled";
import { useRouter } from "next/router";

export default function TriplogFindcard () {
  const router = useRouter();
    return(
       <>
        <TriplogFindCardWrapper>
            <TriplogFindImgWrapper>
                <TriplogFindDesWrapper>
                    <TriplogFindDesIcon src="/icon/location.png"></TriplogFindDesIcon>
                    <TriplogFindDes>부다페스트</TriplogFindDes>
                </TriplogFindDesWrapper>
                <TriplogFindImg src="/img/Santorini.png"></TriplogFindImg>
            </TriplogFindImgWrapper>
            <TriplogFindContentWrapper>
                <TriplogFindContentTitle>10박 11일 부다페스트 여행 동행자를 찾습니다.</TriplogFindContentTitle>
                <TriplogFindContentNumWrapper>
                    <TriplogFindNumIcon src="/icon/profile_white.png"></TriplogFindNumIcon>
                    <TriplogFindContentTxt>3인 모집 완료 / 4인</TriplogFindContentTxt>
                </TriplogFindContentNumWrapper>
                <TriplogFindLine></TriplogFindLine>
                <TriplogFindInfoWrapper>
                    <TriplogFindInfoIcon src="/icon/heart_white.png"></TriplogFindInfoIcon>
                    <TriplogFindInfoTxt>1.2k</TriplogFindInfoTxt>
                    <TriplogFindInfoIcon src="/icon/comment_white.png"></TriplogFindInfoIcon>
                    <TriplogFindInfoTxt>24</TriplogFindInfoTxt>
                    <TriplogFindInfoIcon src="/icon/view_white.png"></TriplogFindInfoIcon>
                    <TriplogFindInfoTxt>1,200</TriplogFindInfoTxt>
                </TriplogFindInfoWrapper>
            </TriplogFindContentWrapper>
        </TriplogFindCardWrapper>
       </>
    )
};


const TriplogFindCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 880px;
  height: 125px;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  background-color: #A0BBFF;
  border-radius: 10px;

  margin-top: 30px;
`;

const TriplogFindImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 220px;
`;

const TriplogFindDesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 25px;
    margin-bottom: 6px;
`;

const TriplogFindDesIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 5px;
`;

const TriplogFindDes = styled.div`
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
`;

const TriplogFindImg = styled.img`
    width: 170px;
    height: 75px;
    object-fit: cover;
    border-radius: 10px;
    border: 5px solid rgba(255, 255, 255, 0.7);
    margin-left: 25px;
`;

const TriplogFindContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TriplogFindContentTitle = styled.div`
    color: #A0BBFF;
    font-size: 15px;
    font-weight: bold;
    background-color: #ffffff;
    border-radius: 10px;
    width: 643px;
    height: 27px;
    padding: 3px 10px;
`;

const TriplogFindContentNumWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
`;

const TriplogFindNumIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 8px;
    margin-top: 3px;
`;

const TriplogFindContentTxt = styled.div`
    color: #ffffff;
    font-size: 15px;
`;

const TriplogFindLine = styled.div`
    height: 3px;
    width: 637px;
    background-color: #ffffff;
    border-radius: 15px;
    margin-top: 8px;
`;

const TriplogFindInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

const TriplogFindInfoIcon = styled.img`
width: 13px;
height: 13px;
margin-right: 5px;
`;

const TriplogFindInfoTxt = styled.div`
    color: #ffffff;
    font-size: 10px;
    margin-right: 10px;
`;