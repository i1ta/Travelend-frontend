import styled from "@emotion/styled";

export const Banner = styled.div`
  background-color: #769e9e;
  margin: auto;
  margin-bottom: 200px;
  /* background-image: url("img/bannerImg.png"); */

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BannerImgWrapper = styled.div`
  height: 600px;
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
  height: 200px;

  padding: 0px 95px;
  background: #ffffff;
  box-shadow: 0px 10px 30px 10px rgba(102, 102, 102, 0.12);
  position: absolute;
  top: 620px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterWrapper = styled.div``;

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

export const FilterInput = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
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

export const BtnArrow = styled.img``;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReviewTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  color: #000000;
  margin-bottom: 60px;
`;

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

export const ReviewContents = styled.div``;

export const ReviewCard = styled.div`
  width: 335px;
  height: 453px;
  background: #ffffff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReviewImg = styled.img`
  width: 335px;
  height: 200px;
  margin-bottom: 20px;
`;

export const ReviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 295px;
  margin-bottom: 14px;
`;

export const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 102px;
`;

export const CountryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 3px;
`;

export const ReviewInfoTxt = styled.div`
  font-weight: 300;
  font-size: 10px;
  line-height: 1;
  color: #666666;
`;

export const ReviewCity = styled.div`
  margin-top: 7px;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  color: #000000;
`;

export const ReviewInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewDateTxt = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewDateLine = styled.div`
  width: 4px;
  height: 0.7px;
  background-color: #666666;
  margin: 0px 4px;
`;

export const ReviewHashTagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 295px;
  margin-bottom: 8px;
`;

export const ReviewHashTag = styled.button`
  height: 20px;
  padding: 0px 8px;
  margin-right: 8px;
  background: #00b4d8;
  border-radius: 30px;

  font-weight: 500;
  font-size: 10px;
  color: #ffffff;
`;

export const ReviewLine = styled.div`
  width: 295px;
  height: 1px;
  background-color: #d6d6d6;
  margin-bottom: 8px;
`;

export const ReviewCardContents = styled.div`
  width: 295px;
  height: 60px;
  margin-bottom: 45px;

  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color: #333333;
`;

export const ReviewCardFooter = styled.div`
  width: 295px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewReactWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewReactIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 4px;
`;

export const ReviewReactTxt = styled.div`
  width: 25px;
  margin-right: 15px;

  font-weight: 400;
  font-size: 10px;
  line-height: 1;
  color: #666666;
`;

export const ReviewDetailBtn = styled.button`
  width: 62px;
  height: 24px;
  background: #9ab3f5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReviewDetailBtnTxt = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  color: #ffffff;
`;
