import {
  IsJwtValidSelector,
  JwtTokenState,
  LoginState,
  logout,
} from "@/States/LoginState";
import Axios from "@/apis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import * as S from "./main.styles";

import ReviewCard from "@/components/commons/Card/Main/ReviewCard/ReviewMain";
import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import Pagenation from "@/components/commons/Pagenation";

export default function ReviewMain() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const isJwtValid = useRecoilValue(IsJwtValidSelector); // JWT 토큰 유효성 가져오기
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const jwtInfo = useRecoilValue(JwtTokenState);

  const router = useRouter();

  const [selectedDestination, setSelectedDestination] = useState({
    continent: { id: 0, name: "" },
    country: { id: 0, name: "" },
    city: { id: 0, name: "" },
  });

  // 로그인 여부 확인
  const checkLogin = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다");
      router.push("/auth/signIn");
      return;
    }
  };

  // 토큰이 만료되었을 경우
  function checkToken() {
    if (jwtInfo.expiryTime < new Date().getTime()) {
      alert("토큰이 만료되었습니다. 로그인을 다시 진행하여 주세요.");
      router.push("/auth/signIn");
      logout({ setJwtToken });
      setIsLoggedIn(false);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      checkToken();
    }
  }, []);

  // 여행 후기 필터링
  const [reviewList, setReviewList] = useState([]);
  const [newReviewList, setNewReviewList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setPageNum([]);
      if (reviewList.length === 0) {
        const requestData = {
          continentId: 0,
          endMonth: 12,
          keyWord: "",
          nationId: 0,
          regionId: 0,
          startMonth: 1,
          totalPeopleNum: 0,
        };

        await Axios
          .post(`/review/list?option=1`, requestData)
          .then((res) => {
            setReviewList(res.data.data);
            console.log(res.data.data);
          })
          .catch((error) => console.log(error));
      }
    };
    fetchData();
  }, []);

  const [option, setOption] = useState("");
  const onClcickFilterFind = async () => {
    if (isLoggedIn) {
      checkToken();
    }
    setPageNum([]);
    const requestData = {
      continentId: parseInt(selectedDestination.continent.id),
      endMonth: parseInt(date.endMonth),
      keyWord: keyword,
      nationId: parseInt(selectedDestination.country.id),
      regionId: parseInt(selectedDestination.city.id),
      startMonth: parseInt(date.startMonth),
      totalPeopleNum: parseInt(selectedNum),
    };

    await Axios
      .post(
        `/review/list?option=${parseInt(option || 1)}`,
        requestData
      )
      .then((res) => {
        setReviewList(res.data.data);
        setPage(1);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (reviewList.length !== 0) {
      setNewReviewList(reviewList);
    }
  }, [reviewList]);

  useEffect(() => {
    if (option !== "") {
      onClcickFilterFind();
    }
  }, [option]);

  // 여행지 선택
  const [isCountry, setIsCountry] = useState(false);
  const [destination, setDestination] = useState({
    continent: [],
    country: [],
    city: [],
  });

  const [showDestination, setShowDestination] = useState({
    country: "",
    city: "",
  });

  const onOpenDestination = async () => {
    if (isCountry === true) {
      setIsCountry(false);
    } else {
      setIsCountry(true);
      if (selectedDestination.city.name !== "") {
        return;
      }
    }

    await Axios.get("/destination/continent").then((res) => {
      setDestination((prevDestination) => ({
        continent: res.data.data,
        country: [],
        city: [],
      }));
    });
  };

  const onOpenCountry = (e) => {
    setSelectedDestination((prev) => ({
      ...prev,
      continent: { id: e.target.id, name: e.target.innerText },
    }));

    Axios
      .get(`/destination/nation?continentId=${e.target.id}`)
      .then((res) => {
        setDestination((prevDestination) => ({
          ...prevDestination,
          country: res.data.data,
          city: [],
        }));
      });
  };

  const onOpenCity = (e) => {
    setSelectedDestination((prev) => ({
      ...prev,
      country: { id: e.target.id, name: e.target.innerText },
    }));

    Axios
      .get(`/destination/region?nationId=${e.target.id}`)
      .then((res) => {
        setDestination((prevDestination) => ({
          ...prevDestination,
          city: res.data.data,
        }));
      });
  };

  // 일정
  const [isStartMonth, setIsStartMonth] = useState(false);
  const [isEndMonth, setIsEndMonth] = useState(false);
  const [date, setDate] = useState({
    startMonth: 1,
    endMonth: 12,
  });
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // 인원수 선택
  const [selectedNum, setSelectedNum] = useState(1);

  // 검색어
  const [keyword, setKeyword] = useState("");

  // 필터링 open & close
  const [isOpen, setIsOpen] = useState(false);

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [pageNum, setPageNum] = useState([]);
  useEffect(() => {
    if (reviewList.length !== 0 && pageNum.length === 0) {
      const groupedPageNum = [];
      for (let i = 0; i < Math.ceil(reviewList.length / 60); i++) {
        const start = i * 10 + 1;
        const end = Math.min((i + 1) * 10, Math.ceil(reviewList.length / 6));
        const group = Array.from(
          { length: end - start + 1 },
          (_, j) => start + j
        );
        groupedPageNum.push(group);
      }
      setPageNum(groupedPageNum);
    }
  }, [reviewList]);

  return (
    <>
      <FindTripylerBanner
        title="Travelender 여행 후기"
        subTitle="Travelender가 함께한 여행 후기를 구경해보세요!"
        review={true}
      />
      {isOpen ? (
        <S.Banner>
          <S.FindFilter>
            <FilterMainWrapper>
              <S.FilterMiddleWrapper>
                <S.FilterBackWrapper>
                  <S.FilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/searchBlack.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="직접 입력"
                    />
                  </S.FilterWrapper>
                </S.FilterBackWrapper>
                <S.FilterFrontWrapper>
                  <S.DesFilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/location.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>여행지</S.FilterTitleTxt>
                      {isCountry && (
                        <S.CountrySelectWrapper>
                          <S.ContinentSelect>
                            {destination.continent.map((des) => (
                              <S.ContinentContent
                                id={des.id}
                                onClick={onOpenCountry}
                                selected={
                                  selectedDestination.continent.name ===
                                  des.name
                                }
                              >
                                {des.name}
                              </S.ContinentContent>
                            ))}
                          </S.ContinentSelect>
                          <S.CountrySelect>
                            {destination.country.map((des) => (
                              <S.ContinentContent
                                id={des.id}
                                onClick={onOpenCity}
                                selected={
                                  selectedDestination.country.name === des.name
                                }
                              >
                                {des.name}
                              </S.ContinentContent>
                            ))}
                          </S.CountrySelect>
                          <S.CitySelect>
                            {destination.city.map((des) => (
                              <S.ContinentContent
                                id={des.id}
                                onClick={(e) => {
                                  setIsCountry(false);
                                  setSelectedDestination((prev) => ({
                                    ...prev,
                                    city: {
                                      id: e.target.id,
                                      name: e.target.innerText,
                                    },
                                  }));
                                  setShowDestination((prev) => ({
                                    country: selectedDestination.country,
                                    city: e.target.innerText,
                                  }));
                                }}
                                selected={
                                  selectedDestination.city.name === des.name
                                }
                              >
                                {des.name}
                              </S.ContinentContent>
                            ))}
                          </S.CitySelect>
                        </S.CountrySelectWrapper>
                      )}
                    </S.FilterTitleWrapper>
                    <S.Filter
                      onClick={onOpenDestination}
                    >
                      <S.FilterInput>
                        {selectedDestination.city.name === ""
                          ? "선택"
                          : `${showDestination.country.name}, ${showDestination.city}`}
                      </S.FilterInput>
                      <S.FilterBtn></S.FilterBtn>
                    </S.Filter>
                  </S.DesFilterWrapper>

                  <S.DateRangeFilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/calendar.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>일정</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.DateFilterWrapper>
                      <S.Filter
                        onClick={(e) => {
                          if (isStartMonth) {
                            setIsStartMonth(false);
                          } else {
                            setIsStartMonth(true);
                            setIsEndMonth(false);
                          }
                        }}
                      >
                        <S.FilterInput>
                          {date.startMonth ? `${date.startMonth}월` : `가는 날`}
                        </S.FilterInput>
                        <S.FilterBtn></S.FilterBtn>
                      </S.Filter>
                      <S.DateLine></S.DateLine>
                      <S.Filter>
                        <S.FilterInput>
                          {date.endMonth ? `${date.endMonth}월` : `오는 날`}
                        </S.FilterInput>
                        <S.FilterBtn></S.FilterBtn>
                      </S.Filter>
                    </S.DateFilterWrapper>
                    {isStartMonth && (
                      <S.CalendarWrapper>
                        <S.MonthSelectWrapper>
                          <S.MonthSelect>
                            {month.map((e, idx) => (
                              <S.MonthContent
                                id={idx + 1}
                                onClick={(e) => {
                                  setIsStartMonth(false);
                                  setIsEndMonth(true);
                                  setDate((prev) => ({
                                    ...prev,
                                    startMonth: e.target.id,
                                  }));
                                }}
                              >
                                {e}월
                              </S.MonthContent>
                            ))}
                          </S.MonthSelect>
                        </S.MonthSelectWrapper>
                      </S.CalendarWrapper>
                    )}
                    {isEndMonth && (
                      <S.CalendarWrapper>
                        <S.EndMonthSelectWrapper>
                          <S.MonthSelect>
                            {month.map((e, idx) => (
                              <S.MonthContent
                                id={idx + 1}
                                disabled={parseInt(date.startMonth) > e}
                                disabledColor={parseInt(date.startMonth) > e}
                                onClick={(e) => {
                                  setIsEndMonth(false);
                                  setDate((prev) => ({
                                    ...prev,
                                    endMonth: e.target.id,
                                  }));
                                }}
                              >
                                {e}월
                              </S.MonthContent>
                            ))}
                          </S.MonthSelect>
                        </S.EndMonthSelectWrapper>
                      </S.CalendarWrapper>
                    )}
                  </S.DateRangeFilterWrapper>

                  <S.NumFilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/user.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>인원</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.FilterSelect>
                      <S.FilterMinusImg
                        src="/icon/minus.png"
                        onClick={(e) =>
                          setSelectedNum((prev) => (prev <= 0 ? 0 : prev - 1))
                        }
                      ></S.FilterMinusImg>
                      <S.FilterNum>
                        {selectedNum <= 0 ? "선택" : `${selectedNum}명`}
                      </S.FilterNum>
                      <S.FilterPlusImg
                        src="/icon/plus.png"
                        onClick={(e) => setSelectedNum((prev) => prev + 1)}
                      ></S.FilterPlusImg>
                    </S.FilterSelect>
                  </S.NumFilterWrapper>
                </S.FilterFrontWrapper>
              </S.FilterMiddleWrapper>
              <FilterFindBtn onClick={onClcickFilterFind}>
                <S.FilterFindBtnTxt>여행후기 찾기</S.FilterFindBtnTxt>
                <S.BtnArrow src="/icon/arrow.png"></S.BtnArrow>
              </FilterFindBtn>
            </FilterMainWrapper>
            <S.FilterCloseIcon
              src="/icon/close.png"
              onClick={() => setIsOpen(false)}
            ></S.FilterCloseIcon>
          </S.FindFilter>
        </S.Banner>
      ) : (
        <S.Banner>
          <S.FindFilterClose>
            <S.FilterMainWrapper>
              <S.FilterMiddleWrapper>
                <S.FilterBackWrapper>
                  <S.FilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/searchBlack.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="직접 입력"
                    />
                  </S.FilterWrapper>
                </S.FilterBackWrapper>
              </S.FilterMiddleWrapper>
              <S.FilterFindBtn onClick={onClcickFilterFind}>
                <S.FilterFindBtnTxt>여행후기 찾기</S.FilterFindBtnTxt>
                <S.BtnArrow src="/icon/arrow.png"></S.BtnArrow>
              </S.FilterFindBtn>
            </S.FilterMainWrapper>
            <S.FilterOpenIcon
              src="/icon/open.png"
              onClick={(e) => setIsOpen(true)}
            ></S.FilterOpenIcon>
          </S.FindFilterClose>
        </S.Banner>
      )}

      <S.ContentWrapper>
        <S.FindTripylerTitleWrapper>
          <S.FindTripylerTitle>
            <div>Travelender의 인기 여행 후기</div>
            <S.FindTripylerWriteBtn
              onClick={() => {
                if (!isLoggedIn) {
                  checkLogin();
                } else {
                  if (!checkToken()) {
                    router.push("/review/write");
                  }
                }
              }}
            >
              후기 작성 〉
            </S.FindTripylerWriteBtn>
          </S.FindTripylerTitle>

          <S.FindTripylerFilterTwo
            onChange={(e) => {
              setOption(e.target.value);
              onClcickFilterFind();
            }}
          >
            <option value="1">최신 순</option>
            <option value="2">좋아요 순</option>
            <option value="3">댓글 순</option>
            <option value="4">조회수 순</option>
          </S.FindTripylerFilterTwo>
        </S.FindTripylerTitleWrapper>
        <S.Review>
          {reviewList.length === 0 ? (
            <S.FindTripylerNoContent>
              <S.NoContent>조건에 맞는 게시 글이 존재하지 않습니다</S.NoContent>
            </S.FindTripylerNoContent>
          ) : (
            <S.FindTripylerContent>
              {reviewList.map((card, idx) => {
                if (parseInt(idx / 5) === page - 1)
                  return (
                    <ReviewCard
                      id={card.tripylerId}
                      info={card}
                      onClick={() => {
                        if (!isLoggedIn) {
                          checkLogin();
                        } else {
                          if (!checkToken()) {
                            router.push(`/review/${card.reviewId}`);
                          }
                        }
                      }}
                    />
                  );
              })}
            </S.FindTripylerContent>
          )}

          {reviewList.length !== 0 && (
            <Pagenation 
              currentPage={page}
              setPage={setPage}
              pageNum={pageNum}
              totalNum={reviewList?.length}
              pageSize="5"
            />
          )}
        </S.Review>
      </S.ContentWrapper>
      {/* <S.AdWrapper>
        <S.AdImg src="/img/AdBanner.png"></S.AdImg>
      </S.AdWrapper>
      <PreviewCard /> */}
    </>
  );
}

const FilterMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  gap: 1rem;

  ${({theme}) => theme.media.tablet}{
    flex-direction: column;
  }
  ${({theme}) => theme.media.mobile}{
    flex-direction: column;
  }
`;

// 여행후기 찾기 버튼
const FilterFindBtn = styled.button`
  // width: 160px;
  width: 25%;
  height: 60px;
  background: #AEC2F7;
  border-radius: 50px;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({theme}) => theme.media.tablet}{
    width: 100%;
  }
  ${({theme}) => theme.media.mobile}{
    width: 100%;
  }
`;