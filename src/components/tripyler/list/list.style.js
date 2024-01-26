import styled from "@emotion/styled";
import { css } from "styled-components";
// import FindCard from "../../commons/FindCard/FindCard;"

export const Container = styled.div`
  // min-width: 1720px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  position: relative;
`;


export const Banner = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  // width: 1400px;
  // min-width: 1960px;
  width: 50%;
  margin-bottom: 100px;
  /* background-image: url("img/bannerImg.png"); */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // position: relative;
  
`;


export const BannerImgWrapper = styled.div`
  height: 570px;
  width: 100%;
  max-width: 1640px;
  margin: 0 auto;
  // position: relative;

  display: flex;
  flex-direction: column;

  object-fit: cover;
  color: rgba(255, 255, 255, 1);
`;

export const BannerImg = styled.img`
  width: 100%;
  height: 570px;
  object-fit: cover;
`;

export const BannerTitleWrapper = styled.div`
  position: absolute;
  // top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 1250px;
`;

export const BannerTitle = styled.div`
  margin: 200px 0 0 0;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 1;
  color: #333;
  position: relative;
  z-index: 100;
  // white-space: nowrap;

`;

export const BannerTitleTxt = styled.span`
  margin-right: 10px;
`;

export const BannerSubTitleTxt = styled.span`
  margin-right: 5px;
`;


export const BannerTxt = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0 0 0;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2rem;
  color: #666;
  position: relative;
  z-index: 100;
  // white-space: nowrap;

`;


export const FindFilter = styled.div`
  // width: 944px;
  // width: 100%;
  height: 289px;

  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 200px;
  left: 20%;
  margin: 0 auto;
  padding: 0 3rem;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  margin: 0 10px;
`;

export const FilterMainWrapper = styled.div`
  margin: 0 auto;
`;

export const FilterMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FilterFrontWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // margin: 0 auto;
`

export const FilterBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

export const FilterBackWrapper = styled.div`
  // margin-top: 35px;
  width: 100%;
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

export const DateFilter = styled(Filter)`
  width: 45%;
  white-space: nowrap;
`;

export const FilterSelect = styled.div`
  // width: 140px;
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
`;

export const FilterMinusImg = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  cursor: pointer;
`;

export const FilterNum = styled.div`
  font-size: 0.8rem;
`;

export const FilterPlusImg = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  cursor: pointer;
`;
export const FilterTitleImg = styled.img`
  margin-right: 5px;
`;

export const FilterTitleTxt = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1;
  color: #333333;
`;

export const Input = styled.input`
  height: 50px;
  padding: 15px 20px;
  background: #fff;
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

export const SearchInput = styled(Input)`
  width: 100%;
`;

export const FilterInput = styled.div`
  width: 45%;
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
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

export const FilterBtnWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const FilterFindBtn = styled.button`
  // width: 138px;
  height: 50px;
  background: rgba(154, 179, 245, 0.8);
  border-radius: 20px;
  margin-left: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterFindBtnTxt = styled.div`
  margin-right: 4px;
  font-weight: 700;
  font-size: 0.9rem;
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
  z-index: 101;
  top: 128px;
  left: 100px;
`

export const ContinentSelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214,214,214,0.5);

`

export const ContinentContent = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 8px;

  &:hover{
    background-color: #f2efef;
  }

  background-color: ${(props) => 
    props.selected ? "#D4D4D4" : "ffffff"
  };
`

export const CountrySelect = styled.div`
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

// 카드 컴포넌트 

export const BtnArrow = styled.img``;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1440px;
`;

export const FindTripylerContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 20px;
  gap: 70px;
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

  margin-bottom: 100px;
`;

export const FindTripylerTitle = styled.div`
  min-width: 1400px;
  max-width: 1960px;
  height: 64px;

  display: flex;
  flex-direction: row;

  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  color: #6179B6;
  margin: 30px 0;
  padding: 10px 0 10px 0;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #6179B6;
