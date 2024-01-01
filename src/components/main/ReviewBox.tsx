import {
  LoginState
} from "@/States/LoginState";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import ReviewComponent from "../commons/Card/Main/ReviewCard/Review";

import {
  ReviewMainData
} from "@/interfaces/main";

interface Props {
    reviewList: ReviewMainData[];
}

export default function ReviewBox ({ reviewList } : Props) {
    const router = useRouter();
    const isLoggedIn = useRecoilValue(LoginState);

  return (
    <ContentWrapper>
      <ReviewTitleWrapper
        onClick={(e) => {
          if (isLoggedIn) {
            router.push("/review");
          }
        }}
      >
      <FindTripylerTitle>
          Trip'yler들의 여행 후기를 만나보세요
      </FindTripylerTitle>
      <BtnBigArrow src="icon/move.png"></BtnBigArrow>
    </ReviewTitleWrapper>
    <Review>
      <SubTitleWrapper>
        <SubTitle>
          <SubTitleImg src="/icon/location.png" width="25px" height="25px" /> 
          인기 여행 후기
        </SubTitle>
      </SubTitleWrapper>
      <FindTripylerContent>
        {reviewList?.map((e, i) => {
          if (i >= 0 && i < 6) {
            return (
            <ReviewComponent
              key={i}
              idx={i}
              info={e}
              onClick={() => {
                if (isLoggedIn) {
                  router.push(`/review/${e.reviewId}`);
                }
              }}
            />
            );
          }
        })}
      </FindTripylerContent>
    </Review>
    </ContentWrapper>
  );
}


const BtnArrow = styled.img``;

const BtnBigArrow = styled(BtnArrow)`
  margin-right: 20px;
  height: 15px;
  width: 20px;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1400px;
`;

const FindTripylerContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 75px;
  // margin-left: 20px;
`;

const FindTripylerTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 1400px;
  height: 64px;

  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: #9AB3F5;
  margin: 0 auto;
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 10px 0 10px 0;
  // background-color: rgba(0, 180, 216, 0.6);
  align-items: center;

  cursor: pointer;
`;

const SubTitleWrapper = styled.div`

`;

const SubTitle = styled.div`
  font-size: 30px;
  color: #666;
  margin-bottom: 50px;
`;

const SubTitleImg = styled.img``;

const ContentWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;

const AdWrapper = styled.div`
  max-width: 1960px;
  margin: 150px auto;
`;

const AdBannerWrapper = styled.div`
  position: relative;
  margin: 30px auto;
`;

const AdImg = styled.img`
  height: 610px;
  width: 1920px;
  opacity: 0.7;
`;

const AdTitleWrapper = styled.div`

`;

const AdTitle = styled.div`
  position: absolute;
  left: 250px;

  color: #fff;
  font-size: 70px;  
  font-weight: bold;
  white-space: nowrap;
`;

const FindTripylerTitle = styled(FindTripylerTitleWrapper)`
  background-color: #fff;
  border-top: 2px solid #9AB3F5;
  border-bottom: 2px solid #9AB3F5;
`;

const ReviewTitleWrapper = styled(FindTripylerTitleWrapper)`
  background-color: #fff;
  border-top: 2px solid #9AB3F5;
  border-bottom: 2px solid #9AB3F5;
`;

const ReviewTitle = styled.div``;

const ReviewFilter = styled.div`
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;