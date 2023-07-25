import { useRouter } from "next/router";
import { useState } from "react";
import * as S from "./write.style";

export default function TriplogWrite(props) {
  const [isOpenStep1, setIsOpenStep1] = useState(true);
  const [isOpenStep2, setIsOpenStep2] = useState(true);
  const [isOpenStep3, setIsOpenStep3] = useState(true);

  const apiPath = "https://api.tripyle.xyz";
  const router = useRouter();

  const onClickMoreBtn = (event) => {
    const stepNum = event.currentTarget.id;
    console.log(event);
    if (stepNum === "1") setIsOpenStep1((prev) => !prev);
    if (stepNum === "2") setIsOpenStep2((prev) => !prev);
    if (stepNum === "3") setIsOpenStep3((prev) => !prev);
  };

  const onClickCancelBtn = () => {
    alert("취소");
  };

  const onClickSubmitBtn = () => {
    alert("작성완료");
  };

  return (
    <S.TitleBanner>
      <S.TitleTxt>
        <S.Title>여행 후기 게시물 {props.isEdit ? "수정" : "찾기"}</S.Title>
        <S.SubTitle>Trip’yler와 함께한 여행 후기를 들려주세요</S.SubTitle>
      </S.TitleTxt>
      <S.WriteForm>
        <S.StepWrapper>
          <S.FormTitleWrapper>
            <S.FormTitleTxtWrapper>
              <S.StepTxt>Step 1/3</S.StepTxt>
              <S.StepTitleTxt>여행 정보 선택</S.StepTitleTxt>
            </S.FormTitleTxtWrapper>
            <S.MoreBtn id="1" onClick={onClickMoreBtn}>
              <S.MoreBtnImg src="/icon/moreBtn.svg" isOpenStep={isOpenStep1} />
            </S.MoreBtn>
          </S.FormTitleWrapper>
          <S.Line></S.Line>
          {isOpenStep1 && (
            <S.StepInfoWrapper>
              <S.InputInfoWrapper>
                <S.InputTitle>여행지역</S.InputTitle>
                <S.MidInput></S.MidInput>
                <S.InputBtn>지역 선택</S.InputBtn>
              </S.InputInfoWrapper>
            </S.StepInfoWrapper>
          )}
        </S.StepWrapper>

        <S.StepWrapper>
          <S.FormTitleWrapper>
            <S.FormTitleTxtWrapper>
              <S.StepTxt>Step 2/3</S.StepTxt>
              <S.StepTitleTxt>내용 작성</S.StepTitleTxt>
            </S.FormTitleTxtWrapper>
            <S.MoreBtn id="2" onClick={onClickMoreBtn}>
              <S.MoreBtnImg src="/icon/moreBtn.svg" isOpenStep={isOpenStep2} />
            </S.MoreBtn>
          </S.FormTitleWrapper>
          <S.Line></S.Line>
          {isOpenStep2 && (
            <S.StepInfoWrapper>
              <S.InputInfoWrapper>
                <S.InputTitle>제목</S.InputTitle>
                <S.LongInput placeholder="제목을 입력해주세요"></S.LongInput>
              </S.InputInfoWrapper>
              <S.LongInputInfoWrapper>
                <S.LongInputTitle>내용</S.LongInputTitle>
                <S.LongTxtArea placeholder="내용을 입력해주세요"></S.LongTxtArea>
              </S.LongInputInfoWrapper>
            </S.StepInfoWrapper>
          )}
        </S.StepWrapper>

        <S.StepWrapper>
          <S.FormTitleWrapper>
            <S.FormTitleTxtWrapper>
              <S.StepTxt>Step 3/3</S.StepTxt>
              <S.StepTitleTxt>여행 한줄</S.StepTitleTxt>
            </S.FormTitleTxtWrapper>
            <S.MoreBtn id="3" onClick={onClickMoreBtn}>
              <S.MoreBtnImg src="/icon/moreBtn.svg" isOpenStep={isOpenStep3} />
            </S.MoreBtn>
          </S.FormTitleWrapper>
          <S.Line></S.Line>
          {isOpenStep3 && (
            <S.StepInfoWrapper>
              <S.InputInfoWrapper>
                <S.InputTitle>첨부파일</S.InputTitle>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <S.MidInput>선택된 파일 없음</S.MidInput>
                <S.fileReaderBtn htmlFor="upload-input">
                  불러오기
                </S.fileReaderBtn>
              </S.InputInfoWrapper>
            </S.StepInfoWrapper>
          )}
        </S.StepWrapper>
        <S.BtnWrapper>
          <S.CancelBtn onClick={onClickCancelBtn}>취소</S.CancelBtn>
          <S.SubmitBtn onClick={onClickSubmitBtn}>
            {props.isEdit ? "수정" : "작성"} 완료
          </S.SubmitBtn>
        </S.BtnWrapper>
      </S.WriteForm>
    </S.TitleBanner>
  );
}
