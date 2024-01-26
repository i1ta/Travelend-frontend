import theme from "@/styles/theme";
import styled from "@emotion/styled";
// import FindCard from "../../commons/FindCard/FindCard;"

export const Banner = styled.div`
  background-color: #fff;
  opacity: 0.9;
  margin: auto;
  margin-bottom: 30px;
  /* background-image: url("img/bannerImg.png"); */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerImgWrapper = styled.div`
  height: 500px;
  // width: 1920px;
  width: 100%;
  background-image: url("img/bannerImg.png");

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BannerTitle = styled.div`
  margin-bottom: 25px;
  font-style: normal;
  font-weight: 700;
  font-size: 3rem;
  line-height: 1;
  color: white;
`;

export const TitleTxt = styled.span``;

export const BannerTxt = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12.5rem;
  line-height: 1;
  color: #ffffff;
`;

export const FindFilter = styled.div`
  // width: 1400px;
  // width: 60vw;
  width: 80%;
  max-width: 1000px;
  height: auto;

  padding: 2rem 1rem 2rem 4.75rem ;
  background: #ffffff;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 430px;

  display: flex;
  justify-content: space-between;
  align-items: center;

`;

export const FindFilterClose = styled.div`
  width: 80%;
  max-width: 1000px;
  height: 160px;

  padding-left: 4.75rem;
  padding-right: 1rem;
  padding-top: 20px;
  background: #ffffff;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 430px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  // margin: 0 20px;
  margin: 0 1rem;
  // width: 100%;
`;

// 여행지
export const DesFilterWrapper = styled(FilterWrapper)`
  width: 35%;

  @media screen and (max-width: 1023.9px){
    width: 92%;
  }

`;

// 일정
export const DateRangeFilterWrapper = styled(FilterWrapper)`
  width: 45%;

  @media screen and (max-width: 1023.9px){
    width: 92%;
  }
`

// 인원
export const NumFilterWrapper = styled(FilterWrapper)`
  width: 20%;

  @media screen and (max-width: 1023.9px){
    width: 92%;
  }
`;

export const FilterMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // width: 1220px;
  width: 90%;
  gap: 1rem;
`;

export const FilterMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media screen and (max-width: 1023.9px){
    width: 100%;
  }
`;

// 여행지, 일정, 인원
export const FilterFrontWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media screen and (max-width: 767.9px){
    display: grid;
    grid-template-column: auto;
    grid-template-row: repeat(2, 1fr;)
  }
`;

export const FilterBackWrapper = styled.div`
  margin-bottom: 35px;
  width: 100%;
`;

export const FilterTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 13px;

  @media screen and (max-width: 1023.9px){
    width: 100%;
  }
`;

export const Filter = styled.div`
width: 100%;
  height: 50px;
  // padding: 15px 20px;
  padding: 15px 1rem;
  background: #f2efef;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const FilterSelect = styled.div`
  // width: 140px;
  width: 100%;
  height: 50px;
  padding: 15px 1rem;
  background: #f2efef;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  border: none;
  color: #666666;
`;

export const FilterMinusImg = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  cursor: pointer;
`;

export const FilterNum = styled.div`
  font-size: 0.8rem;
  margin: 0 0.5rem;
`;

export const FilterPlusImg = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  cursor: pointer;
`;
export const FilterTitleImg = styled.img`
  margin-right: 5px;
  width: 0.7rem;
  height: 0.7rem;
`;

export const FilterTitleTxt = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1;
  color: #333333;
  white-space: nowrap;
`;

export const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 15px 20px;
  background: #f2efef;
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

export const FilterInput = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  color: #666666;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const FilterBtn = styled.div`
  width: 0.6rem;
  height: 0.45rem;
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
  // width: 160px;
  width: 25%;
  height: 60px;
  background: ${theme.colors.review};
  border-radius: 50px;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterFindBtnTxt = styled.div`
  margin-right: 4px;
  font-weight: 700;
  font-size: 0.8rem;
  color: #ffffff;
`;

