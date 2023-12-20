import Axios from '@/apis';
import { TripylerDetailFormProps } from "@/interfaces/detail";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export default function TripylerDetailForm({ data, fetchData }: TripylerDetailFormProps) {
  const router = useRouter();
  const { tripylerId } = router.query;

  const [isOpenWithTripList, setIsOpenWithTripList] = useState(false);

  const onClickApplyBtn = () => {
    router.push(`/findTripyler/${tripylerId}/apply`);
  };

  const onClickEditBtn = () => {
    router.push(`/findTripyler/${tripylerId}/edit`);
  };

  const formatUserInfo = (age: number, gender: string) => {
    const formatAge = age >= 10 ? `${age.toString().slice(0, 1)}0대` : "아동";
    const formatGender = gender === "M" ? "남성" : "여성";
    return formatAge + " " + formatGender;
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
      .then((res) => {
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <ContentsLoc>
        <LocIcon src="/icon/loc_white.svg" />
        <LocTxt>
          {data?.nationName}, {data?.regionName}
        </LocTxt>
      </ContentsLoc>

      <Contents>
        <ContentsImgWrapper>
          <ContentsImg src={data?.image || "/img/defaultImg.png"} />
        </ContentsImgWrapper>

        <ContentsTopWrapper>
          <ContentsTopLeftWrapper>
            <ContentsTitle>{data?.title}</ContentsTitle>
            <ContentsDate>{data?.regDateTime?.slice(0, 10)}</ContentsDate>
          </ContentsTopLeftWrapper>
          <ApplyBtn
            onClick={data?.myTripyler ? onClickEditBtn : onClickApplyBtn}
          >
            {data?.myTripyler ? "수정하기" : "동행 신청"}
          </ApplyBtn>
        </ContentsTopWrapper>

        <ContentsMidTopWrapper>
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
              <UserInfo>{formatUserInfo(data?.age, data?.gender)}</UserInfo>
            </UserTxtWrapper>
          </MidTopLeftWrapper>

          <MidTopRightWrapper>
            <WithTripylerWrapper>
              <WithTripTitle>
                동행 Trip’yler ({data?.tripylerWithList?.length}명)
              </WithTripTitle>
              <WithTripProfileList>
                {data?.tripylerWithList
                  ?.filter((el, idx) => idx < 4)
                  .map((el, idx) => (
                    <WithTripProfileWrapper
                      key={el.nickname}
                      style={{ left: `${idx * 35}px` }}
                      onClick={onClickWithTrip}
                    >
                      <WithTripProfile
                        src={el.profileUrl || "/icon/defaultProfile.png"}
                      />
                    </WithTripProfileWrapper>
                  ))}
                {data?.tripylerWithList?.length > 4 && (
                  <WithTripMoreBox onClick={onClickWithTrip}>
                    +{data?.tripylerWithList?.length - 4}
                  </WithTripMoreBox>
                )}
              </WithTripProfileList>

              {isOpenWithTripList && (
                <WithTripList>
                  <WithTripListTitle>Trip’yler 리스트</WithTripListTitle>
                  <WithTripListWrapper>
                    {data?.tripylerWithList?.map((el) => (
                      <WithTripListItem>
                        <WithTripListProfile>
                          <UserImg
                            src={el.profileUrl || "/icon/defaultProfile.png"}
                          />
                        </WithTripListProfile>
                        <WithTripListID>{el.nickname}</WithTripListID>
                      </WithTripListItem>
                    ))}
                  </WithTripListWrapper>
                </WithTripList>
              )}
            </WithTripylerWrapper>
            <TripylerInfoWrapper>
              <ContentsInfoWrapper>
                <ContentsInfoIcon src="/icon/user.png" />
                <ContentsInfoTxt>
                  {data?.totalPeopleNum - data?.recruitPeopleNum - 1}인 모집 중 /
                  총 {data?.totalPeopleNum}인
                </ContentsInfoTxt>
              </ContentsInfoWrapper>
              <ContentsInfoWrapper>
                <ContentsInfoIcon src="/icon/calendar.png" />
                <ContentsInfoTxt>
                  {data?.startDate} ~ {data?.endDate}
                </ContentsInfoTxt>
              </ContentsInfoWrapper>
              <ContentsInfoWrapper>
                <ContentsInfoIcon src="/icon/money.svg" />
                <ContentsInfoTxt>
                  약 {data?.estimatedPrice?.toLocaleString()}원
                </ContentsInfoTxt>
              </ContentsInfoWrapper>
            </TripylerInfoWrapper>
          </MidTopRightWrapper>
        </ContentsMidTopWrapper>
        <ContentsMidBtmWrapper>
          <MidBtmTitle>이런 여행 스타일인 분을 선호해요</MidBtmTitle>
          <MidBtmStyleWrapper>
            {data?.hashtagList?.map((el) => (
              <MidBtmStyle key={el.id}>#{el.name}</MidBtmStyle>
            ))}
          </MidBtmStyleWrapper>
          <MidBtmTitle>이런 여행을 하고 싶어요</MidBtmTitle>
          <MidBtmBodyTxt>{data?.content}</MidBtmBodyTxt>
        </ContentsMidBtmWrapper>
        <ContentsBtmWrapper>
          <BtmLeftWrapper>
            <BtmIcon
              src={data?.tokenUserLiked ? "/icon/like.png" : "/icon/heart.png"}
              onClick={onClickLike}
            />
            <BtmTxt>좋아요 {data?.likes}개</BtmTxt>
          </BtmLeftWrapper>
          <ListBtn
            onClick={() => {
              router.push("/findTripyler");
            }}
          >
            목록보기
          </ListBtn>
        </ContentsBtmWrapper>
      </Contents>
    </>
  );
}

const ContentsLoc = styled.div`
  width: 1400px;
  height: 65px;
  margin: auto;
  margin-bottom: 50px;
  background-color: rgba(0, 180, 216, 0.6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0px 25px;
`;

const LocIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const LocTxt = styled.div`
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
`;

const Contents = styled.div`
  width: 1400px;
  margin: auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
`;

const ContentsImgWrapper = styled.div`
  width: 100%;
  height: 380px;
  overflow: hidden;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ContentsTopWrapper = styled.div`
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ContentsTopLeftWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ContentsTitle = styled.div`
  color: #9ab3f5;
  font-size: 45px;
  font-weight: 600;
  margin-right: 30px;
`;

const ContentsDate = styled.div`
  color: #666;
  font-size: 15px;
  font-weight: 300;
`;

const ApplyBtn = styled.button`
  padding: 15px 50px;
  border-radius: 12px;
  background: #00b4d8;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const ContentsMidTopWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
`;

const MidTopLeftWrapper = styled.div`
  display: flex;
`;

const UserImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 30px;
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
  margin-right: 30px;
`;

const UserID = styled.div`
  margin-bottom: 20px;
  color: #c8b6ff;
  font-size: 30px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  color: #666;
  font-size: 25px;
  font-weight: 500;
`;

const UserStyleWrapper = styled.div`
  height: 95px;
  display: flex;
  align-items: flex-end;
`;

const UserStyle = styled.div`
  border-radius: 30px;
  background: #00b4d8;
  padding: 8px 18px;
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
`;

const MidTopRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
`;

const WithTripylerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const WithTripTitle = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 500;
`;

const WithTripProfileList = styled.div`
  position: relative;
  height: 50px;
`;

const WithTripProfileWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
`;

const WithTripProfile = styled(UserImg)`
  cursor: pointer;
`;

const WithTripMoreBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #999;

  color: #666;
  font-size: 12px;
  cursor: pointer;
`;

const WithTripList = styled.div`
  width: 170px;
  height: 200px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 100px;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  padding-top: 10px;
`;

const WithTripListTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const WithTripListWrapper = styled.div`
  max-height: 150px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  gap: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(167, 167, 167, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

const WithTripListItem = styled.div`
  display: flex;
  gap: 15px;
`;

const WithTripListProfile = styled(UserImgWrapper)`
  width: 25px;
  height: 25px;
  margin-right: 0px;
`;

const WithTripListID = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TripylerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
`;

const ContentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ContentsInfoIcon = styled.img`
  margin-right: 20px;
  width: 30px;
  height: 30px;
`;

const ContentsInfoTxt = styled.div`
  color: #666;
  font-size: 20px;
  font-weight: 300;
`;

const ContentsMidBtmWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0px;
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
`;

const MidBtmTitle = styled.div`
  color: #9ab3f5;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 17px;
`;

const MidBtmStyleWrapper = styled.div`
  display: flex;
  margin-bottom: 65px;
`;

const MidBtmStyle = styled(UserStyle)`
  background-color: #90e0ef;
`;

const MidBtmBodyTxt = styled.div`
  width: 1200px;
  min-height: 300px;
  margin: auto;
  padding: 50px 30px;
  border-radius: 20px;
  background: rgba(167, 167, 167, 0.15);

  color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
  font-weight: 500;
`;

const ContentsBtmWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtmLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BtmIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  cursor: pointer;
`;

const BtmTxt = styled.div`
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-right: 25px;
`;

const ListBtn = styled.button`
  padding: 15px 30px;
  border-radius: 12px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #666;
  font-size: 24px;
  font-weight: 700;
`;
