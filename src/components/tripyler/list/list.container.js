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
import styled from "styled-components";
import * as S from "./list.style";

import Pagenation from "@/components/commons/Pagenation";
import ListBox from "./ListBox";
import Platform from "./Platform";

export default function FindTripylerList() {
  const isJwtValid = useRecoilValue(IsJwtValidSelector); // JWT 토큰 유효성 가져오기
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const jwtInfo = useRecoilValue(JwtTokenState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [findCardFilter, setFindCardFilter] = useRecoilState(FindCardFilter);

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
      {/* <FindTripylerBanner
        title="Trip'yler 찾기"
        subTitle={["함께 동행하고 싶은 여행자를", "Trip'yle에서 바로 찾아보고", "여행 동행 게시물도 작성해보세요."]}
        review={false}
      /> */}
      <BannerImgWrapper>
        <S.BannerImg src="img/bannerImg2.png" alt="banner"/>
      </BannerImgWrapper>
      <BannerTitleWrapper>
        <BannerTitle>
          <BannerTitleTxt>Travelender 찾기</BannerTitleTxt>
        </BannerTitle>
        <BannerTxt>
          <S.BannerSubTitleTxt>함께 동행하고 싶은 여행자를</S.BannerSubTitleTxt>
          <S.BannerSubTitleTxt>Travelend에서 바로 찾아보고</S.BannerSubTitleTxt>
          <S.BannerSubTitleTxt>여행 동행 게시물도 작성해보세요.</S.BannerSubTitleTxt>
        </BannerTxt>
      
      <S.Banner>
        <FindFilter>
          <FilterMainWrapper>
            <S.FilterMiddleWrapper>
              <FilterFrontWrapper>
                <DesFilterWrapper>
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
                    onClick={onOpenDestination}
                  >
                    <S.FilterInput>
                      {selectedDestination.city.name === ""
                        ? "선택"
                        : `${showDestination.country}, ${showDestination.city}`}
                    </S.FilterInput>
                    <S.FilterBtn></S.FilterBtn>
                  </S.Filter>
                </DesFilterWrapper>

                <S.FilterWrapper>
                  <S.FilterTitleWrapper>
                    <S.FilterTitleImg src="/icon/calendar.png"></S.FilterTitleImg>
                    <S.FilterTitleTxt>일정</S.FilterTitleTxt>
                  </S.FilterTitleWrapper>
                  <DateRangeFilterWrapper
                    onClick={(e) => {
                      isCalendar ? setIsCalendar(false) : setIsCalendar(true);
                      !isFirstCalendar && setIsFirstCalendar(true);
                    }}
                  >
                    <S.DateFilter>
                      <S.FilterInput>
                        {tripDate.length === 0 ? `가는 날` : tripDate[0]}
                      </S.FilterInput>
                      <S.FilterBtn></S.FilterBtn>
                    </S.DateFilter>
                    <S.DateLine></S.DateLine>
                    <S.DateFilter>
                      <S.FilterInput>
                        {tripDate.length === 0 ? `오는 날` : tripDate[1]}
                      </S.FilterInput>
                      <S.FilterBtn></S.FilterBtn>
                    </S.DateFilter>
                  </DateRangeFilterWrapper>
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

                <NumFilterWrapper>
                  <S.FilterTitleWrapper>
                    <S.FilterTitleImg src="/icon/user.png"></S.FilterTitleImg>
                    <S.FilterTitleTxt>인원</S.FilterTitleTxt>
                  </S.FilterTitleWrapper>
                  <FilterSelect>
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
                  </FilterSelect>
                </NumFilterWrapper>
              </FilterFrontWrapper>
              </S.FilterMiddleWrapper>

              <FilterBottomWrapper>
                <S.FilterBackWrapper>
                  <S.FilterWrapper>
                    <S.FilterTitleWrapper>
                      <S.FilterTitleImg src="/icon/searchBlack.png"></S.FilterTitleImg>
                      <S.FilterTitleTxt>검색</S.FilterTitleTxt>
                    </S.FilterTitleWrapper>
                    <S.SearchInput
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="직접 입력"
                    />
                  </S.FilterWrapper>
                </S.FilterBackWrapper>
                <S.FilterBtnWrapper>
                  <FilterFindBtn onClick={onClcickFilterFind}>
                    <S.FilterFindBtnTxt>여행자 찾기</S.FilterFindBtnTxt>
                  </FilterFindBtn>
                </S.FilterBtnWrapper>
              </FilterBottomWrapper>
          </FilterMainWrapper>
        </FindFilter>
      </S.Banner>
      </BannerTitleWrapper>
      {/* <ListBanner /> */}

      <S.ContentWrapper>
        <ListBox 
          option={option}
          setOption={setOption}
          onClcickFilterFind={onClcickFilterFind}
          isRecruiting={isRecruiting}
          setIsRecruiting={setIsRecruiting}
          newCardList={newCardList}
          currentPage={currentPage}
        />

        {/* <PlatformBox /> */}
        {pageNum.length && (
            <Pagenation 
              currentPage={currentPage}
              setPage={setPage}
              pageNum={pageNum}
              totalNum={newCardList?.length}
              pageSize="6"
            />
          )}
      </S.ContentWrapper>

      <S.ContentWrapper>
        <Platform/>
      </S.ContentWrapper>
    </S.Container>
  );
};

