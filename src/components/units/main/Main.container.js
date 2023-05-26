import { useState } from "react";
import * as S from "./Main.styles";
import { useRecoilState } from "recoil";
import { LoginState } from '@/States/LoginState';

export default function Main() {
  const [selectedFilter, setSelectedFilter] = useState("centralAsia");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const onClicRreviewFilter = (event) => {
    setSelectedFilter(event.target.id);
  };

  const onClcickFilterFind = () => {
    alert("리스트 페이지 이동");
    setIsLoggedIn(false);
  };

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
          <S.FilterWrapper>
            <S.FilterTitleWrapper>
              <S.FilterTitleImg src="icon/location.png"></S.FilterTitleImg>
              <S.FilterTitleTxt>여행지</S.FilterTitleTxt>
            </S.FilterTitleWrapper>
            <S.Filter style={{ width: "280px" }}>
              <S.FilterInput>한국, 서울</S.FilterInput>
              <S.FilterBtn></S.FilterBtn>
            </S.Filter>
          </S.FilterWrapper>
          <S.FilterWrapper>
            <S.FilterTitleWrapper>
              <S.FilterTitleImg src="icon/calendar.png"></S.FilterTitleImg>
              <S.FilterTitleTxt>일정</S.FilterTitleTxt>
            </S.FilterTitleWrapper>
            <S.DateFilterWrapper>
              <S.Filter style={{ width: "200px" }}>
                <S.FilterInput>가는 날</S.FilterInput>
                <S.FilterBtn></S.FilterBtn>
              </S.Filter>
              <S.DateLine></S.DateLine>
              <S.Filter style={{ width: "200px" }}>
                <S.FilterInput>오는 날</S.FilterInput>
                <S.FilterBtn></S.FilterBtn>
              </S.Filter>
            </S.DateFilterWrapper>
          </S.FilterWrapper>
          <S.FilterWrapper>
            <S.FilterTitleWrapper>
              <S.FilterTitleImg src="icon/user.png"></S.FilterTitleImg>
              <S.FilterTitleTxt>인원</S.FilterTitleTxt>
            </S.FilterTitleWrapper>
            <S.Filter style={{ width: "140px" }}>
              <S.FilterInput>4명</S.FilterInput>
              <S.FilterBtn></S.FilterBtn>
            </S.Filter>
          </S.FilterWrapper>
          <S.FilterFindBtn onClick={onClcickFilterFind}>
            <S.FilterFindBtnTxt>여행자 찾기</S.FilterFindBtnTxt>
            <S.BtnArrow src="icon/arrow.png"></S.BtnArrow>
          </S.FilterFindBtn>
        </S.FindFilter>
      </S.Banner>

      <S.Review>
        <S.ReviewTitle>Trip’yler들의 실제 여행 후기</S.ReviewTitle>
        <S.ReviewFilter>
          <S.ReviewFilterBtn
            id="centralAsia"
            onClick={onClicRreviewFilter}
            selectedFilter={selectedFilter}
          >
            중앙아시아
          </S.ReviewFilterBtn>
          <S.ReviewFilterBtn
            id="westAsia"
            onClick={onClicRreviewFilter}
            selectedFilter={selectedFilter}
          >
            서남아시아
          </S.ReviewFilterBtn>
          <S.ReviewFilterBtn
            id="eastAsia"
            onClick={onClicRreviewFilter}
            selectedFilter={selectedFilter}
          >
            동남아시아
          </S.ReviewFilterBtn>
          <S.ReviewFilterBtn
            id="europe"
            onClick={onClicRreviewFilter}
            selectedFilter={selectedFilter}
          >
            유럽
          </S.ReviewFilterBtn>
          <S.ReviewFilterBtn
            id="northAme"
            onClick={onClicRreviewFilter}
            selectedFilter={selectedFilter}
          >
            북아메리카
          </S.ReviewFilterBtn>
          <S.ReviewFilterBtn
            id="southAme"
            onClick={onClicRreviewFilter}
            selectedFilter={selectedFilter}
          >
            남아메리카
          </S.ReviewFilterBtn>
        </S.ReviewFilter>
        <S.ReviewContents>
          <S.ReviewCard>
            <S.ReviewImg src="img/review1.png"></S.ReviewImg>
            <S.ReviewCardHeader>
              <S.ReviewInfo>
                <S.CountryWrapper>
                  <S.ReviewIcon src="icon/location.png"></S.ReviewIcon>
                  <S.ReviewInfoTxt>그리스</S.ReviewInfoTxt>
                </S.CountryWrapper>
                <S.ReviewCity>산토리니</S.ReviewCity>
              </S.ReviewInfo>
              <S.ReviewInfo>
                <S.ReviewInfoWrapper style={{ "margin-bottom": "5px" }}>
                  <S.ReviewIcon src="icon/calendar.png"></S.ReviewIcon>
                  <S.ReviewDateTxt>
                    <S.ReviewInfoTxt>23.01.12</S.ReviewInfoTxt>
                    <S.ReviewDateLine></S.ReviewDateLine>
                    <S.ReviewInfoTxt>23.01.23</S.ReviewInfoTxt>
                  </S.ReviewDateTxt>
                </S.ReviewInfoWrapper>
                <S.ReviewInfoWrapper>
                  <S.ReviewIcon src="icon/user.png"></S.ReviewIcon>
                  <S.ReviewInfoTxt>4인</S.ReviewInfoTxt>
                </S.ReviewInfoWrapper>
              </S.ReviewInfo>
            </S.ReviewCardHeader>
            <S.ReviewHashTagWrapper>
              <S.ReviewHashTag>#해시태그</S.ReviewHashTag>
              <S.ReviewHashTag>#해시태그</S.ReviewHashTag>
              <S.ReviewHashTag>#해시태그</S.ReviewHashTag>
            </S.ReviewHashTagWrapper>
            <S.ReviewLine></S.ReviewLine>
            <S.ReviewCardContents>
              나중에 상세 페이지 만들어지고 api도 구현되면은 그때 마저 넣을게요
            </S.ReviewCardContents>
            <S.ReviewCardFooter>
              <S.ReviewReactWrapper>
                <S.ReviewReactIcon src="icon/heart.png"></S.ReviewReactIcon>
                <S.ReviewReactTxt>1.2k</S.ReviewReactTxt>
                <S.ReviewReactIcon src="icon/comment.png"></S.ReviewReactIcon>
                <S.ReviewReactTxt>24</S.ReviewReactTxt>
              </S.ReviewReactWrapper>
              <S.ReviewDetailBtn>
                <S.ReviewDetailBtnTxt>상세보기</S.ReviewDetailBtnTxt>
                <S.BtnArrow></S.BtnArrow>
              </S.ReviewDetailBtn>
            </S.ReviewCardFooter>
          </S.ReviewCard>
        </S.ReviewContents>
      </S.Review>
    </>
  );
}
