import styled from "@emotion/styled";

import Calendar from "@/components/commons/Tools/Calendar";

export default function ListBanner () {

    return(
    <Banner>
      <BannerImgWrapper>
        <BannerImg src="img/bannerImg.png" alt="banner"/>
      </BannerImgWrapper>
      <BannerTitleWrapper>
        <BannerTitle>
          <BannerTitleTxt>여행의</BannerTitleTxt>
          <BannerTitleTxt>모든</BannerTitleTxt>
          <BannerTitleTxt>여정을</BannerTitleTxt>
          <BannerTitleTxt>함께하다</BannerTitleTxt>
        </BannerTitle>
        <BannerTxt>
          <BannerSubTitleTxt>함께</BannerSubTitleTxt>
          <BannerSubTitleTxt>하고</BannerSubTitleTxt>
          <BannerSubTitleTxt>싶은</BannerSubTitleTxt>
          <BannerSubTitleTxt>여행자를</BannerSubTitleTxt>
          <BannerSubTitleTxt>Trivelend에서</BannerSubTitleTxt>
          <BannerSubTitleTxt>바로</BannerSubTitleTxt>
          <BannerSubTitleTxt>찾아보세요</BannerSubTitleTxt>
        </BannerTxt>
      </BannerTitleWrapper>
      
        <FindFilter>
          <FilterMainWrapper>
            <FilterMiddleWrapper>
              <FilterFrontWrapper>
                <FilterWrapper>
                  <FilterTitleWrapper>
                    <FilterTitleImg src="/icon/location.png"></FilterTitleImg>
                    <FilterTitleTxt>여행지</FilterTitleTxt>
                    {isCountry && (
                      <CountrySelectWrapper>
                        <ContinentSelect>
                          {destination.continent.map((des) => (
                            <ContinentContent
                              id={des.id}
                              onClick={onOpenCountry}
                              selected={
                                selectedDestination.continent.name === des.name
                              }
                            >
                              {des.name}
                            </ContinentContent>
                          ))}
                        </ContinentSelect>
                        <CountrySelect>
                          {destination.country.map((des) => (
                            <ContinentContent
                              id={des.id}
                              onClick={onOpenCity}
                              selected={
                                selectedDestination.country.name === des.name
                              }
                            >
                              {des.name}
                            </ContinentContent>
                          ))}
                        </CountrySelect>
                        <CitySelect>
                          {destination.city.map((des) => (
                            <ContinentContent
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
                            </ContinentContent>
                          ))}
                        </CitySelect>
                      </CountrySelectWrapper>
                    )}
                  </FilterTitleWrapper>
                  <Filter
                    style={{ width: "280px" }}
                    onClick={onOpenDestination}
                  >
                    <FilterInput>
                      {selectedDestination.city.name === ""
                        ? "선택"
                        : `${showDestination.country}, ${showDestination.city}`}
                    </FilterInput>
                    <FilterBtn></FilterBtn>
                  </Filter>
                </FilterWrapper>

                <FilterWrapper>
                  <FilterTitleWrapper>
                    <FilterTitleImg src="/icon/calendar.png"></FilterTitleImg>
                    <FilterTitleTxt>일정</FilterTitleTxt>
                  </FilterTitleWrapper>
                  <DateFilterWrapper
                    onClick={(e) => {
                      isCalendar ? setIsCalendar(false) : setIsCalendar(true);
                      !isFirstCalendar && setIsFirstCalendar(true);
                    }}
                  >
                    <Filter style={{ width: "200px" }}>
                      <FilterInput>
                        {tripDate.length === 0 ? `가는 날` : tripDate[0]}
                      </FilterInput>
                      <FilterBtn></FilterBtn>
                    </Filter>
                    <DateLine></DateLine>
                    <Filter style={{ width: "200px" }}>
                      <FilterInput>
                        {tripDate.length === 0 ? `오는 날` : tripDate[1]}
                      </FilterInput>
                      <FilterBtn></FilterBtn>
                    </Filter>
                  </DateFilterWrapper>
                  {isCalendar && (
                    <CalendarWrapper>
                      <Calendar
                        setIsOpenCalendar={setIsCalendar}
                        setTripDate={setTripDate}
                        restrict={false}
                      />
                    </CalendarWrapper>
                  )}
                </FilterWrapper>

                <FilterWrapper>
                  <FilterTitleWrapper>
                    <FilterTitleImg src="/icon/user.png"></FilterTitleImg>
                    <FilterTitleTxt>인원</FilterTitleTxt>
                  </FilterTitleWrapper>
                  <FilterSelect>
                    <FilterMinusImg
                      src="/icon/minus.png"
                      onClick={(e) =>
                        setSelectedNum((prev) => (prev <= 0 ? 0 : prev - 1))
                      }
                    ></FilterMinusImg>
                    <FilterNum>
                      {selectedNum <= 0 ? "선택" : `${selectedNum}명`}
                    </FilterNum>
                    <FilterPlusImg
                      src="/icon/plus.png"
                      onClick={(e) => setSelectedNum((prev) => prev + 1)}
                    ></FilterPlusImg>
                  </FilterSelect>
                </FilterWrapper>
              </FilterFrontWrapper>
              </FilterMiddleWrapper>

              <FilterBottomWrapper>
                <FilterBackWrapper>
                  <FilterWrapper>
                    <FilterTitleWrapper>
                      <FilterTitleImg src="/icon/searchBlack.png"></FilterTitleImg>
                      <FilterTitleTxt>검색</FilterTitleTxt>
                    </FilterTitleWrapper>
                    <Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      style={{ width: "725px" }}
                      placeholder="직접 입력"
                    />
                  </FilterWrapper>
                </FilterBackWrapper>
                <FilterBtnWrapper>
                  <FilterFindBtn onClick={onClcickFilterFind}>
                    <S.FilterFindBtnTxt>여행자 찾기</S.FilterFindBtnTxt>
                    {/* <S.BtnArrow src="/icon/arrow.png"></S.BtnArrow> */}
                  </FilterFindBtn>
                </FilterBtnWrapper>
              </FilterBottomWrapper>
          </FilterMainWrapper>
        </FindFilter>
      </Banner>
    );

};