export const FilterCloseIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 200px;
  cursor: pointer;
`;

export const FilterOpenIcon = styled.img`
width: 1.5rem;
height: 1.5rem;
  margin-top: 80px;
  cursor: pointer;
`;

// 여행지 선택
export const CountrySelectWrapper = styled.div`
  width: 300px;
  // width: 100%;
  height: 280px;
  background-color: #ffffff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: absolute;
  top: 245px;
  left: 100px;
`;

export const ContinentSelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214, 214, 214, 0.5);
`;

export const ContinentContent = styled.div`
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

  position: absolute;
  z-index: 101;
  top: 128px;
  left: 480px;
`;

export const MonthSelectWrapper = styled.div`
  width: 120px;
  height: 280px;
  background-color: #ffffff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: absolute;
  top: 120px;
  left: -8px;
`;

export const EndMonthSelectWrapper = styled(MonthSelectWrapper)`
  left: 215px;
`;

export const MonthSelect = styled.div`
  width: 100%;
  text-align: center;

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

export const MonthContent = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
  padding: 8px 0px;

  &:hover {
    background-color: #f2efef;
  }

  /*background-color: ${(props) =>
    props.disabledColor ? "#BFBFBF" : "#ffffff"}*/

  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

// 카드 컴포넌트

export const BtnArrow = styled.img``;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;

export const FindTripylerContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  // margin-left: 20px;
`;

export const FindTripylerNoContent = styled(FindTripylerContent)`
  height: 200px;
  margin: auto;
  justify-content: center;
  align-items: center;
  padding: 500px 0;
`;

export const NoContent = styled.div`
  font-size: 2rem;
`;

export const ContentWrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FindTripylerTitle = styled.div`
  // width: 1260px;
  width: 100%;
  max-width: 1260px;
  height: 64px;

  display: flex;
  flex-direction: row;

  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffff;
  margin: 60px 0;
  padding: 10px 0 10px 2rem;
  border-radius: 10px;
  background-color: ${theme.colors.review};
  align-items: center;
  justify-content: space-between;
`;

export const FindTripylerWriteBtn = styled.div`
  background-color: #ffffff;
  color: ${theme.colors.review};
  margin-right: 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  padding: 8px 1rem;
  cursor: pointer;
`;

export const FindTripylerTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export const FindTripylerFilterOne = styled.select`
  border: 2px solid #00b4d8;
  border-radius: 20px;
  // width: 111px;
  width: 100%;
  max-width: 111px;
  height: 50px;
  margin-left: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #00b4d8;
  cursor: pointer;

  &:focus {
    border: 2px solid #00b4d8;
  }
`;

export const FindTripylerOptionOne = styled.option`
  border: 2px solid #00b4d8;
  border-radius: 20px;
  width: 100%;
  max-width: 111px;
  height: 50px;
`;

export const FindTripylerFilterTwo = styled.select`
  border: 2px solid ${theme.colors.review};
  border-radius: 20px;
  width: 100%;
  max-width: 111px;
  height: 50px;
  margin-left: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: ${theme.colors.review};
  cursor: pointer;

  &:focus {
    border: 2px solid ${theme.colors.review};
  }
`;

export const PageNationWrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;

  margin: 70px 0;
`;

export const PageTxt = styled.div`
  font-size: 12.5rem;
  margin: 0 10px;
  cursor: pointer;

  color: ${(props) => (props.selected ? "#000000" : "rgba(0, 0, 0, 0.3)")};
`;

export const ArrowImg = styled.img`
  height: 12.5rem;
  width: 0.75rem;
  margin: 0 1rem;
  margin-top: 7px;
  cursor: pointer;
`;

export const AdWrapper = styled.div`
  text-align: center;
  margin: 150px auto;
`;

export const AdImg = styled.img`
  height: 410px;
  max-width: 1920px;
  width: 100%;

`;
