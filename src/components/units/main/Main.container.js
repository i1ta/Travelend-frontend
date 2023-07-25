import { useState, useEffect } from "react";
import * as S from "./Main.styles";
import { useRecoilState } from "recoil";
import { LoginState } from '@/States/LoginState';
import { FindCardList } from "@/States/LoginState";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import ReviewComponent from '../../commons/Card/Main/ReviewCard/Review';
import FindCard from '../../commons/Card/Main/FindCard/FindCard';
import CalendarComponent from "@/components/commons/Tools/CalendarComponent";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [findCardList, setFindCardList] = useRecoilState(FindCardList);
  const apipath = 'https://api.tripyle.xyz';

  const [response, setResponse] = useState([]);

  // 초기값 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (response.length === 0) {
        const requestData = {
          "continentId": 1,
          "endDate": "2023-07-14",
          "keyWord": "",
          "nationId": 6,
          "regionId": 1,
          "startDate": "2023-07-10",
          "totalPeopleNum": 4,
        };
  
        try {
          const res = await axios.post(`${apipath}/tripyler/list?isRecruiting=1&option=1`, requestData);
          setResponse(res.data.data);
          console.log(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchData();
  }, []);

  // 필터링
  const router = useRouter();
  const [page, setPage] = useState(1);
  const onClcickFilterFind = async () => {
    const requestData = {
      "continentId": parseInt(selectedDestination.continent.id),
      "endDate": formatDate(date.endDate),
      "keyWord": keyword,
      "nationId": parseInt(selectedDestination.country.id),
      "regionId": parseInt(selectedDestination.city.id),
      "startDate": formatDate(date.startDate),
      "totalPeopleNum": parseInt(selectedNum),
    }
    console.log(requestData);

    await axios
      .post(`${apipath}/tripyler/list?isRecruiting=1&option=1`, requestData)
      .then((res) => {
        const arr = res.data.data;
        console.log(res.data.data);
        setFindCardList(res.data.data);
        // setFindCardList((prev) => [...prev, ...arr]);
        
      })
      .catch((error) => console.log(error));

    router.push({
      pathname: `findTripyler`,
      query: 
      {
        continent: JSON.stringify(selectedDestination.continent.name),
        continentId: selectedDestination.continent.id,
        country: JSON.stringify(selectedDestination.country.name),
        countryId: selectedDestination.country.id,
        city: JSON.stringify(selectedDestination.city.name),
        cityId: selectedDestination.city.id,
        startDate: JSON.stringify(date.startDate),
        endDate: JSON.stringify(date.endDate),
        num: selectedNum,
        keyword: JSON.stringify(keyword)}
    });
  };
  
  // 여행지 선택
  const [isCountry, setIsCountry] = useState(false);
  const [destination, setDestination] = useState({
    continent: [],
    country: [],
    city: []
  })
  const [selectedDestination, setSelectedDestination] = useState({
    continent: {id: 0, name: ""},
    country: {id: 0, name: ""},
    city: {id: 0, name: ""}
  });

  const onOpenDestination = async () => {
    if(isCountry === true){
      setIsCountry(false);
    } else {
      setIsCountry(true);
      if(selectedDestination.city.name !== ""){
        console.log(destination);
        return;
      }
      axios
        .get(apipath + '/destination/continent')
        .then((res) => {
          console.log(res);
          setDestination(prevDestination => ({
            continent: res.data.data,
            country: [],
            city: []
          }))
        console.log(destination);
      });
    }
  }

  const onOpenCountry = (e) => {
    setSelectedDestination(prev => ({
      ...prev,
      continent: {id: e.target.id ,name: e.target.innerText}
    }))

    axios
      .get(`${apipath}/destination/nation?continentId=${e.target.id}`)
      .then((res) => {
        console.log(res);
        setDestination(prevDestination => ({
          ...prevDestination,
          country: res.data.data,
          city: []
        }))
      console.log(destination);
    });
  }

  const onOpenCity = (e) => {
    setSelectedDestination(prev => ({
      ...prev,
      country: {id: e.target.id ,name: e.target.innerText}
    }))

    axios
      .get(`${apipath}/destination/region?nationId=${e.target.id}`)
      .then((res) => {
        console.log(res);
        setDestination(prevDestination => ({
          ...prevDestination,
          city: res.data.data,
        }))
      console.log(destination);
    });
  }

  // 달력
  const [isCalendar, setIsCalendar] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const formatDate = (fdate) => {
    let month = '' + (fdate.getMonth() + 1);
    let day = '' + fdate.getDate();
    let year = fdate.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  
  // 인원수 선택
  const [selectedNum, setSelectedNum] = useState(0);

  // 검색어
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <S.Banner>
        <S.BannerImgWrapper>
          <S.BannerTitle>
            <S.TitleTxt style={{ color: "#90E0EF" }}>여행</S.TitleTxt>에
            <S.TitleTxt style={{ color: "#C8B6FF" }}> 스타일</S.TitleTxt>을
            더하다
          </S.BannerTitle>
          <S.BannerTxt>
            함께 하고 싶은 여행자를 Trip’yle에서 바로 찾아보세요
          </S.BannerTxt>
        </S.BannerImgWrapper>
        <S.FindFilter>
          <S.FilterMainWrapper>
            <S.FilterMiddleWrapper>
            <S.FilterFrontWrapper>
              <S.FilterWrapper>
                <S.FilterTitleWrapper>
                  <S.FilterTitleImg src="icon/location.png"></S.FilterTitleImg>
                  <S.FilterTitleTxt>여행지</S.FilterTitleTxt>
                  {isCountry && (
                  <S.CountrySelectWrapper>
                    <S.ContinentSelect>
                      {destination.continent.map((des) => (
                        <S.ContinentContent id={des.id} onClick={onOpenCountry} selected={selectedDestination.continent.name === des.name}>{des.name}</S.ContinentContent>
                      ))}
                    </S.ContinentSelect>
                    <S.CountrySelect>
                      {destination.country.map((des) => (
                        <S.ContinentContent id={des.id} onClick={onOpenCity} selected={selectedDestination.country.name === des.name}>{des.name}</S.ContinentContent>
                      ))}
                    </S.CountrySelect>
                    <S.CitySelect>
                      {destination.city.map((des) => (
                        <S.ContinentContent 
                        id={des.id} 
                        onClick={(e) => {
                          setIsCountry(false); 
                          setSelectedDestination(prev => ({
                            ...prev,
                            city: {id: e.target.id ,name: e.target.innerText}
                          }));
                          console.log(selectedDestination);
                        }}
                        selected={selectedDestination.city.name === des.name}
                        >{des.name}</S.ContinentContent>
                      ))}
                    </S.CitySelect>
                  </S.CountrySelectWrapper>
                )}
                </S.FilterTitleWrapper>
                <S.Filter style={{ width: "280px" }} onClick={onOpenDestination}>
                  <S.FilterInput>{selectedDestination.city.name === "" ? "선택" : `${selectedDestination.country.name}, ${selectedDestination.city.name}`}</S.FilterInput>
                  <S.FilterBtn></S.FilterBtn>
                </S.Filter>
                
              </S.FilterWrapper>

            <S.FilterWrapper>
              <S.FilterTitleWrapper>
                <S.FilterTitleImg src="icon/calendar.png"></S.FilterTitleImg>
                <S.FilterTitleTxt>일정</S.FilterTitleTxt>
              </S.FilterTitleWrapper>
              <S.DateFilterWrapper onClick={(e) => {isCalendar ? setIsCalendar(false) : setIsCalendar(true)}}>
                <S.Filter style={{ width: "200px" }}>
                  <S.FilterInput>{date.startDate ? formatDate(date.startDate) : `가는 날`}</S.FilterInput>
                  <S.FilterBtn></S.FilterBtn>
                </S.Filter>
                <S.DateLine></S.DateLine>
                <S.Filter style={{ width: "200px" }}>
                  <S.FilterInput>{date.endDate ? formatDate(date.endDate) : `오는 날`}</S.FilterInput>
                  <S.FilterBtn></S.FilterBtn>
                </S.Filter>
              </S.DateFilterWrapper>
              {isCalendar &&(
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
                <S.FilterTitleImg src="icon/user.png"></S.FilterTitleImg>
                <S.FilterTitleTxt>인원</S.FilterTitleTxt>
              </S.FilterTitleWrapper>
              <S.FilterSelect>
                <S.FilterMinusImg src="/icon/minus.png" onClick={(e) => setSelectedNum((prev) => prev <= 0 ? 0 : prev - 1)}></S.FilterMinusImg>
                <S.FilterNum>{selectedNum <= 0 ? "선택" : `${selectedNum}명`}</S.FilterNum>
                <S.FilterPlusImg src="/icon/plus.png" onClick={(e) => setSelectedNum((prev) => prev + 1)}></S.FilterPlusImg>
              </S.FilterSelect>
            </S.FilterWrapper>
          </S.FilterFrontWrapper>

            <S.FilterBackWrapper>
              <S.FilterWrapper>
                <S.FilterTitleWrapper>
                  <S.FilterTitleImg src="icon/searchBlack.png"></S.FilterTitleImg>
                  <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                </S.FilterTitleWrapper>
                <S.Input 
                  style={{ width: "925px" }} 
                  placeholder="직접 입력"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </S.FilterWrapper>
            </S.FilterBackWrapper>
            </S.FilterMiddleWrapper>
            <S.FilterFindBtn onClick={onClcickFilterFind}>
              <S.FilterFindBtnTxt>여행자 찾기</S.FilterFindBtnTxt>
              <S.BtnArrow src="icon/arrow.png"></S.BtnArrow>
            </S.FilterFindBtn>
          </S.FilterMainWrapper>
        </S.FindFilter>
      </S.Banner>

      <S.ContentWrapper>
        <S.FindTripylerTitleWrapper onClick={onClcickFilterFind}>
          <S.FindTripylerTitle>함께 동행할 Trip’yler 찾기</S.FindTripylerTitle>
          <S.BtnBigArrow src="icon/arrow.png"></S.BtnBigArrow>
        </S.FindTripylerTitleWrapper>
        <S.Review>
          <S.FindTripylerContent>
            {response.map((res, idx) => {
            if(idx >= 0 && idx < 8)
            { return (
              <FindCard id={res.tripylerId} info={res}/>
            )}})}
          </S.FindTripylerContent>
        </S.Review>
      </S.ContentWrapper>

      <S.ContentWrapper>
        <S.ReviewTitleWrapper onClick={(e) => router.push("/review")}>
          <S.ReviewTitle>인기 여행 후기 Top5</S.ReviewTitle>
          <S.BtnBigArrow src="icon/arrow.png"></S.BtnBigArrow>
        </S.ReviewTitleWrapper>
        <S.Review>
          <ReviewComponent/>
          <ReviewComponent/>
          <ReviewComponent/>
          <ReviewComponent/>
          <ReviewComponent/>
          <ReviewComponent/>
        </S.Review>
      </S.ContentWrapper>
    </>
  );
}
