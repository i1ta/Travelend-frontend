import {
  FindCardFilter,
  LoginState
} from "@/States/LoginState";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import FindCard from "@/components/commons/Card/Main/FindCard/FindCard";

export default function ListBox ({
  option,
  setOption,
  isRecruiting,
  setIsRecruiting,
  newCardList,
  currentPage,
}) {
  const router = useRouter();

  const [findCardFilter, setFindCardFilter] = useRecoilState(FindCardFilter);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [isRecruitingOpen, setIsRecruitingOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  // 로그인 여부 확인
  const checkLogin = async () => {
    if (!isLoggedIn) {
      router.push("/auth/signIn");
      setFindCardFilter({});
      return;
    }
  };
    return(
        <>
        <ContentWrapper>
        <FindTripylerTitleWrapper>
          <FindTripylerTitle>
            <div>Trip'yler 찾기 게시물</div>
            <FindTripylerWriteBtn
              onClick={() => {
                if (!isLoggedIn) {
                  checkLogin();
                } else {
                  router.push(`/findTripyler/write`);
                  setFindCardFilter({});
                }
              }}
            >
              글쓰기 〉
            </FindTripylerWriteBtn>
          </FindTripylerTitle>
        </FindTripylerTitleWrapper>
        <FindTripylerTitleWrapperBetween>
          <FindTripylerTitleBetween>
            <FindTripylerFilterOne>
              <FindTripylerFilterOneTitle
                onClick={() => setIsOptionOpen((prev) => !prev)}
              >
                {
                  option === "1" && "최신 순"
                }
                {
                  option === "2" && "좋아요 순"
                }
                {
                  option === "3" && "댓글 많은 순"
                }
                {
                  option === "4" && "많이 본 순"
                }
              </FindTripylerFilterOneTitle>
              {isOptionOpen && (
                <FindTripylerOptionOneWrapper>
                  <FindTripylerOptionOne 
                    onClick={(e) => {
                      setOption("1");
                      setIsOptionOpen(false);
                    }}
                  >최신 순</FindTripylerOptionOne>
                  <FindTripylerLine></FindTripylerLine>
                  <FindTripylerOptionOne 
                    onClick={(e) => {
                      setOption("2");
                      setIsOptionOpen(false);
                    }}
                  >좋아요 순</FindTripylerOptionOne>
                  <FindTripylerLine></FindTripylerLine>
                  <FindTripylerOptionOne 
                    onClick={(e) => {
                      setOption("3");
                      setIsOptionOpen(false);
                    }}
                  >댓글 많은 순</FindTripylerOptionOne>
                  <FindTripylerLine></FindTripylerLine>
                  <FindTripylerOptionOne 
                    onClick={(e) => {
                      setOption("4");
                      setIsOptionOpen(false);
                    }}
                  >많이 본 순</FindTripylerOptionOne>
                </FindTripylerOptionOneWrapper>
              )}
            </FindTripylerFilterOne>
            <FindTripylerFilterOne>
              <FindTripylerFilterOneTitle
                onClick={() => setIsRecruitingOpen((prev) => !prev)}
              >
                {
                  isRecruiting === 1 ? "모집 중" : "마감"
                }
              </FindTripylerFilterOneTitle>
              {isRecruitingOpen && (
                <FindTripylerOptionOneWrapper>
                  <FindTripylerOptionOne 
                    onClick={(e) => {
                      setIsRecruiting(1);
                      setIsRecruitingOpen(false);
                    }}
                  >모집 중</FindTripylerOptionOne>
                  <FindTripylerLine></FindTripylerLine>
                  <FindTripylerOptionOne 
                    onClick={(e) => {
                      setIsRecruiting(2);
                      setIsRecruitingOpen(false);
                    }}
                  >마감</FindTripylerOptionOne>
                </FindTripylerOptionOneWrapper>
              )}
            </FindTripylerFilterOne>
          </FindTripylerTitleBetween>
        </FindTripylerTitleWrapperBetween>
        <Review>
          {newCardList?.length === 0 ? (
            <FindTripylerNoContent>
              <NoContent>조건에 맞는 게시 글이 존재하지 않습니다</NoContent>
            </FindTripylerNoContent>
          ) : (
            <FindTripylerContent>
              {newCardList?.map((card, idx) => {
                if (parseInt(idx / 6) === currentPage - 1) {
                  return (
                    <FindCard
                      onClick={() => {
                        if (!isLoggedIn) {
                          checkLogin();
                        } else {
                          router.push(`/findTripyler/${card.tripylerId}`);
                        }
                      }}
                      id={card.tripylerId}
                      info={card}
                    />
                  );
                }
              })}
            </FindTripylerContent>
          )}
          </Review>
          </ContentWrapper>
        </>
    )
}


const BtnArrow = styled.img``;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  // width: 1440px;
  max-width: 1400px;
  width: 100vw;
`;

const FindTripylerContent = styled.div`
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // margin-left: 20px;
  // gap: 70px;

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

const FindTripylerNoContent = styled(FindTripylerContent)`
  height: 200px;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 500px 0;
`;

const NoContent = styled.div`
  font-size: 40px;

`;

const ContentWrapper = styled.div`
  align-items: center;
  justify-content: center;

  margin-bottom: 100px;
`;

const FindTripylerTitle = styled.div`
  max-width: 1400px;
  width: 100vw;
  height: 64px;

  display: flex;
  flex-direction: row;

  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: ${theme.colors.main1};
  margin: 30px 0;
  padding: 10px 0 10px 5px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${theme.colors.main1};
`;

const FindTripylerTitleBetween = styled(FindTripylerTitle)`
  border: none;
  margin: 0 auto;
  gap: 20px;
  justify-content: flex-end;
`

const FindTripylerWriteBtn = styled.div`
  background-color: #ffffff;
  color: ${theme.colors.main1};
  margin-right: 15px;
  border-radius: 50px;
  font-size: 18px;
  padding: 8px 20px;
  cursor: pointer;
`;

const FindTripylerTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 0 auto;
  align-items: center;
  justify-content: center;
`

const FindTripylerTitleWrapperBetween = styled(FindTripylerTitleWrapper)`
  justify-content: space-between;
  margin-bottom: 2rem;
`

const FindTripylerFilterOne = styled.div`
  // border: 2px solid ${theme.colors.text};
  border-radius: 5px;
  width: 100px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  font-size: 15px;
  color: ${theme.colors.text};
  cursor: pointer;

  &:focus{
    border: 2px solid ${theme.colors.text};
  }
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const FindTripylerFilterOneTitle = styled.div`
border: 2px solid ${theme.colors.text};
border-radius: 5px;
  position: relative;
  width: 100px;
  height: 39px;
  line-height: 39px;
`;

const FindTripylerOptionOneWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100px;
  border-radius: 5px;
  border: 2px solid ${theme.colors.text};
`;

const FindTripylerOptionOne = styled.div`
  text-align: center;
  width: 100%;
  height: 39px;
  line-height: 39px;
  background-color: #fff;

  &:hover{
    background-color: ${theme.colors.text};
    color: #fff;
  }
`;

const FindTripylerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.text};
`;
const ArrowImg = styled.img`
  height: 25px;
  width: 15px;
  margin: 0 20px;
  margin-top: 7px;
  cursor: pointer;
`;