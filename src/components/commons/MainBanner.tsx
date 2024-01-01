import {
  FindCardFilter,
  FindCardList
} from "@/States/LoginState";
import Axios from "@/apis";
import onClickFilterFind from "@/hook/onClickFilterFind";
import {
  Destination,
  FilterDestination,
  SelectedFilterDestination,
  ShowFilterDestination
} from "@/interfaces/main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Calendar from "./Tools/Calendar";


export default function MainBanner () {
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
  const [selectedDestination, setSelectedDestination] = useState<SelectedFilterDestination>({
    continent: { id: 0, name: "" },
    country: { id: 0, name: "" },
    city: { id: 0, name: "" },
  });
  const [showDestination, setShowDestination] = useState<ShowFilterDestination>({
    country: "",
    city: "",
  });

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
      Axios.get("/destination/continent")
        .then((res) => {
            setDestination((prevDestination) => ({
            continent: res.data.data,
            country: [],
            city: [],
            }));
        });
    }
  };

  const onOpenCountry = (e : any) => {
    setSelectedDestination((prev : SelectedFilterDestination): SelectedFilterDestination => ({
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

  const onOpenCity = (e : any) => {
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
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [tripDate, setTripDate] = useState([]);

  // 인원수 선택
  const [selectedNum, setSelectedNum] = useState(0);

  // 검색어
  const [keyword, setKeyword] = useState("");
    return (
        <>
          <Banner>
            <BannerImgWrapper>
              <BannerTitle>
                <TitleTxt>여행</TitleTxt>에<TitleTxt> 스타일</TitleTxt>을
                더하다
              </BannerTitle>
              <BannerTxt>
                함께 하고 싶은 여행자를 Trip’yle에서 바로 찾아보세요
              </BannerTxt>
            </BannerImgWrapper>
            <FindFilter>
              <FilterMainWrapper>
                <FilterMiddleWrapper>
                  <FilterFrontWrapper>
                    <FilterWrapper>
                      <FilterTitleWrapper>
                        <FilterTitleImg src="icon/location.png"></FilterTitleImg>
                        <FilterTitleTxt>여행지</FilterTitleTxt>
                        {isCountry && (
                          <CountrySelectWrapper>
                            <ContinentSelect>
                              {destination.continent.map((des : Destination) => (
                                <ContinentContent
                                  key={des.id}
                                  id={des.id as unknown as string}
                                  onClick={(e: any) => onOpenCountry(e)}
                                  selected={
                                    !!(selectedDestination.continent.name === des.name)
                                  }
                                >
                                  {des.name}
                                </ContinentContent>
                              ))}
                            </ContinentSelect>
                            <CountrySelect>
                              {destination.country.map((des : Destination) => (
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
                              {destination.city.map((des : Destination) => (
                                <ContinentContent
                                    key={des.id}
                                    id={des.id as unknown as string}
                                    onClick={(e : any) => {
                                        setIsCountry(false);
                                        setSelectedDestination((prev) => ({
                                          ...prev,
                                          city: {
                                              id: e.target.id,
                                              name: e.target.innerText,
                                          },
                                        }));
                                        setShowDestination({
                                          country: selectedDestination.country?.name || "",
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
                      </FilterTitleWrapper>
                      <Filter
                        style={{ width: "280px" }}
                        onClick={onOpenDestination}
                      >
                        <FilterInput>
                          {selectedDestination.city.name === ""
                            ? "선택"
                            // : `${showDestination.country.name}, ${showDestination.city}`}
                            : `${showDestination.country}, ${showDestination.city}`}
                        </FilterInput>
                        <FilterBtn></FilterBtn>
                      </Filter>
                    </FilterWrapper>
    
                    <FilterWrapper style={{ position: "relative" }}>
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
                      {isOpenCalendar && (
                        <CalendarWrapper>
                          <Calendar
                            setIsOpenCalendar={setIsOpenCalendar}
                            setTripDate={setTripDate}
                            restrict={false}
                          />
                        </CalendarWrapper>
                      )}
                    </FilterWrapper>
    
                    <FilterWrapper>
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
                    </FilterWrapper>
                  </FilterFrontWrapper>
    
                  <FilterBackWrapper>
                    <FilterWrapper>
                      <FilterTitleWrapper>
                        <FilterTitleImg src="icon/searchBlack.png"></FilterTitleImg>
                        <FilterTitleTxt>검색</FilterTitleTxt>
                      </FilterTitleWrapper>
                      <Input
                        style={{ width: "925px" }}
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
          </Banner>
        </>
    );
}


export const Banner = styled.div`
  background-color: #ffffff;
  margin: auto;
  margin-bottom: 200px;
  /* background-image: url("img/bannerImg.png"); */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerImgWrapper = styled.div`
  height: 854px;
  width: 1920px;
  position: relative;

  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;

  background-image: url("img/bannerImg.png");
  background-size: cover;
  color: rgba(255, 255, 255, 1);

  &::before{
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const BannerTitle = styled.div`
  margin: 200px 260px 0 260px;
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 1;
  color: white;
  position: relative;
  z-index: 100;
`;

export const TitleTxt = styled.span`
  background: linear-gradient(to bottom, #77C0D2, #BBA9F6);
  color: transparent;
  -webkit-background-clip: text;
  position: relative;
  z-index: 100;
`;

export const BannerTxt = styled.div`
  margin: 100px 260px 0 260px;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 1;
  color: #ffffff;
  position: relative;
  z-index: 100;
`;

export const FindFilter = styled.div`
  width: 1400px;
  height: 309px;

  padding: 0px 95px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 580px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  margin: 0 20px;
`;

export const FilterMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1220px;
`;

export const FilterMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterFrontWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FilterBackWrapper = styled.div`
  margin-top: 35px;
`;

export const FilterTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 13px;
`;

export const Filter = styled.div`
  height: 50px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const FilterSelect = styled.div`
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

export const FilterMinusImg = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const FilterNum = styled.div``;

export const FilterPlusImg = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const FilterTitleImg = styled.img`
  margin-right: 5px;
`;

export const FilterTitleTxt = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 1;
  color: #333333;
`;

export const Input = styled.input`
  height: 50px;
  width: 925px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

export const FilterInput = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const FilterBtn = styled.div`
  width: 12px;
  height: 9px;
  background-image: url("icon/listArrow.png");
`;

export const DateFilterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DateLine = styled.div`
  width: 12px;
  height: 2px;
  background-color: #666666;
  margin: 0px 7px;
`;

export const FilterFindBtn = styled.button`
  width: 200px;
  height: 170px;
  border-radius: 30px;
  background: rgba(154, 179, 245, 0.8);
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 33px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterFindBtnTxt = styled.div`
  margin-right: 4px;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`;

// 여행지 선택
export const CountrySelectWrapper = styled.div`
  width: 300px;
  height: 280px;
  background-color: #ffffff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: absolute;
  top: 128px;
  left: 100px;
`;

export const ContinentSelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214, 214, 214, 0.5);
`;

export const ContinentContent = styled.div<{selected: boolean}>`
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

export const CountrySelect = styled.div`
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

export const CitySelect = styled.div`
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


export const CalendarWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;


position: relative;
z-index: 101;
bottom: 0px;
right: 0px;

`;

export const BtnArrow = styled.img``;

export const BtnBigArrow = styled(BtnArrow)`
  margin-right: 20px;
  height: 15px;
  width: 20px;
`;