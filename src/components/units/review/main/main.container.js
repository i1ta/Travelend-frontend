import { useState, useEffect } from "react";
import * as S from "./main.styles";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { LoginState } from "@/States/LoginState";
import { FindCardList } from "@/States/LoginState";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import FindCard from "@/components/commons/Card/Main/FindCard/FindCard";
import CalendarComponent from "@/components/commons/Tools/CalendarComponent";
import PreviewCard from "@/components/commons/Card/Preview/Preview";

export default function ReviewList() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const apipath = "https://api.tripyle.xyz";

  const router = useRouter();
  console.log(router);

  const [selectedDestination, setSelectedDestination] = useState({
    continent: {
      id: parseInt(router.query.continentId),
      name: router.query.continent?.split('"')[1],
    },
    country: {
      id: parseInt(router.query.countryId),
      name: router.query.country?.split('"')[1],
    },
    city: {
      id: parseInt(router.query.cityId),
      name: router.query.city?.split('"')[1],
    },
  });

  // 이미 필터링 된 채로 리스트 창 렌더링 시
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDestination.city.name !== "") {
        try {
          const res1 = await axios.get(apipath + "/destination/continent");
          console.log(res1);
          setDestination((prevDestination) => ({
            continent: res1.data.data,
            country: [],
            city: [],
          }));
          console.log(destination);

          const res2 = await axios.get(
            `${apipath}/destination/nation?continentId=${selectedDestination.continent.id}`
          );
          console.log(res2);
          setDestination((prevDestination) => ({
            ...prevDestination,
            country: res2.data.data,
            city: [],
          }));
          console.log(destination);

          const res3 = await axios.get(
            `${apipath}/destination/region?nationId=${selectedDestination.country.id}`
          );
          console.log(res3);
          setDestination((prevDestination) => ({
            ...prevDestination,
            city: res3.data.data,
          }));
          console.log(destination);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  const cardList = useRecoilValue(FindCardList);
  useEffect(() => {
    if (cardList.length !== 0) {
      console.log(cardList);
      setNewCardList(cardList);
    }
  }, [cardList]);

  const [newCardList, setNewCardList] = useState(cardList);
  const [isRecruiting, setIsRecruiting] = useState("1");
  const [option, setOption] = useState("1");
  const onClcickFilterFind = async () => {
    const requestData = {
      continentId: parseInt(selectedDestination.continent.id),
      endDate: formatDate(date.endDate),
      keyWord: keyword,
      nationId: parseInt(selectedDestination.country.id),
      regionId: parseInt(selectedDestination.city.id),
      startDate: formatDate(date.startDate),
      totalPeopleNum: parseInt(selectedNum),
    };

    await axios
      .post(
        `${apipath}/tripyler/list?isRecruiting=${parseInt(
          isRecruiting
        )}&option=${parseInt(option)}`,
        requestData
      )
      .then((res) => {
        console.log(res.data.data);
        setNewCardList(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    onClcickFilterFind();
  }, [isRecruiting]);

  useEffect(() => {
    onClcickFilterFind();
  }, [option]);

  // 여행지 선택
  const [isCountry, setIsCountry] = useState(false);
  const [destination, setDestination] = useState({
    continent: [],
    country: [],
    city: [],
  });

  const onOpenDestination = async () => {
    if (isCountry === true) {
      setIsCountry(false);
    } else {
      setIsCountry(true);
      console.log(selectedDestination);
      if (selectedDestination.city.name !== "") {
        console.log(selectedDestination);
        return;
      }

      axios.get(apipath + "/destination/continent").then((res) => {
        console.log(res);
        setDestination((prevDestination) => ({
          continent: res.data.data,
          country: [],
          city: [],
        }));
        console.log(destination);
      });
    }
  };

  const onOpenCountry = (e) => {
    setSelectedDestination((prev) => ({
      ...prev,
      continent: { id: e.target.id, name: e.target.innerText },
    }));

    axios
      .get(`${apipath}/destination/nation?continentId=${e.target.id}`)
      .then((res) => {
        console.log(res);
        setDestination((prevDestination) => ({
          ...prevDestination,
          country: res.data.data,
          city: [],
        }));
        console.log(destination);
      });
  };

  const onOpenCity = (e) => {
    setSelectedDestination((prev) => ({
      ...prev,
      country: { id: e.target.id, name: e.target.innerText },
    }));

    axios
      .get(`${apipath}/destination/region?nationId=${e.target.id}`)
      .then((res) => {
        console.log(res);
        setDestination((prevDestination) => ({
          ...prevDestination,
          city: res.data.data,
        }));
        console.log(destination);
      });
  };

  // 달력
  const [isCalendar, setIsCalendar] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(router.query.startDate?.split('"')[1]),
    endDate: new Date(router.query.endDate?.split('"')[1]),
    key: "selection",
  });

  const formatDate = (fdate) => {
    let month = "" + (fdate.getMonth() + 1);
    let day = "" + fdate.getDate();
    let year = fdate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // 인원수 선택
  const [selectedNum, setSelectedNum] = useState(parseInt(router.query.num));

  // 검색어
  const [keyword, setKeyword] = useState(router.query.keyword?.split('"')[1]);

  // 필터링 open & close
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FindTripylerBanner
        title="Trip'yler 여행 후기"
        subTitle="Trip'yler가 함께한 여행 후기를 구경해보세요!"
      />
      {isOpen ? (
        <S.Banner>
          <S.FindFilter>
            <S.FilterMainWrapper>
              <S.FilterMiddleWrapper>
                <S.FilterBackWrapper>
                  <S.FilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/user.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      style={{ width: "925px" }}
                      placeholder="직접 입력"
                    />
                  </S.FilterWrapper>
                </S.FilterBackWrapper>
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
                                  console.log(selectedDestination);
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
                          : `${selectedDestination.country.name}, ${selectedDestination.city.name}`}
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
                      }}
                    >
                      <S.Filter style={{ width: "200px" }}>
                        <S.FilterInput>
                          {date.startDate
                            ? formatDate(date.startDate)
                            : `가는 날`}
                        </S.FilterInput>
                        <S.FilterBtn></S.FilterBtn>
                      </S.Filter>
                      <S.DateLine></S.DateLine>
                      <S.Filter style={{ width: "200px" }}>
                        <S.FilterInput>
                          {date.endDate ? formatDate(date.endDate) : `오는 날`}
                        </S.FilterInput>
                        <S.FilterBtn></S.FilterBtn>
                      </S.Filter>
                    </S.DateFilterWrapper>
                    {isCalendar && (
                      <S.CalendarWrapper>
                        <CalendarComponent
                          setIsCalendar={setIsCalendar}
                          date={date}
                          setDate={setDate}
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
              <S.FilterFindBtn onClick={onClcickFilterFind}>
                <S.FilterFindBtnTxt>여행후기 찾기</S.FilterFindBtnTxt>
                <S.BtnArrow src="/icon/arrow.png"></S.BtnArrow>
              </S.FilterFindBtn>
            </S.FilterMainWrapper>
            <S.FilterCloseIcon
              src="/icon/close.png"
              onClick={(e) => setIsOpen(false)}
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
                      <S.FilterTitleImg src="/icon/user.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      style={{ width: "925px" }}
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
            <div>Trip’yler의 인기 여행 후기</div>
            <S.FindTripylerWriteBtn
              onClick={(e) => router.push("/review/write")}
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
          <S.FindTripylerContent>
            {newCardList.map((card) => (
              <FindCard id={card.tripylerId} info={card} />
            ))}
          </S.FindTripylerContent>
        </S.Review>
      </S.ContentWrapper>
      <S.AdWrapper>
        <S.AdImg src="/img/AdBanner.png"></S.AdImg>
      </S.AdWrapper>
      <PreviewCard />
    </>
  );
}
