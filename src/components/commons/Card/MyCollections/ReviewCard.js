import styled from "@emotion/styled";
import { useRouter } from "next/router";

export default function MyCollectionsFindCard () {
  const router = useRouter();
    return(
       <>
        <CollectionReviewWrapper>
            <CollectionReviewDes>산토리니</CollectionReviewDes>
            <CountryWrapper>
                <ReviewIcon src="/icon/location.png"></ReviewIcon>
                <ReviewInfoTxt>그리스</ReviewInfoTxt>
                <ReviewIcon src="/icon/calendar.png"></ReviewIcon>
                <ReviewInfoTxt>23.01.12 - 23.01.23</ReviewInfoTxt>
                <ReviewIcon src="/icon/user.png"></ReviewIcon>
                <ReviewInfoTxt>4인</ReviewInfoTxt>
            </CountryWrapper>
            <ReviewHashTagWrapper>
                <ReviewHashTag>#산토리니</ReviewHashTag>
                <ReviewHashTag>#유럽여행</ReviewHashTag>
                <ReviewHashTag>#푸른바다</ReviewHashTag>
              </ReviewHashTagWrapper>
        </CollectionReviewWrapper>
       </>
    )
};


const CollectionReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 880px;
  height: 80px;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);

  margin-top: 30px;
`;

const CollectionReviewDes = styled.div`
    font-size: 22px;
    font-weight: bold;
    margin-left: 30px;
    width: 170px;
`;

const CountryWrapper = styled.div`
    width: 370px;
    display: flex;
    flex-direction: row;
`;

const ReviewIcon = styled.img`
    width: 15px;
    height: 15px;
    margin-right: 8px;
`;

const ReviewInfoTxt = styled.div`
    font-size: 14px;
    color: #666666;
    margin-right: 20px;
`;

const ReviewHashTagWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const ReviewHashTag = styled.div`
    height: 25px;
    width: 65px;

    padding: 5px 8px;
    margin-right: 15px;
    background: #00b4d8;
    border-radius: 30px;
    text-align: center;

    font-weight: 500;
    font-size: 5px;
    color: #ffffff;
`;