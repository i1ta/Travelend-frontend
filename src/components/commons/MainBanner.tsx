import { FindCardFilter, FindCardList } from "@/States/LoginState";
import Axios from "@/apis";
import onClickFilterFind from "@/hook/onClickFilterFind";
import {
  Destination,
  FilterDestination,
  SelectedFilterDestination,
  ShowFilterDestination,
} from "@/interfaces/main";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Calendar from "./Tools/Calendar";

export default function MainBanner() {
  const router = useRouter();

  // recoil
  const [findCardList, setFindCardList] = useRecoilState(FindCardList);
  const [findCardFilter, setFindCardFilter] = useRecoilState(FindCardFilter);

  // 여행지 선택
  const [isCountry, setIsCountry] = useState<boolean>(false);
  const [destination, setDestination] = useState<FilterDestination>({
    continent: [],
    country: [],
    city: [],
  });
  const [selectedDestination, setSelectedDestination] =
    useState<SelectedFilterDestination>({
      continent: { id: 0, name: "" },
      country: { id: 0, name: "" },
      city: { id: 0, name: "" },
    });
  const [showDestination, setShowDestination] = useState<ShowFilterDestination>(
    {
      country: "",
      city: "",
    }
  );

  const onClcickFilterFind = async () => {
    // const requestData : RequestData  = {
    //   continentId: selectedDestination.continent.id,
    //   endDate: tripDate[1],
    //   keyWord: keyword,
    //   nationId: selectedDestination.country.id,
    //   regionId: selectedDestination.city.id,
    //   startDate: tripDate[0],
    //   totalPeopleNum: selectedNum,
    // };

    // await Axios
    //   .post(`/tripyler/list?isRecruiting=1&option=1`, requestData)
    //   .then((res) => {
    //     const arr = res.data.data;
    //     setFindCardList(res.data.data);
    //   })
    //   .catch((error) => console.log(error));

    // const query : FilterQuery = {
    //   continent: JSON.stringify(selectedDestination.continent.name),
    //   continentId: selectedDestination.continent.id,
    //   country: JSON.stringify(selectedDestination.country.name),
    //   countryId: selectedDestination.country.id,
    //   city: JSON.stringify(selectedDestination.city.name),
    //   cityId: selectedDestination.city.id,
    //   startDate: JSON.stringify(tripDate[0] || ""),
    //   endDate: JSON.stringify(tripDate[1] || ""),
    //   num: selectedNum,
    //   keyword: JSON.stringify(keyword),
    // };

    // router.push("/findTripyler");
    // console.log(query);
    // setFindCardFilter(query);
    onClickFilterFind(
      selectedDestination,
      tripDate,
      selectedNum,
      keyword,
      setFindCardList,
      setFindCardFilter,
      router
    );
  };

  useEffect(() => {}, [showDestination]);

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

  const onOpenCountry = (e: any) => {
    setSelectedDestination(
      (prev: SelectedFilterDestination): SelectedFilterDestination => ({
        ...prev,
        continent: { id: e.target.id, name: e.target.innerText },
      })
    );

    Axios.get(`/destination/nation?continentId=${e.target.id}`).then((res) => {
      setDestination((prevDestination) => ({
        ...prevDestination,
        country: res.data.data,
        city: [],
      }));
    });
  };

  const onOpenCity = (e: any) => {
    setSelectedDestination((prev) => ({
      ...prev,
      country: { id: e.target.id, name: e.target.innerText },
    }));

    Axios.get(`/destination/region?nationId=${e.target.id}`).then((res) => {
      setDestination((prevDestination) => ({
        ...prevDestination,
        city: res.data.data,
      }));
    });
  };

  // 달력
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [tripDate, setTripDate] = useState([]);

  // 인원수 선택
  const [selectedNum, setSelectedNum] = useState(0);

  // 검색어
  const [keyword, setKeyword] = useState("");
  return (
    <Banner>
      <Content>
        <BannerTitle>
          <div>여행의 모든 여정을 함께하다</div>
          <div>함께 하고 싶은 여행자를 Travelend에서 바로 찾아보세요</div>
        </BannerTitle>

        <FindFilter>
          <FilterMainWrapper>
            <FilterMiddleWrapper>
              <FilterFrontWrapper>
                <DesFilterWrapper>
                  <DesFilterTitleWrapper>
                    <FilterTitleImg src="icon/location.png"></FilterTitleImg>
                    <FilterTitleTxt>여행지</FilterTitleTxt>
                    {isCountry && (
                      <CountrySelectWrapper>
                        <ContinentSelect>
                          {destination.continent.map((des: Destination) => (
                            <ContinentContent
                              key={des.id}
                              id={des.id as unknown as string}
                              onClick={(e: any) => onOpenCountry(e)}
                              selected={
                                !!(
                                  selectedDestination.continent.name ===
                                  des.name
                                )
                              }
                            >
                              {des.name}
                            </ContinentContent>
                          ))}
                        </ContinentSelect>
                        <CountrySelect>
                          {destination.country.map((des: Destination) => (
                            <ContinentContent
                              key={des.id}
                              id={des.id as unknown as string}
                              onClick={(e: any) => onOpenCity(e)}
                              selected={
                                selectedDestination.country.name === des.name
                              }
                            >
                              {des.name}
                            </ContinentContent>
                          ))}
                        </CountrySelect>
                        <CitySelect>
                          {destination.city.map((des: Destination) => (
                            <ContinentContent
                              key={des.id}
                              id={des.id as unknown as string}
                              onClick={(e: any) => {
                                setIsCountry(false);
                                setSelectedDestination((prev) => ({
                                  ...prev,
                                  city: {
                                    id: e.target.id,
                                    name: e.target.innerText,
                                  },
                                }));
                                setShowDestination({
                                  country:
                                    selectedDestination.country?.name || "",
                                  city: e.target.innerText,
                                });
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
                  </DesFilterTitleWrapper>
                  <Filter onClick={onOpenDestination}>
                    <DesFilterInput>
                      {selectedDestination.city.name === "" ? (
                        "선택"
                      ) : (
                        <React.Fragment>
                          <div>{showDestination.country}</div>
                          <div>,</div>
                          <div>{showDestination.city}</div>
                        </React.Fragment>
                      )}
                    </DesFilterInput>
                    <FilterBtn></FilterBtn>
                  </Filter>
                </DesFilterWrapper>

                <DateRangeFilterWrapper style={{ position: "relative" }}>
                  <FilterTitleWrapper>
                    <FilterTitleImg src="icon/calendar.png"></FilterTitleImg>
                    <FilterTitleTxt>일정</FilterTitleTxt>
                  </FilterTitleWrapper>
                  <DateFilterWrapper
                    onClick={(e) => {
                      isOpenCalendar
                        ? setIsOpenCalendar(false)
                        : setIsOpenCalendar(true);
                    }}
                  >
                    <Filter>
                      <FilterInput>
                        {tripDate.length === 0 ? `가는 날` : tripDate[0]}
                      </FilterInput>
                      <FilterBtn></FilterBtn>
                    </Filter>
                    <DateLine></DateLine>
                    <Filter>
                      <FilterInput>
                        {tripDate.length === 0 ? `오는 날` : tripDate[1]}
                      </FilterInput>
                      <FilterBtn></FilterBtn>
                    </Filter>
                  </DateFilterWrapper>
                  {isOpenCalendar && (
                    <CalendarWrapper>
                      <Calendar
                        setIsOpenCalendar={setIsOpenCalendar}
                        setTripDate={setTripDate}
                        restrict={false}
                      />
                    </CalendarWrapper>
                  )}
                </DateRangeFilterWrapper>

                <NumFilterWrapper>
                  <FilterTitleWrapper>
                    <FilterTitleImg src="icon/user.png"></FilterTitleImg>
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
                </NumFilterWrapper>
              </FilterFrontWrapper>

              <FilterBackWrapper>
                <FilterWrapper>
                  <FilterTitleWrapper>
                    <FilterTitleImg src="icon/searchBlack.png"></FilterTitleImg>
                    <FilterTitleTxt>검색</FilterTitleTxt>
                  </FilterTitleWrapper>
                  <Input
                    placeholder="직접 입력"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </FilterWrapper>
              </FilterBackWrapper>
            </FilterMiddleWrapper>

            <FilterFindBtn onClick={onClcickFilterFind}>
              <FilterFindBtnTxt>여행자 찾기</FilterFindBtnTxt>
              <BtnArrow src="icon/arrow.png"></BtnArrow>
            </FilterFindBtn>
          </FilterMainWrapper>
        </FindFilter>
      </Content>
    </Banner>
  );
}

// 배너
const Banner = styled.div`
  width: 100%;
  height: 600px;
  margin-bottom: 120px;
  padding-top: 116px;
  background-color: aliceblue;
  background-image: url("/img/bannerImg.png");
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 150px;

  ${({ theme }) => theme.media.tablet} {
    height: 840px;
    margin-bottom: 100px;
  }
`;

const Content = styled.div`
  width: 95%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 52px;
`;

const BannerTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;

  div {
    ${({ theme }) => theme.media.tablet} {
      display: flex;
      line-height: 2.5rem;
      text-align: center;
      justify-content: center;
    }

    &:first-child {
      font-weight: 700;
      font-size: 3rem;
      line-height: 1;
      color: #fff;
      ${({ theme }) => theme.media.mobile} {
        font-size: 32px;
      }
    }

    &:last-child {
      font-weight: 500;
      font-size: 1.25rem;
      color: #fff;
    }
  }
`;

const FindFilter = styled.div`
  width: 100%;
  height: 300px;

  padding: 0px 4rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    width: auto;
    height: auto;
    padding: 2rem;
  }

  ${({ theme }) => theme.media.tablet} {
    width: auto;
    height: auto;
    padding: 3rem;
  }
`;

// 여행자 찾기 버튼과 나머지 배치
const FilterMainWrapper = styled.div`
  // display: flex;
  // flex-direction: row;
  // width: 100%;
  // justify-content: space-between;
  // width: 1220px;

  width: 100%;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: auto;
  gap: 40px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const FilterMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FilterFrontWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3.5fr 1.5fr; // 세 개의 컬럼
  grid-template-rows: auto; // 한 개의 행
  gap: 20px; // 그리드 사이의 간격

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 2.5fr 3.5fr 1.5fr;
    grid-template-rows: auto;
  }

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 40px;
    width: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: auto;
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
`;

const DesFilterWrapper = styled(FilterWrapper)`
  ${({ theme }) => theme.media.tablet} {
    order: 0;
    // grid-column: 1 / 2;
  }
  ${({theme}) => theme.media.mobile}{
    order: 0;
    // grid-column: 1 / 2;
  }
`

const DateRangeFilterWrapper = styled(FilterWrapper)`
  // grid-column: 1 / 3;
  ${({theme}) => theme.media.tablet}{
    order: 2;
    grid-column: 1 / 3;
  }
  ${({theme}) => theme.media.mobile}{
    order: 1;
    grid-column: 1 / 2;
  }
`

const NumFilterWrapper = styled(FilterWrapper)`
  ${({ theme }) => theme.media.tablet} {
    order: 1;
    // grid-column: 2 / 3;
  }
  ${({theme}) => theme.media.mobile}{
    order: 2;
    // grid-column: 2 / 3;
  }
`


const FilterBackWrapper = styled.div`
  margin-top: 35px;
`;

const FilterTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 13px;
`;

const DesFilterTitleWrapper = styled(FilterTitleWrapper)`
  position: relative;
`;

const Filter = styled.div`
  height: 50px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  width: 100%;
`;

const FilterSelect = styled.div`
  // min-width: 7rem;
  width: 100%;
  height: 50px;
  padding: 0.75rem 1rem;
  background: #fff;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  border: none;
  color: #666666;
`;

const FilterMinusImg = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    width: 0.8rem;
    height: 0.8rem;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 1rem;
    height: 1rem;
  }
`;

const FilterNum = styled.div`
  font-size: 0.8rem;

  ${({ theme }) => theme.media.tablet} {
    font-size: 0.9rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
  }
`;

const FilterPlusImg = styled.img`
  width: 0.6rem;
  height: 0.6rem;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    width: 0.8rem;
    height: 0.8rem;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 1rem;
    height: 1rem;
  }
`;

const FilterTitleImg = styled.img`
  margin-right: 4px;
  width: 1rem;
  height: 1rem;
`;

const FilterTitleTxt = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #333333;
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #fff;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  ${({ theme }) => theme.media.tablet} {
    font-size: 0.9rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
  }
`;

const FilterInput = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  color: #666666;
  text-align: center;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.tablet} {
    font-size: 0.9rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;
  }
`;

const DesFilterInput = styled(FilterInput)`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  gap: 3px;
`;

const FilterBtn = styled.div`
  width: 12px;
  height: 9px;
  background-image: url("icon/listArrow.png");
`;

const DateFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const DateLine = styled.div`
  // width: 12px;
  width: 25px;
  height: 2px;
  background-color: #666666;
  margin: 0px 7px;
`;

// 여행자 찾기 버튼
const FilterFindBtn = styled.button`
  width: 100%;
  height: 170px;
  border-radius: 10px;
  background: rgba(154, 179, 245, 0.8);
  border-radius: 50px;
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    height: 60px;
    border-radius: 10px;
    font-size: 1.2rem;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 1.2rem;
  }
`;

const FilterFindBtnTxt = styled.div`
  margin-right: 4px;
  font-weight: 700;
  // font-size: 0.9rem;
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
  top: 82px;
  left: 0;

  z-index: 101;
`;

const ContinentSelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214, 214, 214, 0.5);
`;

const ContinentContent = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
  padding: 8px;

  &:hover {
    background-color: #f2efef;
  }

  background-color: ${(props) => (props.selected ? "#D4D4D4" : "ffffff")};
`;

const CountrySelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214, 214, 214, 0.5);
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

const BtnArrow = styled.img``;

const BtnBigArrow = styled(BtnArrow)`
  margin-right: 20px;
  height: 15px;
  width: 20px;
`;
