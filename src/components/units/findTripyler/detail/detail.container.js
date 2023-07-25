import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import * as S from "./detail.style";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FindTripylerDetail() {
  const router = useRouter();
  const apiPath = "https://api.tripyle.xyz";
  const { tripylerId } = router.query;

  const [data, setData] = useState({
    tripylerId: 0,
    title: "",
    content: "",
    regDateTime: "", // 게시물 작성일자
    image: "",
    nationName: "",
    regionName: "",
    startDate: "",
    endDate: "",
    totalPeopleNum: 0,
    recruitPeopleNum: 0,
    profileUrl: "",
    nickname: "",
    age: 0,
    gender: "",
    hashtag1: "",
    hashtag2: "",
    hashtag3: "",
    hashtag4: "",
    hashtag5: "",
    // hits: 0,
    likes: 0,
  });
  const [hashtag, setHashtag] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [cmtLen, setCmtLen] = useState(5);

  const onClickApplyBtn = () => {
    router.push(`/findTripyler/${tripylerId}/apply`);
  };

  const onClickEditBtn = () => {
    router.push(`/findTripyler/${tripylerId}/edit`);
  };

  const formatUserInfo = (age, gender) => {
    const formatAge = age >= 10 ? `${age.toString().slice(0, 1)}0대` : "아동";
    const formatGender = gender === "M" ? "남성" : "여성";
    return formatAge + " " + formatGender;
  };

  // 데이터 불러오기
  const fetchData = async () => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    await axios
      .get(`${apiPath}/tripyler/${tripylerId}`)
      .then((res) => {
        const data = res.data.data;
        console.log(res);
        setData({ ...data });
        setHashtag([
          data.hashtag1,
          data.hashtag2,
          data.hashtag3,
          data.hashtag4,
          data.hashtag5,
        ]);
      })
      .catch((error) => console.error(error));
  };

  // 댓글 기능
  const fetchComment = async () => {
    axios
      .get(`${apiPath}/tripyler/${tripylerId}/comment/list`)
      .then((res) => {
        console.log(res);
        setCommentData([...res.data.data]);
      })
      .catch((error) => console.error(error));
  };

  const onClickMoreCmt = () => {
    if (commentData.length > cmtLen) setCmtLen((prev) => prev + 5);
  };

  const onSubmitCmt = async (event) => {
    event.preventDefault();

    await axios
      .post(`${apiPath}/tripyler/comment`, {
        content: event.target.comment.value,
        tripylerId,
      })
      .then((res) => {
        fetchComment();
      })
      .catch((err) => console.error(err));
    console.log(event.target.comment.value);
    event.target.reset();
  };

  // 좋아요 기능
  const onClickLike = async () => {
    await axios
      .post(apiPath + "/tripyler/like", {
        tripylerId,
      })
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    tripylerId && fetchData();
    tripylerId && fetchComment();
  }, [tripylerId]);

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
              <S.UserImg src={data.profileUrl || "icon/defaultProfile.png"} style={{'cursor': 'pointer'}} onClick={(e) => router.push({pathname: "/auth/profile", query: {userId: data.userId, user: false}})}/>
            </S.UserImgWrapper>
            <S.UserTxtWrapper>
              <S.UserID  style={{'cursor': 'pointer'}} onClick={(e) => router.push({pathname: "/auth/profile", query: {userId: data.userId, user: false}})}>{data.nickname}</S.UserID>
              <S.UserInfo>{formatUserInfo(data.age, data.gender)}</S.UserInfo>
            </S.UserTxtWrapper>
          </S.MidTopLeftWrapper>
          <S.MidTopRightWrapper>
            <S.ContentsInfoWrapper style={{ marginBottom: "40px" }}>
              <S.ContentsInfoIcon src="/icon/user.png"/>
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
