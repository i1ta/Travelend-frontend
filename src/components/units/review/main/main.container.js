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
import ReviewCard from '@/components/commons/Card/Main/ReviewCard/ReviewMain';
import PreviewCard from "@/components/commons/Card/Preview/Preview";

export default function ReviewMain() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const apipath = 'https://api.tripyle.xyz';

    const router = useRouter();

    const [selectedDestination, setSelectedDestination] = useState({
      continent: {id: 0 ,name: ""},
      country: {id: 0, name: ""},
      city: {id: 0, name: ""},
    });

    // 여행 후기 필터링
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if(reviewList.length === 0){
    const requestData = {
      "continentId": 1,
      "endMonth": 12,
      "keyWord": "리뷰",
      "nationId": 6,
      "regionId": 1,
      "startMonth": 1,
      "totalPeopleNum": 4,
    }
    console.log(requestData);

    await axios
      .post(`${apipath}/review/list?option=1`, requestData)
      .then((res) => {
        setReviewList(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => console.log(error));

    }
  }
    fetchData();
  }, []);

    const [option, setOption] = useState("1");
    const onClcickFilterFind = async () => {

      const requestData = {
        "continentId": parseInt(selectedDestination.continent.id),
        "endMonth": parseInt(date.endMonth),
        "keyWord": keyword,
        "nationId": parseInt(selectedDestination.country.id),
        "regionId": parseInt(selectedDestination.city.id),
        "startMonth": parseInt(date.startMonth),
        "totalPeopleNum": parseInt(selectedNum),
      }
  
      await axios
        .post(`${apipath}/review/list?option=${parseInt(option)}`, requestData)
        .then((res) => {
          console.log(res.data.data);
          setReviewList(res.data.data);
        })
        .catch((error) => console.log(error));
  
    };

    // useEffect(() => {
    //   onClcickFilterFind();
    // }, [option]);
    
    // 여행지 선택
    const [isCountry, setIsCountry] = useState(false);
    const [destination, setDestination] = useState({
      continent: [],
      country: [],
      city: []
    })
    
  
    const onOpenDestination = async () => {
      if(isCountry === true){
        setIsCountry(false);
      } else {
        setIsCountry(true);
        console.log(selectedDestination);
        if(selectedDestination.city.name !== ""){
          console.log(selectedDestination);
          return;
        }
      }

    await axios
      .get(apipath + "/destination/continent")
      .then((res) => {
        console.log(res);
        setDestination((prevDestination) => ({
          continent: res.data.data,
          country: [],
          city: [],
        }));
        console.log(destination);
      });
    }

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
    }
  

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
  
    // 일정
    const [isStartMonth, setIsStartMonth] = useState(false);
    const [isEndMonth, setIsEndMonth] = useState(false);
    const [date, setDate] = useState({
      startMonth: 1,
      endMonth: 12,
    })
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
      if(pageNum.length === 0){
        console.log(parseInt(reviewList.length / 5));
        for(let i = 0; i <= parseInt(reviewList.length / 5); i++){
          setPageNum((prev) => [...prev, i]);
        }
        console.log(pageNum);
      }
    }, [reviewList]);

    return(
        <>
        <FindTripylerBanner title="Trip'yler 여행 후기" subTitle="Trip'yler가 함께한 여행 후기를 구경해보세요!"/>
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
              <S.DateFilterWrapper >
                <S.Filter style={{ width: "200px" }} onClick={(e) => {
                  if(isStartMonth){setIsStartMonth(false);}
                  else{setIsStartMonth(true); setIsEndMonth(false)}}}>
                  <S.FilterInput>{date.startMonth ? `${date.startMonth}월` : `가는 날`}</S.FilterInput>
                  <S.FilterBtn></S.FilterBtn>
                </S.Filter>
                <S.DateLine></S.DateLine>
                <S.Filter style={{ width: "200px" }}>
                  <S.FilterInput>{date.endMonth ? `${date.endMonth}월` : `오는 날`}</S.FilterInput>
                  <S.FilterBtn></S.FilterBtn>
                </S.Filter>
              </S.DateFilterWrapper>
              {isStartMonth &&(
                <S.CalendarWrapper>
                  <S.MonthSelectWrapper>
                    <S.MonthSelect>
                      {month.map((e, idx) => (<S.MonthContent id={idx + 1} onClick={(e) => {
                          setIsStartMonth(false); 
                          setIsEndMonth(true);
                          setDate(prev => ({
                            ...prev,
                            startMonth: e.target.id
                          }));
                          console.log(date.startMonth);
                        }}
                        >{e}월</S.MonthContent>))}
                    </S.MonthSelect>
                    
                  </S.MonthSelectWrapper>
                </S.CalendarWrapper>
              )}
              {isEndMonth &&(
                <S.CalendarWrapper>
                  <S.EndMonthSelectWrapper>
                    <S.MonthSelect>
                        {month.map((e, idx) => (<S.MonthContent 
                        id={idx + 1} 
                        disabled={parseInt(date.startMonth) > e}
                        disabledColor={parseInt(date.startMonth) > e}
                        onClick={(e) => {
                          setIsEndMonth(false); 
                          setDate(prev => ({
                            ...prev,
                            endMonth: e.target.id
                          }));
                          console.log(date.endMonth);
                          
                        }}
                        >{e}월</S.MonthContent>))}
                    </S.MonthSelect>
                    
                  </S.EndMonthSelectWrapper>
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
          {reviewList.length === 0 ? (
            <S.FindTripylerNoContent>
              <S.NoContent>조건에 맞는 게시 글이 존재하지 않습니다</S.NoContent>
            </S.FindTripylerNoContent>
          ) : (
          <S.FindTripylerContent>
            {reviewList.map((card) => (
              <ReviewCard id={card.tripylerId} info={card}/>
            ))}
          </S.FindTripylerContent>
          )}

          {reviewList.length !== 0 && (
          <S.PageNationWrapper>
            <S.ArrowImg src="/icon/pageLeftArrow.png" onClick={(e) => setPage((prev) => prev - 1 < 1 ? 1 : prev - 1 )}></S.ArrowImg>
              {pageNum.map((i) => (<S.PageTxt onClick={(e) => setPage(i + 1)} selected={i + 1 === page}>{i + 1}</S.PageTxt>))}
            <S.ArrowImg src="/icon/pageRightArrow.png" onClick={(e) => setPage((prev) => prev + 1 > parseInt(newCardList.length / 5) + 1 ? parseInt(newCardList.length / 5) + 1 : prev + 1 )}></S.ArrowImg>
          </S.PageNationWrapper>
          )}

        </S.Review>
      </S.ContentWrapper>
      <S.AdWrapper>
        <S.AdImg src="/img/AdBanner.png"></S.AdImg>
      </S.AdWrapper>
      <PreviewCard />
    </>
  );
}
