import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

import Axios from "@/apis";
import { TripylerFormProps } from "@/interfaces/detail";
import { userInfoFormat } from "@/utils/format";

import { IoLocationOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { IoMdHeart, IoMdHeartEmpty, IoIosList } from "react-icons/io";
import WithList from "./WithList";

export default function TripylerForm({ data, fetchData }: TripylerFormProps) {
  const router = useRouter();
  const { tripylerId } = router.query;

  const [isOpenWithTripList, setIsOpenWithTripList] = useState(false);

  const onClickApplyBtn = () => {
    router.push(`/findTripyler/${tripylerId}/apply`);
  };

  const onClickEditBtn = () => {
    router.push(`/findTripyler/${tripylerId}/edit`);
  };

  // 동행자 프로필
  const onClickWithTrip = () => {
    setIsOpenWithTripList((prev) => !prev);
  };

  // 프로필 이동
  const checkUser = async () => {
    if (data.myTripyler) {
      router.push("/auth/profile");
    } else {
      router.push({
        pathname: "/auth/profile",
        query: { userId: data.userId },
      });
    }
  };

  // 좋아요 기능
  const onClickLike = async () => {
    await Axios.post("/tripyler/like", {
      tripylerId,
    })
      .then(() => {
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <PostTitleWrapper>
        <PostTitle>{data?.title}</PostTitle>
        <PostTitleInfoWrapper>
          <PostTitleInfo>{data?.regDateTime?.slice(0, 10)}</PostTitleInfo>
          <PostTitleInfo>|</PostTitleInfo>
          <PostTitleInfo>조회 수 {data?.hits}</PostTitleInfo>
        </PostTitleInfoWrapper>
      </PostTitleWrapper>

      <ContentsLoc>
        <ContentsLocLeft>
          <IoLocationOutline style={{ color: "#6179B6", fontSize: "25px" }} />
          <LocTxt>
            {data?.nationName}, {data?.regionName}
          </LocTxt>
        </ContentsLocLeft>
        <ApplyBtn onClick={data?.myTripyler ? onClickEditBtn : onClickApplyBtn}>
          {data?.myTripyler ? "수정하기" : "동행 신청"}
        </ApplyBtn>
      </ContentsLoc>

      <Contents>
        <ContentsTopWrapper>
          <MidTopLeftWrapper>
            <UserImgWrapper>
              <UserImg
                src={data?.profileUrl || "/icon/defaultProfile.png"}
                style={{ cursor: "pointer" }}
                onClick={checkUser}
              />
            </UserImgWrapper>
            <UserTxtWrapper>
              <UserID style={{ cursor: "pointer" }} onClick={checkUser}>
                {data?.nickname}
              </UserID>
              <UserInfo>{userInfoFormat(data?.age, data?.gender)}</UserInfo>
            </UserTxtWrapper>
          </MidTopLeftWrapper>

          <TripylerInfoWrapper>
            <ContentsInfoWrapper>
              <GoPerson />
              <ContentsInfoTxt>
                <b>{data?.totalPeopleNum - data?.recruitPeopleNum - 1}인</b>{" "}
                모집 중 / 총 {data?.totalPeopleNum}인
              </ContentsInfoTxt>
            </ContentsInfoWrapper>

            <ContentsInfoWrapper>
              <CiCalendar />
              <ContentsInfoTxt>
                {data?.startDate} ~ {data?.endDate}
              </ContentsInfoTxt>
            </ContentsInfoWrapper>
          </TripylerInfoWrapper>
        </ContentsTopWrapper>

        <Line />

        <ContentsMidTopWrapper>
          <div>
            <MidBtmTitle>이번 여행의 스타일</MidBtmTitle>
            <MidBtmStyleWrapper>
              {data?.hashtagList?.map((el) => (
                <MidBtmStyle key={el.id}>#{el.name}</MidBtmStyle>
              ))}
            </MidBtmStyleWrapper>
          </div>
          <WithList withList={data?.tripylerWithList} />
        </ContentsMidTopWrapper>

        <ContentsMidBtmWrapper>
          <MidBtmTitle>이런 여행을 하고 싶어요</MidBtmTitle>
          <MidBtmBodyTxt>{data?.content}</MidBtmBodyTxt>
        </ContentsMidBtmWrapper>

        <ContentsBtmWrapper>
          <BtmLeftWrapper>
            {data?.tokenUserLiked ? (
              <IoMdHeartEmpty
                style={{
                  color: "rgba(255, 0, 0, 1)",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
                onClick={onClickLike}
              />
            ) : (
              <IoMdHeart
                style={{
                  color: "rgba(255, 0, 0, 1)",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
                onClick={onClickLike}
              />
            )}
            <BtmTxt>좋아요 {data?.likes}개</BtmTxt>
          </BtmLeftWrapper>

          <ListBtn
            onClick={() => {
              router.push("/findTripyler");
            }}
          >
            <IoIosList />
            목록
          </ListBtn>
        </ContentsBtmWrapper>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const PostTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  border-radius: 5px;
  background: #6179b6;
`;

const PostTitle = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 500;
`;

const PostTitleInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PostTitleInfo = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const ContentsLoc = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentsLocLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LocTxt = styled.div`
  color: #6179b6;
  font-size: 25px;
  font-weight: 700;
`;

const ApplyBtn = styled.button`
  padding: 10px 50px;
  border-radius: 5px;
  background: #9ab3f5;

  color: #fff;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const Contents = styled.div`
  width: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 0.5px solid #6179b6;
  background: #fff;
`;

const ContentsTopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #999;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const MidTopLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const UserTxtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserID = styled.div`
  color: #666;
  font-size: 20px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const TripylerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentsInfoTxt = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const ContentsMidTopWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 65px;
`;

const ContentsMidBtmWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const MidBtmTitle = styled.div`
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const MidBtmStyleWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const MidBtmStyle = styled.div`
  padding: 4px 12px;
  border-radius: 10px;
  border: 1px solid #999;

  color: #999;
  font-size: 16px;
  font-weight: 400;
`;

const MidBtmBodyTxt = styled.div`
  width: 100%;
  min-height: 300px;
  margin: auto;
  padding: 40px 20px;
  border-radius: 10px;
  background: #f9fbff;
  white-space: normal;

  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const ContentsBtmWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtmLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BtmTxt = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 400;
`;

const ListBtn = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #999;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: #666;
  font-size: 16px;
  font-weight: 700;
`;
