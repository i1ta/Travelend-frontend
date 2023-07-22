import styled from "@emotion/styled";
import { useRouter } from "next/router";

export default function TriplogReviewCard () {
  const router = useRouter();
    return(
        <ReviewCard>
            <ReviewCardTitle>뉴질랜드 5박 6일 기록</ReviewCardTitle>
            <ReviewCardImgWrapper>
                <ReviewCardImg src="/img/Santorini.png"></ReviewCardImg>
                <ReviewCardImg src="/img/Santorini.png"></ReviewCardImg>
                <ReviewCardImg src="/img/Santorini.png"></ReviewCardImg>
            </ReviewCardImgWrapper>
            <ReviewCardContent>너무 좋아요 너무 좋구요 좋습니다 좋았구요 좋아요 또 가고 싶어요 다음번엔 더 좋은데로 가고싶지만 돈이 없어서 갈 수 없고 뉴질랜드 너무 경관도 좋고먹을 것도 많고 사람도 좋고 좋아요.. 어쩌고저쩌고 주저리주저리 랄랄랄랄랄랄랄랄랄랄랄랄랄랄랄 너무너무 좋았어요 또 놀러가고 싶어요 돈만있으면 갈겁니다.</ReviewCardContent>
            <ReviewCardLine></ReviewCardLine>
            <ReviewCardFooter>
                <ReviewCardDesWrapper>
                    <ReviewCardDesIcon src="/icon/location.png"></ReviewCardDesIcon>
                    <ReviewCardDes>New Zealand</ReviewCardDes>
                    <ReviewCardDesIcon src="/icon/calendar.png"></ReviewCardDesIcon>
                    <ReviewCardDes>23.05.01 ~ 23.05.07</ReviewCardDes>
                </ReviewCardDesWrapper>
                <ReviewCardInfoWrapper>
                    <ReviewCardInfoIcon src="/icon/heart_gray.png"></ReviewCardInfoIcon>
                    <ReviewCardInfoTxt>1.2k</ReviewCardInfoTxt>
                    <ReviewCardInfoIcon src="/icon/comment.png"></ReviewCardInfoIcon>
                    <ReviewCardInfoTxt>24</ReviewCardInfoTxt>
                    <ReviewCardInfoIcon src="/icon/view_gray.png"></ReviewCardInfoIcon>
                    <ReviewCardInfoTxt>1,200</ReviewCardInfoTxt>
                </ReviewCardInfoWrapper>
            </ReviewCardFooter>
        </ReviewCard>
    )
}

const ReviewCard = styled.div`
  width: 415px;
  height: 295px;

  background: rgba(160, 187, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0px 3px 3px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
  margin: 20px 30px 20px 30px;
`;

const ReviewCardTitle = styled.div`
    width: 380px;
    height: 27;
    background-color: #ffffff;
    color: #A0BBFF;
    border-radius: 10px;
    font-size: 15px;
    text-align: center;
    padding: 5px 0;
`;

const ReviewCardImgWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const ReviewCardImg = styled.img`
    width: 119px;
    height: 79px;
    margin: 10px 5px;
    object-fit: cover;
`;

const ReviewCardContent = styled.div`
    color: #696969;
    font-size: 12px;
    width: 380px;
    height: 90px;
    overflow: hidden;
`;

const ReviewCardLine = styled.div`
    height: 1px;
    width: 378px;
    background-color: #ffffff;
`;

const ReviewCardFooter = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReviewCardDesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`;

const ReviewCardDesIcon = styled.img`
    width: 15px;
    height: 15px;

    margin-top: 3px;
    margin-right: 5px;
`;
const ReviewCardDes = styled.div`
    color: #696969;
    font-size: 15px;
    font-weight: bold;
    margin-right: 10px;
`;

const ReviewCardInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin: 8px 0;
`;

const ReviewCardInfoIcon = styled.img`
    width: 15px;
    height: 13px;
    margin-right: 5px;
    margin-top: 2px;
`;

const ReviewCardInfoTxt = styled.div`
    color: #696969;
    font-size: 10px;
    font-weight: bold;
    margin-right: 10px;
`;