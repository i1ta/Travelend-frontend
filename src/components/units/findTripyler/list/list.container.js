import { useState, useEffect } from "react";
import * as S from "./list.style";
import { useRecoilState } from "recoil";
import { LoginState } from '@/States/LoginState';
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import FindCard from '../../../commons/FindCard/FindCard';
import CalendarComponent from "@/components/commons/Calendar/CalendarComponent";


export default function FindTripylerList(){

    // const router = useRouter();
    // const queries = router.query;
    // const [query, setQuery] = useState({});

    // console.log(router);
    // useEffect(() => {
    //   if(!router.isReady) return;
    //   else{setQuery(queries)}
    // }, [router.isReady])
    // console.log(router);
    // useEffect(() => {
    //   if (router.query) {
    //     console.log(router.query);
    //   }
    // }, [router.query.response]);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const apipath = 'https://api.tripyle.xyz';

  const onClcickFilterFind = () => {
    router.push("/findTripyler/list");
  };

  // 여행지 선택
  const [isCountry, setIsCountry] = useState(false);
  const [destination, setDestination] = useState({
    continent: [],
    country: [],
    city: [],
  });
  const [selectedDestination, setSelectedDestination] = useState({
    continent: "",
    country: "",
    city: "",
  });

  const onOpenDestination = async () => {
    if (isCountry === true) {
      setIsCountry(false);
    } else {
      setIsCountry(true);

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
      continent: e.target.innerText,
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
      country: e.target.innerText,
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
    startDate: new Date(),
    endDate: new Date(),
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
  const [selectedNum, setSelectedNum] = useState(0);

  // 검색어
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <FindTripylerBanner />
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
                                  city: e.target.innerText,
                                }));
                                console.log(selectedDestination);
                              }}
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
                      {selectedDestination.city === ""
                        ? "선택"
                        : `${selectedDestination.country}, ${selectedDestination.city}`}
                    </S.FilterInput>
                    <S.FilterBtn></S.FilterBtn>
                  </S.Filter>
                </S.FilterWrapper>

                <S.FilterWrapper>
                  <S.FilterTitleWrapper>
                    <S.FilterTitleImg src="/icon/calendar.png"></S.FilterTitleImg>
                    <S.FilterTitleTxt>일정</S.FilterTitleTxt>
                  </S.FilterTitleWrapper>
                  <S.DateFilterWrapper onClick={(e) => setIsCalendar(true)}>
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

              <S.FilterBackWrapper>
                <S.FilterWrapper>
                  <S.FilterTitleWrapper>
                    <S.FilterTitleImg src="/icon/user.png"></S.FilterTitleImg>
                    <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                  </S.FilterTitleWrapper>
                  <S.Input
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ width: "925px" }}
                    placeholder="직접 입력"
                  />
                </S.FilterWrapper>
              </S.FilterBackWrapper>
            </S.FilterMiddleWrapper>
            <S.FilterFindBtn onClick={onClcickFilterFind}>
              <S.FilterFindBtnTxt>여행자 찾기</S.FilterFindBtnTxt>
              <S.BtnArrow src="/icon/arrow.png"></S.BtnArrow>
            </S.FilterFindBtn>
          </S.FilterMainWrapper>
        </S.FindFilter>
      </S.Banner>

      <S.ContentWrapper>
        <S.FindTripylerTitleWrapper>
          <S.FindTripylerTitle>
            <div>함께 동행할 Trip’yler 찾기</div>
            <S.FindTripylerWriteBtn
              onClick={(e) => router.push("/findTripyler/write")}
            >
              글쓰기 〉
            </S.FindTripylerWriteBtn>
          </S.FindTripylerTitle>
          <S.FindTripylerFilterOne>
            <S.FindTripylerOptionOne>모집 중</S.FindTripylerOptionOne>
            <S.FindTripylerOptionOne>마감</S.FindTripylerOptionOne>
          </S.FindTripylerFilterOne>
          <S.FindTripylerFilterTwo>
            <option>최신 순</option>
            <option>좋아요 순</option>
            <option>댓글 순</option>
            <option>조회수 순</option>
          </S.FindTripylerFilterTwo>
        </S.FindTripylerTitleWrapper>
        <S.Review>
          <S.FindTripylerContent>
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
            <FindCard />
          </S.FindTripylerContent>
        </S.Review>
      </S.ContentWrapper>
    </>
  );
}
