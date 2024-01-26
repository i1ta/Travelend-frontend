import {
  FindCardFilter,
  IsJwtValidSelector,
  JwtTokenState,
  LoginState,
  logout,
} from "@/States/LoginState";
import Axios from "@/apis";
import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "./list.style";

import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import Pagenation from "@/components/commons/Pagenation";
import Calendar from "@/components/commons/Tools/Calendar";
import FindCard from "../../commons/Card/Main/FindCard/FindCard";
import PlatformBox from "./PlatformBox.tsx";

export default function FindTripylerList() {
  const isJwtValid = useRecoilValue(IsJwtValidSelector); // JWT 토큰 유효성 가져오기
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const jwtInfo = useRecoilValue(JwtTokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [findCardFilter, setFindCardFilter] = useRecoilState(FindCardFilter);
  const apipath = "https://api.tripyle.xyz";

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [isCountry, setIsCountry] = useState(false);
  const [destination, setDestination] = useState({
    continent: [],
    country: [],
    city: [],
  });
  const [selectedDestination, setSelectedDestination] = useState({
    continent: { id: 0, name: "" },
    country: { id: 0, name: "" },
    city: { id: 0, name: "" },
  });
  const [showDestination, setShowDestination] = useState({
    country: "",
    city: "",
  });

  const [isCalendar, setIsCalendar] = useState(false);
  const [tripDate, setTripDate] = useState([]);

  const [selectedNum, setSelectedNum] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [cardList, setCardList] = useState([]);
  const [newCardList, setNewCardList] = useState(cardList);

  const [ready, setReady] = useState(false);

  // 로그인 여부 확인
  const checkLogin = async () => {
    if (!isLoggedIn) {
      messageApi.open({
        type: 'warning',
        content: '로그인이 필요한 서비스입니다.'
      });
      router.push("/auth/signIn");
      setFindCardFilter({});
      return;
    }
  };

  // 토큰이 만료되었을 경우
  function checkToken() {
    if (jwtInfo.expiryTime < new Date().getTime()) {
      messageApi.open({
        type: 'warning',
        content: '토큰이 만료되었습니다. 로그인을 다시 진행하여 주세요.'
      });
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

  // 필터링 값이 존재할 시 셋팅
  useEffect(() => {
    if (JSON.stringify(findCardFilter) !== "{}") {
      setSelectedDestination((prevDestination) => ({
        continent: {
          id: parseInt(findCardFilter.continentId),
          name: findCardFilter.continent.split('"')[1],
        },
        country: {
          id: parseInt(findCardFilter.countryId),
          name: findCardFilter.country.split('"')[1],
        },
        city: {
          id: parseInt(findCardFilter.cityId),
          name: findCardFilter.city.split('"')[1],
        },
      }));
      if (
        findCardFilter.startDate.split('"')[1] === "" &&
        findCardFilter.endDate.split('"')[1] === ""
      ) {
        setTripDate([]);
      } else {
        setTripDate([
          findCardFilter.startDate.split('"')[1] || null,
          findCardFilter.endDate.split('"')[1] || null,
        ]);
      }
      setShowDestination({
        country: findCardFilter.country.split('"')[1],
        city: findCardFilter.city.split('"')[1],
      });
      setSelectedNum(parseInt(findCardFilter.num));
      setKeyword(findCardFilter.keyword.split('"')[1]);
      setReady(true);
    }
  }, []);

  // 이미 필터링 된 채로 리스트 창 렌더링 시
  useEffect(() => {
    const fetchData = async () => {
      if (ready) {
        if (
          JSON.stringify(findCardFilter) !== "{}" &&
          findCardFilter.city !== ""
        ) {
          try {
            const res1 = await Axios.get("/destination/continent");
            setDestination((prevDestination) => ({
              continent: res1.data.data,
              country: [],
              city: [],
            }));

            const res2 = await Axios.get(
              `/destination/nation?continentId=${selectedDestination.continent.id}`
            );
            setDestination((prevDestination) => ({
              ...prevDestination,
              country: res2.data.data,
              city: [],
            }));

            const res3 = await Axios.get(
              `/destination/region?nationId=${selectedDestination.country.id}`
            );
            setDestination((prevDestination) => ({
              ...prevDestination,
              city: res3.data.data,
            }));
          } catch (error) {
            console.log(error);
          }

          const requestData = {
            continentId: parseInt(selectedDestination.continent.id),
            endDate: tripDate[1],
            keyWord: keyword,
            nationId: parseInt(selectedDestination.country.id),
            regionId: parseInt(selectedDestination.city.id),
            startDate: tripDate[0],
            totalPeopleNum: parseInt(selectedNum),
          };

          await Axios
            .post(
              `/tripyler/list?isRecruiting=1&option=1`,
              requestData
            )
            .then((res) => {
              setCardList(res.data.data);
              setPage(1);
              setPageNum([]);
              console.log(res.data.data);
            })
            .catch((error) => console.log(error));
        }
      } else {
        const requestData = {
          continentId: 0,
          endDate: null,
          keyWord: "",
          nationId: 0,
          regionId: 0,
          startDate: null,
          totalPeopleNum: 0,
        };

        await Axios
          .post(`/tripyler/list?isRecruiting=1&option=1`, requestData)
          .then((res) => {
            setCardList(res.data.data);
            setPage(1);
            setPageNum([]);
          })
          .catch((error) => console.log(error));
      }
    };

    fetchData();
  }, [ready]);

  useEffect(() => {
    if (newCardList.length === 0) {
      setNewCardList(cardList);
    }
  }, [cardList]);

  const [isRecruiting, setIsRecruiting] = useState(1);
  const [isRecruitingOpen, setIsRecruitingOpen] = useState(false);
  const [option, setOption] = useState("1");
  const onClcickFilterFind = async () => {
    const requestData = {
      continentId: parseInt(selectedDestination.continent.id),
      endDate: tripDate[1],
      keyWord: keyword || "",
      nationId: parseInt(selectedDestination.country.id),
      regionId: parseInt(selectedDestination.city.id),
      startDate: tripDate[0],
      totalPeopleNum: parseInt(selectedNum),
    };

    await Axios
      .post(
        `/tripyler/list?isRecruiting=${parseInt(
          isRecruiting || 1
        )}&option=${parseInt(option || 1)}`,
        requestData
      )
      .then((res) => {
        setNewCardList(res.data.data);
        setPage(1);
        setPageNum([]);
        // setFindCardFilter({});
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (isRecruiting !== "") {
      onClcickFilterFind();
      messageApi.open({
        type: 'success',
        content: '조회 완료'
      });
    }
  }, [isRecruiting]);

  useEffect(() => {
    if (option !== "") {
      onClcickFilterFind();
      messageApi.open({
        type: 'success',
        content: '조회 완료'
      });
      
    }
  }, [option]);

  // 여행지 선택
  const onOpenDestination = async () => {
    if (isCountry === true) {
      setIsCountry(false);
    } else {
      setIsCountry(true);
      if (selectedDestination.city.name !== "") {
        return;
      }

      Axios.get("/destination/continent").then((res) => {
        setDestination((prevDestination) => ({
          continent: res.data.data,
          country: [],
          city: [],
        }));
      });
    }
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

  // 달력
  const [isFirstCalendar, setIsFirstCalendar] = useState(false);

  // 페이지네이션
  const [currentPage, setPage] = useState(1);
  const [pageNum, setPageNum] = useState([]);

  useEffect(() => {
    if (newCardList.length !== 0 && pageNum.length === 0) {
      const groupedPageNum = [];
      for (let i = 0; i < Math.ceil(newCardList.length / 60); i++) {
        const start = i * 10 + 1;
        const end = Math.min((i + 1) * 10, Math.ceil(newCardList.length / 6));
        const group = Array.from(
          { length: end - start + 1 },
          (_, j) => start + j
        );
        groupedPageNum.push(group);
      }
      setPageNum(groupedPageNum);
    }
  }, [newCardList]);

  useEffect(() => {
    // console.log(pageNum);
  }, [pageNum]);
  return (
    <S.Container>
      <FindTripylerBanner
        title="Trip'yler 찾기"
        subTitle={["함께 동행하고 싶은 여행자를", "Trip'yle에서 바로 찾아보고", "여행 동행 게시물도 작성해보세요."]}
        review={false}
      />
      <S.Banner>
        <S.FindFilter>
          <S.FilterMainWrapper>
            <S.FilterMiddleWrapper>
              <S.FilterFrontWrapper>
                <S.FilterWrapper>
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
                                selectedDestination.continent.name === des.name
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
                                  country: selectedDestination.country.name,
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
                    style={{ width: "280px" }}
                    onClick={onOpenDestination}
                  >
                    <S.FilterInput>
                      {selectedDestination.city.name === ""
                        ? "선택"
                        : `${showDestination.country}, ${showDestination.city}`}
                    </S.FilterInput>
                    <S.FilterBtn></S.FilterBtn>
                  </S.Filter>
                </S.FilterWrapper>

                <S.FilterWrapper>
                  <S.FilterTitleWrapper>
                    <S.FilterTitleImg src="/icon/calendar.png"></S.FilterTitleImg>
                    <S.FilterTitleTxt>일정</S.FilterTitleTxt>
                  </S.FilterTitleWrapper>
                  <S.DateFilterWrapper
                    onClick={(e) => {
                      isCalendar ? setIsCalendar(false) : setIsCalendar(true);
                      !isFirstCalendar && setIsFirstCalendar(true);
                    }}
                  >
                    <S.Filter style={{ width: "200px" }}>
                      <S.FilterInput>
                        {tripDate.length === 0 ? `가는 날` : tripDate[0]}
                      </S.FilterInput>
                      <S.FilterBtn></S.FilterBtn>
                    </S.Filter>
                    <S.DateLine></S.DateLine>
                    <S.Filter style={{ width: "200px" }}>
                      <S.FilterInput>
                        {tripDate.length === 0 ? `오는 날` : tripDate[1]}
                      </S.FilterInput>
                      <S.FilterBtn></S.FilterBtn>
                    </S.Filter>
                  </S.DateFilterWrapper>
                  {isCalendar && (
                    <S.CalendarWrapper>
                      <Calendar
                        setIsOpenCalendar={setIsCalendar}
                        setTripDate={setTripDate}
                        restrict={false}
                      />
                    </S.CalendarWrapper>
                  )}
                </S.FilterWrapper>

                <S.FilterWrapper>
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
                </S.FilterWrapper>
              </S.FilterFrontWrapper>
              </S.FilterMiddleWrapper>

              <S.FilterBottomWrapper>
                <S.FilterBackWrapper>
                  <S.FilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/searchBlack.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      style={{ width: "725px" }}
                      placeholder="직접 입력"
                    />
                  </S.FilterWrapper>
                </S.FilterBackWrapper>
                <S.FilterBtnWrapper>
                  <S.FilterFindBtn onClick={onClcickFilterFind}>
                    <S.FilterFindBtnTxt>여행자 찾기</S.FilterFindBtnTxt>
                    {/* <S.BtnArrow src="/icon/arrow.png"></S.BtnArrow> */}
                  </S.FilterFindBtn>
                </S.FilterBtnWrapper>
              </S.FilterBottomWrapper>
          </S.FilterMainWrapper>
        </S.FindFilter>
      </S.Banner>

      <S.ContentWrapper>
        <S.FindTripylerTitleWrapper>
          <S.FindTripylerTitle>
            <div>Trip'yler 찾기 게시물</div>
            <S.FindTripylerWriteBtn
              onClick={() => {
                if (!isLoggedIn) {
                  checkLogin();
                } else {
                  if (!checkToken()) {
                    router.push(`/findTripyler/write`);
                    setFindCardFilter({});
                  }
                }
              }}
            >
              글쓰기 〉
            </S.FindTripylerWriteBtn>
          </S.FindTripylerTitle>
        </S.FindTripylerTitleWrapper>
        <S.FindTripylerTitleWrapperBetween>
          <S.FindTripylerTitleBetween>
            <S.FindTripylerFilterTwo>
              <S.FindTripylerFilterTwoCategory 
                onClick={() => {
                  setOption("1");
                  onClcickFilterFind();
                }}
                selected={option === "1"}
              >최신 순</S.FindTripylerFilterTwoCategory>
              <S.FindTripylerFilterTwoCategory 
                onClick={() => {
                  setOption("2");
                  onClcickFilterFind();
                }}
                selected={option === "2"}
              >좋아요 순</S.FindTripylerFilterTwoCategory>
              <S.FindTripylerFilterTwoCategory 
                onClick={() => {
                  setOption("3");
                  onClcickFilterFind();
                }}
                selected={option === "3"}
              >댓글 많은 순</S.FindTripylerFilterTwoCategory>
              <S.FindTripylerFilterTwoCategory 
                onClick={() => {
                  setOption("4");
                  onClcickFilterFind();
                }}
                selected={option === "4"}
              >많이 본 순</S.FindTripylerFilterTwoCategory>
            </S.FindTripylerFilterTwo>
            <S.FindTripylerFilterOne>
              <S.FindTripylerFilterOneTitle
                onClick={() => setIsRecruitingOpen((prev) => !prev)}
              >
                {
                  isRecruiting === 1 ? "모집 중" : "마감"
                }
              </S.FindTripylerFilterOneTitle>
              {isRecruitingOpen && (
                <S.FindTripylerOptionOneWrapper>
                  <S.FindTripylerOptionOne 
                    onClick={(e) => {
                      setIsRecruiting(1);
                      setIsRecruitingOpen(false);
                    }}
                  >모집 중</S.FindTripylerOptionOne>
                  <S.FindTripylerLine></S.FindTripylerLine>
                  <S.FindTripylerOptionOne 
                    onClick={(e) => {
                      setIsRecruiting(2);
                      setIsRecruitingOpen(false);
                    }}
                  >마감</S.FindTripylerOptionOne>
                </S.FindTripylerOptionOneWrapper>
              )}
            </S.FindTripylerFilterOne>
          </S.FindTripylerTitleBetween>
        </S.FindTripylerTitleWrapperBetween>
        <S.Review>
          {newCardList.length === 0 ? (
            <S.FindTripylerNoContent>
              <S.NoContent>조건에 맞는 게시 글이 존재하지 않습니다</S.NoContent>
            </S.FindTripylerNoContent>
          ) : (
            <S.FindTripylerContent>
              {newCardList?.map((card, idx) => {
                if (parseInt(idx / 6) === currentPage - 1) {
                  return (
                    <FindCard
                      onClick={() => {
                        if (!isLoggedIn) {
                          checkLogin();
                        } else {
                          if (!checkToken()) {
                            router.push(`/findTripyler/${card.tripylerId}`);
                          }
                        }
                      }}
                      key={card.tripylerId}
                      id={card.tripylerId}
                      info={card}
                    />
                  );
                }
              })}
            </S.FindTripylerContent>
          )}

          {/* {(newCardList.length && pageNum.length) && ( */}
          {pageNum.length && (
            <Pagenation 
              currentPage={currentPage}
              setPage={setPage}
              pageNum={pageNum}
              totalNum={newCardList?.length}
              pageSize="6"
            />
          )}

          <PlatformBox />
        </S.Review>
      </S.ContentWrapper>
    </S.Container>
  );
}
