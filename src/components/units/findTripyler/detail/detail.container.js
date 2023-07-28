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
    tokenUserLiked: false,
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
    likes: 0,
    nextTitle: "",
    nextTripylerId: 0,
    previousTitle: "",
    previousTripylerId: 0,
    myTripyler: false,
  });
  const [hashtag, setHashtag] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [cmtLen, setCmtLen] = useState(5);
  const [applyList, setApplyList] = useState([]);
  const [isOpenApplyList, setIsOpenApplyList] = useState(false);
  const [isOpenWithTripList, setIsOpenWithTripList] = useState(false);

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

  // 프로필 이동
  const checkUser = async () => {
    if(data.myTripyler){
      router.push("/auth/profile");
    } else{
      router.push({pathname: "/auth/profile", query: {userId: data.userId}})
    }
  }

  const checkApplyUser = async (e) => {
    console.log(e.target.id);
    router.push({pathname: "/auth/profile", query: {userId: parseInt(e.target.id)}})
  }

  // 동행 신청자 리스트
  const fetchList = async () => {
    await axios
      .get(apiPath + "/tripyler/apply")
      .then((res) => {
        console.log(res);
        const { [tripylerId]: selectedValue } = res.data.data;
        setApplyList([...selectedValue]);
      })
      .catch((err) => console.error(err));
  };

  const onClickMoreApply = () => {
    console.log(applyList);
    setIsOpenApplyList((prev) => !prev);
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
    if (tripylerId) {
      fetchData();
      fetchComment();
      fetchList();
    }
  }, [tripylerId]);

  // 이전, 다음게시물 이동 기능
  const onClickPrevPost = () => {
    router.push(`/findTripyler/${data.previousTripylerId}`);
  };

  const onClickNextPost = () => {
    router.push(`/findTripyler/${data.nextTripylerId}`);
  };

  // 동행자 프로필
  const onClickWithTrip = () => {
    setIsOpenWithTripList((prev) => !prev);
  };

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
              <S.UserImg src={data.profileUrl || "icon/defaultProfile.png"} style={{'cursor': 'pointer'}} onClick={checkUser}/>
            </S.UserImgWrapper>
            <S.UserTxtWrapper>
              <S.UserID  style={{'cursor': 'pointer'}} onClick={checkUser}>{data.nickname}</S.UserID>
              <S.UserInfo>{formatUserInfo(data.age, data.gender)}</S.UserInfo>
            </S.UserTxtWrapper>
          </S.MidTopLeftWrapper>

          <S.MidTopRightWrapper>
            <S.WithTripylerWrapper>
              <S.WithTripTitle>동행 Trip’yler (6명)</S.WithTripTitle>
              <S.WithTripProfileList>
                <S.WithTripProfileWrapper>
                  <S.WithTripProfile src="/img/applyListImg.png" />
                </S.WithTripProfileWrapper>
                <S.WithTripProfileWrapper style={{ left: "35px" }}>
                  <S.WithTripProfile src="/img/hooni.jpeg" />
                </S.WithTripProfileWrapper>
                <S.WithTripProfileWrapper style={{ left: "70px" }}>
                  <S.WithTripProfile src="/img/shinchan.jpg" />
                </S.WithTripProfileWrapper>
                <S.WithTripProfileWrapper style={{ left: "105px" }}>
                  <S.WithTripProfile src="/img/cheolsoo.jpg" />
                </S.WithTripProfileWrapper>
                <S.WithTripMoreBox onClick={onClickWithTrip}>
                  +2
                </S.WithTripMoreBox>
              </S.WithTripProfileList>
              {isOpenWithTripList && (
                <S.WithTripList>
                  <S.WithTripListTitle>Trip’yler 리스트</S.WithTripListTitle>
                  <S.WithTripListWrapper>
                    <S.WithTripListItem>
                      <S.WithTripListProfile>
                        <S.UserImg src="/img/applyListImg.png" />
                      </S.WithTripListProfile>
                      <S.WithTripListID>ilta0101</S.WithTripListID>
                    </S.WithTripListItem>
                    <S.WithTripListItem>
                      <S.WithTripListProfile>
                        <S.UserImg src="/img/applyListImg.png" />
                      </S.WithTripListProfile>
                      <S.WithTripListID>ilta0101</S.WithTripListID>
                    </S.WithTripListItem>
                    <S.WithTripListItem>
                      <S.WithTripListProfile>
                        <S.UserImg src="/img/applyListImg.png" />
                      </S.WithTripListProfile>
                      <S.WithTripListID>ilta0101</S.WithTripListID>
                    </S.WithTripListItem>
                    <S.WithTripListItem>
                      <S.WithTripListProfile>
                        <S.UserImg src="/img/applyListImg.png" />
                      </S.WithTripListProfile>
                      <S.WithTripListID>ilta0101</S.WithTripListID>
                    </S.WithTripListItem>
                    <S.WithTripListItem>
                      <S.WithTripListProfile>
                        <S.UserImg src="/img/applyListImg.png" />
                      </S.WithTripListProfile>
                      <S.WithTripListID>ilta0101</S.WithTripListID>
                    </S.WithTripListItem>
                    <S.WithTripListItem>
                      <S.WithTripListProfile>
                        <S.UserImg src="/img/applyListImg.png" />
                      </S.WithTripListProfile>
                      <S.WithTripListID>ilta0101</S.WithTripListID>
                    </S.WithTripListItem>
                  </S.WithTripListWrapper>
                </S.WithTripList>
              )}
            </S.WithTripylerWrapper>
            <S.TripylerInfoWrapper>
              <S.ContentsInfoWrapper>
                <S.ContentsInfoIcon src="/icon/user.png" />
                <S.ContentsInfoTxt>
                  {data.totalPeopleNum - data.recruitPeopleNum - 1}인 모집 중 /
                  총 {data.totalPeopleNum}인
                </S.ContentsInfoTxt>
              </S.ContentsInfoWrapper>
              <S.ContentsInfoWrapper>
                <S.ContentsInfoIcon src="/icon/calendar.png" />
                <S.ContentsInfoTxt>
                  {data.startDate} ~ {data.endDate}
                </S.ContentsInfoTxt>
              </S.ContentsInfoWrapper>
              <S.ContentsInfoWrapper>
                <S.ContentsInfoIcon src="/icon/money.svg" />
                <S.ContentsInfoTxt>약 700,000원</S.ContentsInfoTxt>
              </S.ContentsInfoWrapper>
            </S.TripylerInfoWrapper>
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
            <S.BtmIcon
              src={data.tokenUserLiked ? "/icon/like.png" : "/icon/heart.png"}
              onClick={onClickLike}
            />
            <S.BtmTxt>좋아요 {data.likes}개</S.BtmTxt>
          </S.BtmLeftWrapper>
          <S.ApplyBtn
            onClick={data.myTripyler ? onClickEditBtn : onClickApplyBtn}
          >
            {data.myTripyler ? "수정하기" : "동행 신청"}
          </S.ApplyBtn>
        </S.ContentsBtmWrapper>
      </S.Contents>

      {data.myTripyler && (
        <S.PostList>
          <S.PostListTitleWrapper>
            <S.PostListTitle>동행 신청자</S.PostListTitle>
            <S.PostListCnt>{applyList.length}명</S.PostListCnt>
          </S.PostListTitleWrapper>
          <S.ApplyList>
            {isOpenApplyList
              ? applyList.map((el) => (
                  <S.ApplyItem key={el.applicantId}>
                    <S.ApplyProfileWrapper>
                      <S.UserImg
                        src={el.profileUrl || "/icon/defaultProfile.png"}
                      />
                    </S.ApplyProfileWrapper>
                    <S.ApplyID
                      id={el.applicantId}
                      onClick={checkApplyUser}>{el.nickname}</S.ApplyID>
                    <S.ViewApplyBtn
                      onClick={() =>
                        router.push(
                          `/findTripyler/${tripylerId}/${el.applicantId}`
                        )
                      }
                    >
                      신청폼 보기
                    </S.ViewApplyBtn>
                  </S.ApplyItem>
                ))
              : applyList
                  .filter((el, index) => index < 6)
                  .map((el) => (
                    <S.ApplyItem key={el.applicantId}>
                      <S.ApplyProfileWrapper>
                        <S.UserImg
                          src={el.profileUrl || "/icon/defaultProfile.png"}
                        />
                      </S.ApplyProfileWrapper>
                      <S.ApplyID>{el.nickname}</S.ApplyID>
                      <S.ViewApplyBtn
                        onClick={() =>
                          router.push(
                            `/findTripyler/${tripylerId}/${el.applicantId}`
                          )
                        }
                      >
                        신청폼 보기
                      </S.ViewApplyBtn>
                    </S.ApplyItem>
                  ))}
          </S.ApplyList>
          {applyList.length > 6 && (
            <S.MoreBtn onClick={onClickMoreApply}>
              <S.MoreBtnTxt>
                {isOpenApplyList ? "닫기" : "전체보기"}
              </S.MoreBtnTxt>
              <S.MoreBtnIcon src="/icon/moreBtn.svg" isOpen={isOpenApplyList} />
            </S.MoreBtn>
          )}
        </S.PostList>
      )}

      <S.PostList>
        <S.PostListTitleWrapper>
          <S.PostListTitle>댓글</S.PostListTitle>
          <S.PostListCnt>{commentData.length}개</S.PostListCnt>
        </S.PostListTitleWrapper>
        {commentData.length > 0 ? (
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
        ) : (
          <S.NoCmtWrapper>
            <S.NoCmtIcon src="/icon/noCmt.png"/>
            <S.NoCmtTxt>첫 댓글을 작성해보세요</S.NoCmtTxt>
          </S.NoCmtWrapper>
        )}
        {commentData.length > cmtLen && (
          <S.MoreBtn onClick={onClickMoreCmt}>
            <S.MoreBtnTxt>댓글 더보기</S.MoreBtnTxt>
            <S.MoreBtnIcon src="/icon/moreBtn.svg" />
          </S.MoreBtn>
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
        <S.PostListTitle style={{ marginBottom: "30px" }}>목록</S.PostListTitle>
        <S.ListWrapper>
          <S.ListIcon />
          <S.ListTitle>이전 게시물</S.ListTitle>
          <S.PostTitle onClick={onClickPrevPost}>
            {data.previousTitle}
          </S.PostTitle>
        </S.ListWrapper>
        <S.ListWrapper
          style={{ borderBottom: "1px solid rgba(214, 214, 214, 0.60)" }}
        >
          <S.ListIcon style={{ transform: "rotate(180deg)" }} />
          <S.ListTitle>다음 게시물</S.ListTitle>
          <S.PostTitle onClick={onClickNextPost}>{data.nextTitle}</S.PostTitle>
        </S.ListWrapper>
      </S.PostList>
      {/* <S.RcmPost>
        <S.RcmPostTitle>추천 게시물</S.RcmPostTitle>
        <S.RcmPostItems>
          <S.RcmPostItem></S.RcmPostItem>
        </S.RcmPostItems>
      </S.RcmPost> */}
    </>
  );
}
