import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import * as S from "./applyDetail.style";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FindTripylerApplyDetail() {
  const router = useRouter();
  const apiPath = "https://api.tripyle.xyz";

  const [isAccept, setIsAccept] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");
  }, []);

  const onClickRejectBtn = () => {
    alert("거절");
  };

  const onClickAcceptBtn = () => {
    alert("수락");
    setIsAccept(true);
  };

  const onSubmitMsg = async (event) => {
    event.preventDefault();
    await axios
      .post(apiPath + "/chat/send", {
        content: event.target.message.value,
        recipientId: 54,
      })
      .then((res) => {
        console.log(res);
        alert("전송이 완료되었습니다.");
      })
      .catch((err) => console.error(err));
    // event.target.reset();
  };

  return (
    <>
      <FindTripylerBanner
        title="Trip'yler 신청내역"
        subTitle="Trip’yle에서 나에게 동행신청을 보낸 Trip’yler들을 만나보세요."
      />
      <S.Title>Trip’yler 신청 확인하기</S.Title>
      <S.Contents>
        <S.ContentsImgWrapper>
          <S.ContentsImg src="/img/Santorini.png" />
        </S.ContentsImgWrapper>
        <S.ContentsTitle>3박 4일 산토리니 여행 동행 구합니다.</S.ContentsTitle>
        <S.UserWrapper>
          <S.UserImgWrapper>
            <S.UserImg src="/icon/defaultProfile.png"></S.UserImg>
          </S.UserImgWrapper>
          <S.UserTxtWrapper>
            <S.UserID>ilta0101</S.UserID>
            <S.UserInfo>20대 초반 여성 </S.UserInfo>
          </S.UserTxtWrapper>
          <S.UserStyleWrapper>
            <S.UserStyle>#전시회</S.UserStyle>
            <S.UserStyle>#관광지</S.UserStyle>
          </S.UserStyleWrapper>
        </S.UserWrapper>
        <S.ContentsSubTitle>
          상대방에게 본인에 대해 간단히 소개해주세요.
        </S.ContentsSubTitle>
        <S.IntroduceBox>
          저는 20대 여성으로서 프랑스 파리 여행을 계획 중이며 같이 동행하고
          싶습니다. 여행 기간은 5일로 계획 중이며, 예정된 일정에는 다양한 활동과
          관광지 방문이 포함됩니다. 저는 주로 사진찍는 거를 좋아하고 유명지
          위주로 관광하는 걸 좋아해요!! 같이 여행하면 잘 맞을 것 같아서
          연락드려요! 신청 보시면 쪽지 부탁드립니다~
        </S.IntroduceBox>
        {isAccept ? (
          <S.SendMsgForm onSubmit={onSubmitMsg}>
            <S.SendMsgInput
              name="message"
              autoComplete="off"
              placeholder="Trip’yler 신청 메세지를 입력해주세요."
            ></S.SendMsgInput>
            <S.SendMsgBtn>Send</S.SendMsgBtn>
          </S.SendMsgForm>
        ) : (
          <S.BtnWrapper>
            <S.RejectBtn onClick={onClickRejectBtn}>거절하기</S.RejectBtn>
            <S.AcceptBtn onClick={onClickAcceptBtn}>수락하기</S.AcceptBtn>
          </S.BtnWrapper>
        )}
      </S.Contents>
    </>
  );
}
