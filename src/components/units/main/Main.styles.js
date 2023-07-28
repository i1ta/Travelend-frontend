import styled from "@emotion/styled";
// import FindCard from "../../commons/FindCard/FindCard;"

export const Banner = styled.div`
  background-color: #ffffff;
  margin: auto;
  margin-bottom: 350px;
  /* background-image: url("img/bannerImg.png"); */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerImgWrapper = styled.div`
  height: 500px;
  width: 1920px;
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
  font-size: 60px;
  line-height: 1;
  color: white;
`;

export const TitleTxt = styled.span``;

export const BannerTxt = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 1;
  color: #ffffff;
  
`;

export const FindFilter = styled.div`
  width: 1400px;
  height: 286px;

  padding: 0px 95px;
  background: #ffffff;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 520px;

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
`

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
  background: #f2efef;
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
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const FilterNum = styled.div`

`;

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
  background: #f2efef;
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
  width: 160px;
  height: 60px;
  background: #b388eb;
  border-radius: 50px;
  margin: auto;


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
`

export const ContinentSelect = styled.div`
  width: 100px;
  border-right: 0.5px solid rgba(214,214,214,0.5);

`

export const ContinentContent = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-size: 15px;
  padding: 8px 0;

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
bottom: 53px;
right: 80px;

`;

// 카드 컴포넌트 

export const BtnArrow = styled.img``;

export const BtnBigArrow = styled(BtnArrow)`
  margin-right: 20px;
  height: 30px;
  width: 20px;
`;

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
`;

export const FindTripylerTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  width: 1400px;
  height: 64px;

  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: #ffffff;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 10px 0 10px 40px;
  border-radius: 10px;
  background-color: rgba(0, 180, 216, 0.6);
  align-items: center;

  cursor: pointer;
`;

export const ContentWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;

export const AdWrapper = styled.div`
  text-align: center;
  margin: 150px auto;
`;

export const AdImg = styled.img`
  height: 370px;
  width: 1920px;
  opacity: 0.8;
`;

export const FindTripylerTitle = styled.div`
  
`;

export const ReviewTitleWrapper = styled(FindTripylerTitleWrapper)`
  background-color: rgba(200, 182, 255, 0.8);
`;

export const ReviewTitle = styled.div``;

export const ReviewFilter = styled.div`
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReviewFilterBtn = styled.button`
  width: 150px;
  height: 60px;
  background: ${(props) =>
    props.selectedFilter == props.id ? "#90E0EF" : "#ffffff"};
  border: ${(props) =>
    props.selectedFilter == props.id ? "none" : "2px solid #999999"};
  border-radius: 50px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  

  font-weight: ${(props) => (props.selectedFilter == props.id ? "600" : "400")};
  font-size: 20px;
  color: ${(props) =>
    props.selectedFilter == props.id ? "#ffffff" : "#666666"};
`;
