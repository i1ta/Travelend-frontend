import {
  LoginState
} from "@/States/LoginState";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import FindCard from "../commons/Card/Main/FindCard/FindCard";

import {
  TripylerMainData
} from "@/interfaces/main";

interface Props {
  onClcickFilterFind: () => {};
  tripylerList: TripylerMainData[];
}

export default function TripylerBox ( { onClcickFilterFind, tripylerList } : Props ) {
    const router = useRouter();
    const isLoggedIn = useRecoilValue(LoginState);

    return (
        <ContentWrapper>
          <ReviewTitleWrapper onClick={onClcickFilterFind}>
            <FindTripylerTitle>
                함께 동행할 Travelender를 만나보세요
            </FindTripylerTitle>
            <BtnBigArrow src="icon/move.png"></BtnBigArrow>
          </ReviewTitleWrapper>
          <Review>
            <SubTitleWrapper>
              <SubTitle>
                <SubTitleImg src="/icon/location.png" width="25px" height="25px" />
                인기 동행자 찾기 게시물
              </SubTitle>
            </SubTitleWrapper>
            <FindTripylerContent>
              {tripylerList?.map((res, idx) => {
                if (idx >= 0 && idx < 6) {
                  return (
                    <FindCard
                        key={res.tripylerId}
                        id={res.tripylerId}
                        idx={idx}
                        info={res}
                        onClick={() => {
                        if (isLoggedIn) {
                          router.push(`/findTripyler/${res.tripylerId}`);
                        }
                      }}
                    />
                  );
                }
              })}
            </FindTripylerContent>
          </Review>
        </ContentWrapper>
    )
};
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
  // width: 1400px;
  max-width: 1400px;
  width: 100vw;
`;

const FindTripylerContent = styled.div`
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // gap: 75px;
  // margin-left: 20px;

  display: grid;
  align-items: center;
  justify-content: center;

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-row: 1fr 1fr 1fr;
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

  // width: 1400px;
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