const BannerImgWrapper = styled.div`
  height: 570px;
  width: 100%;
  max-width: 1640px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  object-fit: cover;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 100px;

  ${({theme}) => theme.media.mobile}{
    margin-bottom: 250px;
  }
  
  ${({theme}) => theme.media.tablet}{
    margin-bottom: 200px;
  }
`;

const BannerTitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 1250px;
`;

const BannerTitleTxt = styled.span`
  margin-right: 10px;
  ${({theme}) => theme.media.mobile}{
    margin: 0 auto;
  }
  
  ${({theme}) => theme.media.tablet}{
    margin: 0 auto;
  }
`;

const BannerTitle = styled.div`
  margin-top: 200px;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  color: #333;
  position: relative;
  z-index: 100;
  // white-space: nowrap;

  ${({theme}) => theme.media.mobile}{
    width: 100%;
    margin-top: calc(100px - 1.5rem);
  }
  
  ${({theme}) => theme.media.tablet}{
    width: 100%;
    margin-top: calc(100px - 1.5rem);
  }
`;

const BannerTxt = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 0;
  gap: 15px;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2rem;
  color: #666;
  position: relative;
  z-index: 100;
  // white-space: nowrap;
  ${({theme}) => theme.media.mobile}{
    display: none;
  }
  
  ${({theme}) => theme.media.tablet}{
    display: none;
  }
`;

const FindFilter = styled.div`
  max-width: 1100px;
  width: calc(640px + 8rem);
  min-width: 300px;

  padding: 2rem 4rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);

  position: absolute;
  top: 200px;
  left: 35%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1200px){
    width: auto;
    left: 38%;
  }

${({theme}) => theme.media.mobile}{
  width: auto;
  padding: 2rem;
  transform: translate(-29%, 0);
}

${({theme}) => theme.media.tablet}{
  width: auto;
  padding: 3rem;
  transform: translate(-29%, 0);
}
`;

// 세로 두 줄 배치
const FilterMainWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
  width: 100%;

  ${({theme}) => theme.media.desktop}{
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
    width: 100%;
  }

  ${({theme}) => theme.media.tablet}{
    grid-template-columns: auto;
    grid-template-rows: repeat(2, 1fr);
  }

  ${({theme}) => theme.media.mobile}{
    grid-template-columns: auto;
    grid-template-rows: 2fr 1fr;
  }

`;

const FilterFrontWrapper = styled.div`
display: grid;
width: 100%;
//gap: 20px; // 그리드 사이의 간격
grid-template-columns: 2.5fr 5fr 2fr;
  grid-template-rows: auto;
  ${({theme}) => theme.media.desktop}{
    
    grid-template-columns: 2.5fr 4.5fr 2fr;
    grid-template-rows: auto;
  }

  ${({theme}) => theme.media.tablet}{
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 40px;
    // width: 550px;
    width: 60vw;
  }

  ${({theme}) => theme.media.mobile}{
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    width: 60vw;
  }
`;

const FilterBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  gap: 20px;

  ${({theme}) => theme.media.tablet}{
    flex-direction: column;
    gap: 40px;
  }

  ${({theme}) => theme.media.mobile}{
    flex-direction: column;
    gap: 20px;
  }
`;

const FilterWrapper = styled.div`
  margin: 0 10px;
`;

const DesFilterWrapper = styled(FilterWrapper)`
  ${({theme}) => theme.media.tablet}{
    order: 0;
  }
  ${({theme}) => theme.media.mobile}{
    order: 0;
    grid-column: 1 / 3;
  }
`

const DateRangeFilterWrapper = styled(FilterWrapper)`
  display: flex;
  align-items: center;
  width: 100%;

  ${({theme}) => theme.media.tablet}{
    order: 2;
    grid-column: 1 / 3;
  }
  ${({theme}) => theme.media.mobile}{
    order: 1;
    grid-column: 1 / 3;
  }
`

const NumFilterWrapper = styled(FilterWrapper)`
  ${({theme}) => theme.media.tablet}{
    order: 1;
    grid-column: 1 / 3;
  }
  ${({theme}) => theme.media.mobile}{
    order: 2;
  }
`


const FilterSelect = styled.div`
  width: 100%;
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

  ${({theme}) => theme.media.tablet}{
    order: 1;
    grid-column: 1 / 3;
  }
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

  ${({theme}) => theme.media.tablet}{
    width: 100%;
  }

  ${({theme}) => theme.media.mobile}{
    width: 100%;
  }
`;