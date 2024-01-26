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
  max-width: 1400px;
  width: 100vw;
`;

const FindTripylerContent = styled.div`
display: grid;
align-items: center;
justify-content: center;

grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
grid-gap: 20px;

${({theme}) => theme.media.desktop}{
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  // grid-template-rows: minmax(calc(491px * 3, auto));
}

${({theme}) => theme.media.tablet}{
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
}

${({theme}) => theme.media.mobile}{
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, auto);
}
`;

const FindTripylerTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-width: 1400px;
  width: 100vw;
  height: 64px;

  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
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
  margin-left: 1rem;
  ${({theme}) => theme.media.mobile}{
    margin: 0 auto;
    font-weight: 700;
  }
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 50px;

  display: flex;
  align-items: center;
`;

const SubTitleImg = styled.img``;

const ContentWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;

const FindTripylerTitle = styled(FindTripylerTitleWrapper)`
  background-color: #fff;
  border-top: 2px solid #9AB3F5;
  border-bottom: 2px solid #9AB3F5;
  padding-left: 1rem;
`;

const ReviewTitleWrapper = styled(FindTripylerTitleWrapper)`
  background-color: #fff;
  border-top: 2px solid #9AB3F5;
  border-bottom: 2px solid #9AB3F5;
`;