const Banner = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  width: 1400px;
  min-width: 1960px;
  margin-bottom: 100px;
  /* background-image: url("img/bannerImg.png"); */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const BannerImgWrapper = styled.div`
  height: 854px;
  width: 100%;
  max-width: 1640px;
  position: relative;

  display: flex;
  flex-direction: column;

  object-fit: cover;
  color: rgba(255, 255, 255, 1);
`;

const BannerImg = styled.img`
  width: 100%;
  height: 854px;
  object-fit: cover;
`;

const BannerTitleWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  
  width: 80%;
  max-width: 1100px;
`;

const BannerTitle = styled.div`
  margin: 200px 0 0 0;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  color: white;
  position: relative;
  z-index: 100;
  // white-space: nowrap;

  ${({theme}) => theme.media.mobile}{
    display: flex;
    flex-wrap: wrap;
    line-height: 4rem;
    text-align: center;
    justify-content: center;
  }
`;

const BannerTitleTxt = styled.span`
  margin-right: 10px;
`;

const BannerSubTitleTxt = styled.span`
  margin-right: 5px;
`;


const BannerTxt = styled.div`
  margin: 60px 0 0 0;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1;
  color: #ffffff;
  position: relative;
  z-index: 100;
  // white-space: nowrap;

  ${({theme}) => theme.media.mobile}{
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    line-height: 2.5rem;
    justify-content: center;
  }
`;

// 필터링

const FindFilter = styled.div`
  width: 944px;
  height: 289px;

  // padding: 0px auto;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 270px;
  // left: 450px;
  margin: 0 auto;
  margin-left: 450px;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterWrapper = styled.div`
  margin: 0 10px;
`;

const FilterMainWrapper = styled.div`
  margin: 0 auto;
`;

const FilterMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterFrontWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // margin: 0 auto;
`

const FilterBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

const FilterBackWrapper = styled.div`
  margin-top: 35px;
`;

const FilterTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 13px;
`;

const Filter = styled.div`
  height: 50px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const FilterSelect = styled.div`
  width: 140px;
  height: 50px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  border: none;
  color: #666666;
`;

const FilterMinusImg = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const FilterNum = styled.div`

`;

const FilterPlusImg = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
const FilterTitleImg = styled.img`
  margin-right: 5px;
`;

const FilterTitleTxt = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 1;
  color: #333333;
`;

const Input = styled.input`
  height: 50px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const FilterInput = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const FilterBtn = styled.div`
  width: 12px;
  height: 9px;
  background-image: url("icon/listArrow.png");
`;

const DateFilterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateLine = styled.div`
  width: 12px;
  height: 2px;
  background-color: #666666;
  margin: 0px 7px;
`;

const FilterBtnWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const FilterFindBtn = styled.button`
  width: 138px;
  height: 50px;
  background: rgba(154, 179, 245, 0.8);
  border-radius: 20px;
  margin-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterFindBtnTxt = styled.div`
  margin-right: 4px;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`;

// 여행지 선택
const CountrySelectWrapper = styled.div`
  width: 300px;
  height: 280px;
  background-color: #ffffff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: absolute;
  z-index: 101;
  top: 128px;
  left: 100px;
`

const ContinentSelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214,214,214,0.5);

`

const ContinentContent = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
  padding: 8px;

  &:hover{
    background-color: #f2efef;
  }

  background-color: ${(props) => 
    props.selected ? "#D4D4D4" : "ffffff"
  };
`

const CountrySelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214,214,214,0.5);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 설정 */
  }

  &:hover::-webkit-scrollbar {
    opacity: 1;
    transition: opacity 0.7s ease-in-out;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 4px;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

const CitySelect = styled.div`
  width: 100px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 설정 */
  }

  &:hover::-webkit-scrollbar {
    opacity: 1;
    transition: opacity 0.7s ease-in-out;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 4px;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

// 달력
const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  
  position: relative;
  z-index: 101;
  bottom: 0px;
  right: 0px;
  
  `;
