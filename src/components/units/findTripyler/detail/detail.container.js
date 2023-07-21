import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import * as S from "./detail.style";
import { useRouter } from "next/router";

export default function FindTripylerDetail() {
  const router = useRouter();
  const { detail } = router.query;

  const onClickApplyBtn = () => {
    router.push(`/findTripyler/${detail}/apply`);
  };

  const onClickEditBtn = () => {
    router.push(`/findTripyler/${detail}/edit`);
  };

  return (
    <>
      <FindTripylerBanner />
      <S.ContentsLoc>
        <S.LocIcon src="/icon/loc_white.svg" />
        <S.LocTxt>그리스, 산토리니</S.LocTxt>
      </S.ContentsLoc>
      <S.Contents>
        <S.ContentsImgWrapper>
          <S.ContentsImg src="/img/Santorini.png" />
        </S.ContentsImgWrapper>
        <S.ContentsTopWrapper>
          <S.ContentsTitle>
            3박 4일 산토리니 여행 동행 구합니다.
          </S.ContentsTitle>
          <S.ContentsDate>2023.2.15</S.ContentsDate>
        </S.ContentsTopWrapper>
        <S.ContentsMidTopWrapper>
          <S.MidTopLeftWrapper>
            <S.UserImgWrapper>
              <S.UserImg src="/icon/defaultProfile.png" />
            </S.UserImgWrapper>
            <S.UserTxtWrapper>
              <S.UserID>ilta0101</S.UserID>
              <S.UserInfo>20대 초반 여성</S.UserInfo>
            </S.UserTxtWrapper>
            <S.UserStyleWrapper>
              <S.UserStyle>#뚜벅이</S.UserStyle>
              <S.UserStyle>#관광지</S.UserStyle>
              <S.UserStyle>#사진찍기</S.UserStyle>
            </S.UserStyleWrapper>
          </S.MidTopLeftWrapper>
          <S.MidTopRightWrapper>
            <S.ContentsInfoWrapper style={{ marginBottom: "40px" }}>
              <S.ContentsInfoIcon src="/icon/user.png" />
              <S.ContentsInfoTxt>2인 모집 중 / 총 4인</S.ContentsInfoTxt>
            </S.ContentsInfoWrapper>
            <S.ContentsInfoWrapper>
              <S.ContentsInfoIcon src="/icon/calendar.png" />
              <S.ContentsInfoTxt>23.01.12-23.01.24</S.ContentsInfoTxt>
            </S.ContentsInfoWrapper>
          </S.MidTopRightWrapper>
        </S.ContentsMidTopWrapper>
        <S.ContentsMidBtmWrapper>
          <S.MidBtmTitle>이런 여행 스타일인 분을 선호해요</S.MidBtmTitle>
          <S.MidBtmStyleWrapper>
            <S.MidBtmStyle>#떠돌이</S.MidBtmStyle>
            <S.MidBtmStyle>#떠돌이</S.MidBtmStyle>
          </S.MidBtmStyleWrapper>
          <S.MidBtmTitle>이런 여행을 하고 싶어요</S.MidBtmTitle>
          <S.MidBtmBodyTxt>
            저는 20대 여성으로서 프랑스 파리 여행을 계획 중이며, 함께 여행
            동행자를 찾고자 합니다. <br /> <br />
            여행 기간은 5일로 계획 중이며, 예정된 일정에는 다양한 활동과 관광지
            방문이 포함됩니다. <br /> <br />
            물론, 일정에는 유연성을 가지고 여유로운 시간을 확보하여 개별적인
            관심사나 소망을 충족시킬 수 있는 여행을 만들어 갈 것입니다.
          </S.MidBtmBodyTxt>
        </S.ContentsMidBtmWrapper>
        <S.ContentsBtmWrapper>
          <S.BtmLeftWrapper>
            <S.BtmIcon src="/icon/heart.png" />
            <S.BtmTxt>1.2k</S.BtmTxt>
            <S.BtmIcon src="/icon/comment.png" />
            <S.BtmTxt>23</S.BtmTxt>
            <S.BtmIcon src="/icon/view.svg" />
            <S.BtmTxt>1200</S.BtmTxt>
          </S.BtmLeftWrapper>
          <S.ApplyBtn>
            <S.ApplyBtnTxt onClick={onClickApplyBtn}>동행 신청</S.ApplyBtnTxt>
            <S.ApplyBtnIcon src="/icon/arrow.png" />
          </S.ApplyBtn>
        </S.ContentsBtmWrapper>
      </S.Contents>
      <S.PostList>
        <S.PostListTitle>목록</S.PostListTitle>
        <S.ListWrapper>
          <S.ListIcon />
          <S.ListTitle>이전 게시물</S.ListTitle>
          <S.PostTitle>10박 11일 프랑스 파리 여행 동행 모집합니다.</S.PostTitle>
        </S.ListWrapper>
        <S.ListWrapper
          style={{ borderBottom: "1px solid rgba(214, 214, 214, 0.60)" }}
        >
          <S.ListIcon style={{ transform: "rotate(180deg)" }} />
          <S.ListTitle>다음 게시물</S.ListTitle>
          <S.PostTitle>5박 6일 방콕 여행 동행 모집합니다.</S.PostTitle>
        </S.ListWrapper>
      </S.PostList>
      <S.RcmPost>
        <S.RcmPostTitle>추천 게시물</S.RcmPostTitle>
        <S.RcmPostItems>
          <S.RcmPostItem></S.RcmPostItem>
        </S.RcmPostItems>
      </S.RcmPost>
    </>
  );
}
