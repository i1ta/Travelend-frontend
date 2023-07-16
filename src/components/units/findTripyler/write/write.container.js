import FindTripylerBanner from "@/components/commons/Layout/findTripylerBanner";
import CalendarTool from "@/components/commons/Tools/Calendar";
import * as S from "./write.style";
import { useState } from "react";

export default function FindTripylerWrite() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [tripDate, setTripDate] = useState([]);

  const onClickTripDate = () => {
    setIsOpenCalendar(true);
  };

  const onClickTripPlace = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const onClickSubmitBtn = () => {
    alert("게시글 작성이 완료되었습니다.");
  };

  return (
    <>
      <FindTripylerBanner />
      <S.TItle>모집 게시물 작성</S.TItle>
      <S.PostForm>
        <S.InputBar style={{ marginBottom: "30px" }}>
          <S.InputTitle>여행 동행자 인원수</S.InputTitle>
          <S.InputResult>10명</S.InputResult>
        </S.InputBar>
        <S.MemNumWrapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => (
            <S.MemNumBtn>{e}</S.MemNumBtn>
          ))}
        </S.MemNumWrapper>
        <S.MemNumInput>직접입력</S.MemNumInput>
        <S.InputBar>
          <S.InputTitle>찾는 여행 성향</S.InputTitle>
          <S.StyleInputResult>
            <S.StyleTag>#떠돌이</S.StyleTag>
            <S.StyleTag>#도심지</S.StyleTag>
            <S.StyleTag>#사진찍기</S.StyleTag>
          </S.StyleInputResult>
        </S.InputBar>
        <S.InputBar>
          <S.InputTitle>여행 지역</S.InputTitle>
          <S.InputResult
            style={{ cursor: "pointer" }}
            onClick={onClickTripPlace}
          >
            프랑스
          </S.InputResult>
        </S.InputBar>
        <S.InputBar style={{ position: "relative" }}>
          <S.InputTitle>여행 일정</S.InputTitle>
          <S.InputResultWrapper>
            <S.InputResultTxt>출발</S.InputResultTxt>
            <S.InputResult
              style={{ cursor: "pointer", width: "230px" }}
              onClick={onClickTripDate}
            >
              {tripDate ? tripDate[0] : "출발"}
            </S.InputResult>
            <S.InputResultTxt>도착</S.InputResultTxt>
            <S.InputResult
              style={{ cursor: "pointer", width: "230px" }}
              onClick={onClickTripDate}
            >
              {tripDate ? tripDate[1] : "도착"}
            </S.InputResult>
          </S.InputResultWrapper>
          {isOpenCalendar && (
            <CalendarTool
              setIsOpenCalendar={setIsOpenCalendar}
              setTripDate={setTripDate}
            />
          )}
        </S.InputBar>

        <S.InputBar>
          <S.InputTitle>예상 여행 경비</S.InputTitle>
          <S.InputResult>약 700,000 원</S.InputResult>
        </S.InputBar>
        <S.InputBar style={{ marginBottom: "30px" }}>
          <S.InputTitle>동행 모집 글쓰기</S.InputTitle>
        </S.InputBar>
        <S.TitleInput placeholder={"제목 작성하기"}></S.TitleInput>
        <S.ContentsInput placeholder={"내용 작성하기"}></S.ContentsInput>
        <S.ImgBtn>
          배경에 들어갈 사진을 선택해주세요. 미선택 시 나라에 맞는 사진이
          자동으로 들어갑니다.
        </S.ImgBtn>
        <S.SubmitBtnWrapper>
          <S.SubmitBtn onClick={onClickSubmitBtn}>작성 완료</S.SubmitBtn>
        </S.SubmitBtnWrapper>
      </S.PostForm>
      {isOpenModal && (
        <S.ModalOverlay>
          <S.Modal>
            <S.ModalTitle>여행 지역</S.ModalTitle>
            <S.ModalInputWrapper>
              <S.ModalInput
                placeholder="여행스타일 검색 (최대 3개)"
                name="search"
                autocomplete="off"
              ></S.ModalInput>
              <S.ModalInputBtn>
                <img src="/icon/search.png" />
              </S.ModalInputBtn>
            </S.ModalInputWrapper>
            <S.ModalResult>프랑스, 파리</S.ModalResult>
            {/* <S.ModalHashtagError></S.ModalHashtagError> */}
            <S.ModalBtnWrapper>
              <S.ModalCancelBtn onClick={handleCloseModal}>
                취소
              </S.ModalCancelBtn>
              <S.ModalSubmitBtn>확인</S.ModalSubmitBtn>
            </S.ModalBtnWrapper>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </>
  );
}
