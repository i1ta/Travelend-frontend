import { useState } from "react";
import * as S from "./Main.styles";
import { useRecoilState } from "recoil";
import { LoginState } from '@/States/LoginState';
// import { CalendarComponent } from "../../commons/Calendar/CalendarComponent";
// import { DateRange } from 'react-date-range';

import FindCard from '../../commons/FindCard/FindCard';

import "react-date-range/dist/styles.css"; // main style file 
import 'react-date-range/dist/theme/default.css'
import CalendarComponent from "@/components/commons/Calendar/CalendarComponent";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const onClcickFilterFind = () => {
    alert("리스트 페이지 이동");
  };
  
  // 여행지 선택
  const [isCountry, setIsCountry] = useState(false);

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

  const onRangeChange = (ranges) => {
    console.log(ranges);

    setDate({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate,
      key: ranges['selection'].key,
    })

    if(ranges['selection'].endDate !== ranges['selection'].startDate){
      setIsCalendar(false);
    }
  }
  
  // 인원수 선택
  const cntArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
              <S.FilterWrapper onClick={(e) => setIsCountry(true)}>
                <S.FilterTitleWrapper>
                  <S.FilterTitleImg src="icon/location.png"></S.FilterTitleImg>
                  <S.FilterTitleTxt>여행지</S.FilterTitleTxt>
                </S.FilterTitleWrapper>
                <S.Filter style={{ width: "280px" }}>
                  <S.FilterInput>한국, 서울</S.FilterInput>
                  <S.FilterBtn></S.FilterBtn>
                </S.Filter>
                {isCountry && (
                  <S.CountrySelectWrapper>
                    <S.ContinentSelect>
                      <S.ContinentContent>동아시아</S.ContinentContent>
                      <S.ContinentContent>동남아시아</S.ContinentContent>
                      <S.ContinentContent>서남아시아</S.ContinentContent>
                      <S.ContinentContent>유럽</S.ContinentContent>
                      <S.ContinentContent>아메리카</S.ContinentContent>
                      <S.ContinentContent>오세아니아</S.ContinentContent>
                      <S.ContinentContent>아프리카</S.ContinentContent>
                    </S.ContinentSelect>
                    <S.CountrySelect>
                      나라 선택
                    </S.CountrySelect>
                    <S.CitySelect>
                      도시 선택
                    </S.CitySelect>
                  </S.CountrySelectWrapper>
                )}
              </S.FilterWrapper>

            <S.FilterWrapper>
              <S.FilterTitleWrapper>
                <S.FilterTitleImg src="icon/calendar.png"></S.FilterTitleImg>
                <S.FilterTitleTxt>일정</S.FilterTitleTxt>
              </S.FilterTitleWrapper>
              <S.DateFilterWrapper onClick={(e) => setIsCalendar(true)}>
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
                <div>
                  <CalendarComponent 
                    setIsCalendar={setIsCalendar}
                    date={date}
                    setDate={setDate}
                  />
                </div>
              )}
            </S.FilterWrapper>

            <S.FilterWrapper>
              <S.FilterTitleWrapper>
                <S.FilterTitleImg src="icon/user.png"></S.FilterTitleImg>
                <S.FilterTitleTxt>인원</S.FilterTitleTxt>
              </S.FilterTitleWrapper>
                {/* <S.FilterInput>4명</S.FilterInput> */}
                <S.FilterSelect>
                  {cntArr.map((cnt) => (
                    <option key={cnt}>{cnt}명</option>
                  ))}
                </S.FilterSelect>
            </S.FilterWrapper>
          </S.FilterFrontWrapper>

            <S.FilterBackWrapper>
              <S.FilterWrapper>
                <S.FilterTitleWrapper>
                  <S.FilterTitleImg src="icon/user.png"></S.FilterTitleImg>
                  <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                </S.FilterTitleWrapper>
                <S.Input 
                  style={{ width: "925px" }} 
                  placeholder="검색어를 입력하세요"
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

      <S.ReviewTitle>함께 동행할 Trip’yler 찾기</S.ReviewTitle>
      <S.Review>
        <S.ReviewContents>
          <FindCard/>
          <FindCard/>
          <FindCard/>
          <FindCard/>
          <FindCard/>
          <FindCard/>
          <FindCard/>
          <FindCard/>
        </S.ReviewContents>
      </S.Review>
    </>
  );
}
