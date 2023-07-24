export default function TriplogDetail() {
  return (
    <>
      <FindTripylerBanner
        title="Trip'yler 찾기"
        subTitle="함께 하고 싶은 여행자를 Trip’yle에서 바로 찾아보세요"
      />
      <S.ContentsLoc>
        <S.LocIcon src="/icon/loc_white.svg" />
        <S.LocTxt>
          {data.nationName}, {data.regionName}
        </S.LocTxt>
      </S.ContentsLoc>
      <S.Contents>
        <S.ContentsImgWrapper>
          <S.ContentsImg src={data.image} />
        </S.ContentsImgWrapper>
        <S.ContentsTopWrapper>
          <S.ContentsTitle>{data.title}</S.ContentsTitle>
          <S.ContentsDate>{data.regDateTime.slice(0, 10)}</S.ContentsDate>
        </S.ContentsTopWrapper>
        <S.ContentsMidTopWrapper>
          <S.MidTopLeftWrapper>
            <S.UserImgWrapper>
              <S.UserImg src={data.profileUrl || "icon/defaultProfile.png"} />
            </S.UserImgWrapper>
            <S.UserTxtWrapper>
              <S.UserID>{data.nickname}</S.UserID>
              <S.UserInfo>{formatUserInfo(data.age, data.gender)}</S.UserInfo>
            </S.UserTxtWrapper>
          </S.MidTopLeftWrapper>
          <S.MidTopRightWrapper>
            <S.ContentsInfoWrapper style={{ marginBottom: "40px" }}>
              <S.ContentsInfoIcon src="/icon/user.png" />
              <S.ContentsInfoTxt>
                {data.totalPeopleNum - data.recruitPeopleNum - 1}인 모집 중 / 총{" "}
                {data.totalPeopleNum}인
              </S.ContentsInfoTxt>
            </S.ContentsInfoWrapper>
            <S.ContentsInfoWrapper>
              <S.ContentsInfoIcon src="/icon/calendar.png" />
              <S.ContentsInfoTxt>
                {data.startDate} ~ {data.endDate}
              </S.ContentsInfoTxt>
            </S.ContentsInfoWrapper>
          </S.MidTopRightWrapper>
        </S.ContentsMidTopWrapper>
        <S.ContentsMidBtmWrapper>
          <S.MidBtmTitle>이런 여행 스타일인 분을 선호해요</S.MidBtmTitle>
          <S.MidBtmStyleWrapper>
            {hashtag
              .filter((el) => el)
              .map((el) => (
                <S.MidBtmStyle key={el}>#{el}</S.MidBtmStyle>
              ))}
          </S.MidBtmStyleWrapper>
          <S.MidBtmTitle>이런 여행을 하고 싶어요</S.MidBtmTitle>
          <S.MidBtmBodyTxt>{data.content}</S.MidBtmBodyTxt>
        </S.ContentsMidBtmWrapper>
        <S.ContentsBtmWrapper>
          <S.BtmLeftWrapper>
            <S.BtmIcon src="/icon/heart.png" onClick={onClickLike} />
            <S.BtmTxt>좋아요 {data.likes}개</S.BtmTxt>
          </S.BtmLeftWrapper>
          <S.ApplyBtn>
            <S.ApplyBtnTxt onClick={onClickApplyBtn}>동행 신청</S.ApplyBtnTxt>
            <S.ApplyBtnIcon src="/icon/arrow.png" />
          </S.ApplyBtn>
        </S.ContentsBtmWrapper>
      </S.Contents>
      <S.PostList>
        <S.PostListTitle>댓글</S.PostListTitle>
        <S.CmtListWrapper>
          {commentData
            .filter((el, index) => index < cmtLen)
            .map((el) => (
              <S.CmtList>
                <S.ListTitle>{el.nickname}</S.ListTitle>
                <S.CmtContents>{el.content}</S.CmtContents>
              </S.CmtList>
            ))}
        </S.CmtListWrapper>
        {commentData.length > cmtLen && (
          <S.CmtMoreBtn onClick={onClickMoreCmt}>
            <S.CommetnMoreBtnTxt>댓글 더보기</S.CommetnMoreBtnTxt>
            <S.CommetnMoreBtnIcon src="/icon/moreBtn.svg" />
          </S.CmtMoreBtn>
        )}
        <S.CmtWriteWrapper onSubmit={onSubmitCmt}>
          <S.ListTitle>댓글 작성하기</S.ListTitle>
          <S.CmtInput
            placeholder="직접 댓글을 작성해보세요"
            name="comment"
            autoComplete="off"
          />
          <S.CmtWriteBtn>작성</S.CmtWriteBtn>
        </S.CmtWriteWrapper>
      </S.PostList>
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
