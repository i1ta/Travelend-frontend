import CalendarTool from "@/components/commons/Tools/Calendar";
import StyleModal from "@/components/commons/Modal/StyleModal";
import * as S from "./write.style";
import { useState } from "react";
import axios from "axios";

export default function FindTripylerWrite() {
  const [isOpenPlaceModal, setIsOpenPlaceModal] = useState(false);
  const [isOpenStyleModal, setIsOpenStyleModal] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [tripDate, setTripDate] = useState([]);
  const [title, setTitle] = useState("dd");
  const [content, setContent] = useState("dd");
  const [totalPeopleNum, setTotalPeopleNum] = useState(2);
  const [errorHashtag, setErrorHashtag] = useState("");
  const [shownMyHashtag, setShownMyHashtag] = useState([]);

  const apiPath = "https://api.tripyle.xyz";

  const onClickDate = () => {
    setIsOpenCalendar(true);
  };

  const onClickPlace = () => {
    setIsOpenPlaceModal(true);
  };

  const onClickStyle = async () => {
    setIsOpenStyleModal(true);
  };

  const handleClosePlaceModal = () => {
    setIsOpenPlaceModal(false);
  };

  const onClickUpDownBtn = (event) => {
    if (event.target.id === "down") {
      if (totalPeopleNum > 1) setTotalPeopleNum((prev) => prev - 1);
    } else setTotalPeopleNum((prev) => prev + 1);
  };

  const onClickCancelBtn = () => {
    alert("취소");
    // console.log(typeof tripDate[0]);
  };

  // 이미지 뷰어
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageUrl(reader.result);
        setImageName(file.name);
      });
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
      setImageName("");
    }
  };

  // 작성완료 버튼
  const onClickSubmitBtn = async () => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    if (
      tripDate.length !== 0 &&
      shownMyHashtag.length !== 0 &&
      title &&
      content &&
      totalPeopleNum
    ) {
      await axios
        .post(apiPath + "/tripyler", {
          title,
          content,
          startDate: tripDate[0],
          endDate: "2023-01-02",
          firstTripStyleId: shownMyHashtag[0]?.id || 0,
          secondTripStyleId: shownMyHashtag[1]?.id || 0,
          thirdTripStyleId: shownMyHashtag[2]?.id || 0,
          fourthTripStyleId: shownMyHashtag[3]?.id || 0,
          fifthTripStyleId: shownMyHashtag[4]?.id || 0,
          continentId: 1,
          nationId: 1,
          regionId: 20,
          totalPeopleNum,
        })
        .then((response) => {
          console.log(response);
          alert("게시글 작성이 완료되었습니다.");
          // 리스트 페이지 이동
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <S.TitleBanner>
        <S.TitleTxt>
          <S.Title>Trip’yler 찾기 게시물 작성</S.Title>
          <S.SubTitle>본인에게 가장 적합한 여행자를 찾아보세요</S.SubTitle>
        </S.TitleTxt>
        <S.WriteForm>
          <S.StepWrapper>
            <S.StepTxt>Step 1/3</S.StepTxt>
            <S.StepTitleTxt>여행 정보 입력</S.StepTitleTxt>
            <S.Line></S.Line>
            <S.InputInfoWrapper>
              <S.InputTitle>여행지역</S.InputTitle>
              <S.MidInput></S.MidInput>
              <S.InputBtn onClick={onClickPlace}>지역 선택</S.InputBtn>
            </S.InputInfoWrapper>
            <S.InputInfoWrapper>
              <S.InputTitle>여행일정</S.InputTitle>
              <S.InputWrapper>
                <S.ShortInput>
                  {tripDate.length == 0 ? "출발" : tripDate[0]}
                </S.ShortInput>
                <S.Hyphen></S.Hyphen>
                <S.ShortInput>
                  {tripDate.length == 0 ? "도착" : tripDate[1]}
                </S.ShortInput>
                {isOpenCalendar && (
                  <CalendarTool
                    setIsOpenCalendar={setIsOpenCalendar}
                    setTripDate={setTripDate}
                  />
                )}
              </S.InputWrapper>
              <S.InputBtn onClick={onClickDate}>일정선택</S.InputBtn>
            </S.InputInfoWrapper>
            <S.InputInfoWrapper>
              <S.InputTitle>동행자 인원수</S.InputTitle>
              <S.WritableShortInput>
                <S.UpDownBtn id="down" onClick={onClickUpDownBtn}>
                  -
                </S.UpDownBtn>
                <S.InputTxt>{totalPeopleNum}명</S.InputTxt>
                <S.UpDownBtn id="up" onClick={onClickUpDownBtn}>
                  +
                </S.UpDownBtn>
              </S.WritableShortInput>
            </S.InputInfoWrapper>
            <S.InputInfoWrapper>
              <S.InputTitleWrapper>
                <S.InputTitle
                  style={{ width: "fit-content", marginRight: "6px" }}
                >
                  찾는 여행 성향
                </S.InputTitle>
                <S.InputTitleInfo>(최대 5개)</S.InputTitleInfo>
              </S.InputTitleWrapper>
              <S.MidInput style={{ gap: "16px" }}>
                {shownMyHashtag.map((e) => (
                  <S.Hashtag key={e.id}>#{e.name}</S.Hashtag>
                ))}
              </S.MidInput>
              <S.InputBtn onClick={onClickStyle}>스타일 선택</S.InputBtn>
            </S.InputInfoWrapper>
            <S.InputInfoWrapper>
              <S.InputTitle>예상 여행 경비</S.InputTitle>
              <S.WritableShortInput>
                <S.InputTxt>약</S.InputTxt>
                <S.Input></S.Input>
                <S.InputTxt>원</S.InputTxt>
              </S.WritableShortInput>
            </S.InputInfoWrapper>
          </S.StepWrapper>

          <S.StepWrapper>
            <S.StepTxt>Step 2/3</S.StepTxt>
            <S.StepTitleTxt>내용 작성</S.StepTitleTxt>
            <S.Line></S.Line>
            <S.InputInfoWrapper>
              <S.InputTitle>제목</S.InputTitle>
              <S.LongInput
                placeholder="제목을 입력해주세요"
                onChange={(event) => setTitle(event.target.value)}
              ></S.LongInput>
            </S.InputInfoWrapper>
            <S.LongInputInfoWrapper>
              <S.LongInputTitle>내용</S.LongInputTitle>
              <S.LongTxtArea
                placeholder="내용을 입력해주세요"
                onChange={(event) => setContent(event.target.value)}
              ></S.LongTxtArea>
            </S.LongInputInfoWrapper>
          </S.StepWrapper>

          <S.StepWrapper>
            <S.StepTxt>Step 3/3</S.StepTxt>
            <S.StepTitleTxt>이미지 선택</S.StepTitleTxt>
            <S.Line></S.Line>
            <S.InputInfoWrapper>
              <S.InputTitle>첨부파일</S.InputTitle>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <S.MidInput> {imageName || "선택된 파일 없음"}</S.MidInput>
              <S.fileReaderBtn htmlFor="upload-input">불러오기</S.fileReaderBtn>
            </S.InputInfoWrapper>
            <S.LongInputInfoWrapper>
              <S.LongInputTitle>이미지 뷰어</S.LongInputTitle>
              <S.ImageViewer>
                {imageUrl ? (
                  <S.ImagePreveiew src={imageUrl} />
                ) : (
                  <>
                    <S.ImageIcon src="/icon/image.svg" />
                    <S.ImageTxt>
                      배경에 들어갈 사진을 선택해주세요. <br />
                      미선택 시 나라에 맞는 사진이 자동으로 들어갑니다.
                    </S.ImageTxt>
                  </>
                )}
              </S.ImageViewer>
            </S.LongInputInfoWrapper>
          </S.StepWrapper>
          <S.BtnWrapper>
            <S.CancelBtn onClick={onClickCancelBtn}>취소</S.CancelBtn>
            <S.SubmitBtn onClick={onClickSubmitBtn}>작성 완료</S.SubmitBtn>
          </S.BtnWrapper>
        </S.WriteForm>
      </S.TitleBanner>

      {isOpenPlaceModal && (
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
              <S.ModalCancelBtn onClick={handleClosePlaceModal}>
                취소
              </S.ModalCancelBtn>
              <S.ModalSubmitBtn>확인</S.ModalSubmitBtn>
            </S.ModalBtnWrapper>
          </S.Modal>
        </S.ModalOverlay>
      )}

      {isOpenStyleModal && (
        <StyleModal
          data={shownMyHashtag}
          setData={setShownMyHashtag}
          setIsOpenModal={setIsOpenStyleModal}
          limitLen = "5"
        />
      )}
    </>
  );
}