`;

export const FindTripylerTitleBetween = styled(FindTripylerTitle)`
  border: none;
  margin: 0 auto;
`

export const FindTripylerWriteBtn = styled.div`
  background-color: #ffffff;
  color: #6179B6;
  margin-right: 15px;
  border-radius: 50px;
  font-size: 0.9rem;
  padding: 8px 20px;
  cursor: pointer;
`;

export const FindTripylerTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 0 auto;
  align-items: center;
  justify-content: center;
`

export const FindTripylerTitleWrapperBetween = styled(FindTripylerTitleWrapper)`
  justify-content: space-between;
  margin-bottom: 2rem;
`

export const FindTripylerFilterOne = styled.div`
  // border: 2px solid #666;
  border-radius: 5px;
  width: 100px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  font-size: 0.75rem;
  color: #666;
  cursor: pointer;

  &:focus{
    border: 2px solid #666;
  }
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const FindTripylerFilterOneTitle = styled.div`
border: 2px solid #666;
border-radius: 5px;
  position: relative;
  width: 100px;
  height: 39px;
  line-height: 39px;
`;

export const FindTripylerOptionOneWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100px;
  border: 2px solid #666;
  border-radius: 5px;
`;

export const FindTripylerOptionOne = styled.div`
  text-align: center;
  width: 100px;
  height: 39px;
  line-height: 39px;
`;

export const FindTripylerLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #666;
`;

export const FindTripylerFilterTwo = styled.div`
  display: flex;
  text-align: center;
  font-size: 0.75rem;
  color: #00B4D8;
  cursor: pointer;
  gap: 1.25rem;

  &:focus{
    border: 2px solid #00B4D8;;
  }

  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const FindTripylerFilterTwoCategory = styled.div`
  color: #666;
  border: 1px solid #666;
  border-radius: 20px;
  width: 6.9375rem;
  height: 2.4375rem;
  font-size: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.selected && "#666"};
  color: ${(props) => props.selected && "#fff"};
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1400px;
  max-width: 1960px;
  margin: 10px auto 40px auto;
`;

export const FilterCategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const FilterCategory = styled.div`
  width: 111px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  border-radius: 20px;
  color: #9AB3F5;
  border: 2px solid #9AB3F5;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;

  ${(props) =>
    props.selected && css`
      background-color: #9AB3F5;
      color: #fff;
    `
  };
`;

export const FilterRecruitBox = styled.div`
`;

export const FilterRecruit = styled.div`
  width: 100px;
  height: 39px;
  line-height: 39px;
  text-align: center;
  color: #9AB3F5;
  border-radius: 5px;
  border: 2px solid #9AB3F5;
  background-color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;

  position: relative;
`;

export const FilterRecruitModalBox = styled.div`
  z-index: 100;
  position: absolute;

  border-radius: 5px;
  border: 2px solid #9AB3F5;
  width: 100px;
`;

export const FilterRecruitModal = styled.div`
  text-align: center;
  width: 100%;
  height: 39px;
  line-height: 39px;
  text-align: center;
  color: #9AB3F5;
  background-color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
`;

export const FilterRecruitLine = styled.div`
  background-color: #9AB3F5;
  height: 2px;
  // width: 90%;
`;

export const PageNationWrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;

  margin: 70px 0 200px 0;
`;

export const PageTxt = styled.div`
  font-size: 12.5rem;
  margin: 0 10px;
  cursor: pointer;

  color: ${(props) => 
    props.selected ? '#000000' : 'rgba(0, 0, 0, 0.3)'
  }

`;

export const ArrowImg = styled.img`
  height: 25px;
  width: 15px;
  margin: 0 20px;
  margin-top: 7px;
  cursor: pointer;
`;

export const DoubleArrowImg = styled(ArrowImg)`
  margin: 0 10px;
  margin-top: 7px;
  width: 25px;
`;

export const AdWrapper = styled.div`
  text-align: center;
  margin: 150px auto;
`;

export const AdImg = styled.img`
  height: 410px;
  width: 1920px;
`;