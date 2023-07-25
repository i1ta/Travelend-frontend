import CalendarTool from "@/components/commons/Tools/Calendar";
import StyleModal from "@/components/commons/Modal/StyleModal";
import * as S from "./write.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function FindTripylerWrite(props) {
  const [isOpenPlaceModal, setIsOpenPlaceModal] = useState(false);
  const [isOpenStyleModal, setIsOpenStyleModal] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [tripDate, setTripDate] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [totalPeopleNum, setTotalPeopleNum] = useState(2);
  const [shownMyHashtag, setShownMyHashtag] = useState([]);
  const [isOpenStep1, setIsOpenStep1] = useState(true);
  const [isOpenStep2, setIsOpenStep2] = useState(true);
  const [isOpenStep3, setIsOpenStep3] = useState(true);
  const [data, setData] = useState({});

  const apiPath = "https://api.tripyle.xyz";
  const router = useRouter();
  const { tripylerId } = router.query;

  const onClickMoreBtn = (event) => {
    const stepNum = event.currentTarget.id;
    console.log(event);
    if (stepNum === "1") setIsOpenStep1((prev) => !prev);
    if (stepNum === "2") setIsOpenStep2((prev) => !prev);
    if (stepNum === "3") setIsOpenStep3((prev) => !prev);
  };

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

  const fetchData = async () => {
    await axios
      .get(`${apiPath}/tripyler/${tripylerId}`)
      .then((res) => {
        const data = res.data.data;
        console.log(res);
        setData({ ...data });
        // setShownMyHashtag([
        //   data.hashtag1,
        //   data.hashtag2,
        //   data.hashtag3,
        //   data.hashtag4,
        //   data.hashtag5,
        // ]);
        setTripDate([data.startDate, data.endDate]);
        setTotalPeopleNum(data.totalPeopleNum);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    props.isEdit && tripylerId && fetchData();
    console.log(data);
  }, [tripylerId]);

  // 이미지 뷰어
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

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

  const onClickCancelBtn = () => {
    alert("취소");
    console.log(data);
  };

  // 작성완료 버튼
  const onClickSubmitBtn = async () => {
    if (
      tripDate.length !== 0 &&
      shownMyHashtag.length !== 0 &&
      title &&
      content &&
      totalPeopleNum
    ) {
      const requestData = {
        title,
        content,
        startDate: tripDate[0],
        endDate: tripDate[1],
        firstTripStyleId: shownMyHashtag[0]?.id || 0,
        secondTripStyleId: shownMyHashtag[1]?.id || 0,
        thirdTripStyleId: shownMyHashtag[2]?.id || 0,
        fourthTripStyleId: shownMyHashtag[3]?.id || 0,
        fifthTripStyleId: shownMyHashtag[4]?.id || 0,
        continentId: 1,
        nationId: 1,
        regionId: 20,
        totalPeopleNum,
      };
      const formData = new FormData();
      formData.append(
        "tripylerCreateDto",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );
      formData.append("images", selectedImage);

      await axios
        .post(apiPath + "/tripyler", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          alert(res.data.data);
          router.push("/findTripyler");
        })
        .catch((error) => console.error(error));
    } else {
      alert("필수입력 항목을 확인해주세요");
    }
  };

  // 수정완료 버튼
  const onClickEditBtn = async () => {
    const requestData = {
      title,
      content,
      startDate: tripDate[0],
      endDate: tripDate[1],
      firstTripStyleId: shownMyHashtag[0]?.id || 0,
      secondTripStyleId: shownMyHashtag[1]?.id || 0,
      thirdTripStyleId: shownMyHashtag[2]?.id || 0,
      fourthTripStyleId: shownMyHashtag[3]?.id || 0,
      fifthTripStyleId: shownMyHashtag[4]?.id || 0,
      continentId: 1,
      nationId: 1,
      regionId: 20,
      totalPeopleNum,
    };
    const formData = new FormData();
    formData.append(
      "tripylerCreateDto",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
    formData.append("images", selectedImage);

    await axios
      .patch(apiPath + `/tripyler/${tripylerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        alert(res.data.data);
        router.push(`/findTripyler/${tripylerId}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <S.TitleBanner>
        <S.TitleTxt>
          <S.Title>
            Trip’yler 찾기 게시물 {props.isEdit ? "수정" : "찾기"}
          </S.Title>
          <S.SubTitle>본인에게 가장 적합한 여행자를 찾아보세요</S.SubTitle>
        </S.TitleTxt>
        <S.WriteForm>
          <S.StepWrapper>
            <S.FormTitleWrapper>
              <S.FormTitleTxtWrapper>
                <S.StepTxt>Step 1/3</S.StepTxt>
                <S.StepTitleTxt>여행 정보 입력</S.StepTitleTxt>
              </S.FormTitleTxtWrapper>
              <S.MoreBtn id="1" onClick={onClickMoreBtn}>
                <S.MoreBtnImg
                  src="/icon/moreBtn.svg"
                  isOpenStep={isOpenStep1}
                />
              </S.MoreBtn>
            </S.FormTitleWrapper>
            <S.Line></S.Line>
            {isOpenStep1 && (
              <S.StepInfoWrapper>
                <S.InputInfoWrapper>
                  <S.InputTitle>여행지역</S.InputTitle>
                  <S.MidInput></S.MidInput>
                  <S.InputBtn onClick={onClickPlace}>지역 선택</S.InputBtn>
                </S.InputInfoWrapper>
                <S.InputInfoWrapper>
                  <S.InputTitle>여행일정</S.InputTitle>
                  <S.InputWrapper>
                    <S.ShortInput>
                      {tripDate.length === 0 ? "출발" : tripDate[0]}
                    </S.ShortInput>
                    <S.Hyphen></S.Hyphen>
                    <S.ShortInput>
                      {tripDate.length === 0 ? "도착" : tripDate[1]}
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
                <S.MoreBtnImg
                  src="/icon/moreBtn.svg"
                  isOpenStep={isOpenStep2}
                />
              </S.MoreBtn>
            </S.FormTitleWrapper>
            <S.Line></S.Line>
            {isOpenStep2 && (
              <S.StepInfoWrapper>
                <S.InputInfoWrapper>
                  <S.InputTitle>제목</S.InputTitle>
                  <S.LongInput
                    placeholder="제목을 입력해주세요"
                    onChange={(event) => setTitle(event.target.value)}
                    defaultValue={title}
                  ></S.LongInput>
                </S.InputInfoWrapper>
                <S.LongInputInfoWrapper>
                  <S.LongInputTitle>내용</S.LongInputTitle>
                  <S.LongTxtArea
                    placeholder="내용을 입력해주세요"
                    onChange={(event) => setContent(event.target.value)}
                    defaultValue={content}
                  ></S.LongTxtArea>
                </S.LongInputInfoWrapper>
              </S.StepInfoWrapper>
            )}
          </S.StepWrapper>

          <S.StepWrapper>
            <S.FormTitleWrapper>
              <S.FormTitleTxtWrapper>
                <S.StepTxt>Step 3/3</S.StepTxt>
                <S.StepTitleTxt>이미지 선택</S.StepTitleTxt>
              </S.FormTitleTxtWrapper>
              <S.MoreBtn id="3" onClick={onClickMoreBtn}>
                <S.MoreBtnImg
                  src="/icon/moreBtn.svg"
                  isOpenStep={isOpenStep3}
                />
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
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <S.MidInput> {imageName || "선택된 파일 없음"}</S.MidInput>
                  <S.fileReaderBtn htmlFor="upload-input">
                    불러오기
                  </S.fileReaderBtn>
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
              </S.StepInfoWrapper>
            )}
          </S.StepWrapper>
          <S.BtnWrapper>
            <S.CancelBtn onClick={onClickCancelBtn}>취소</S.CancelBtn>
            <S.SubmitBtn
              onClick={props.isEdit ? onClickEditBtn : onClickSubmitBtn}
            >
              {props.isEdit ? "수정" : "작성"} 완료
            </S.SubmitBtn>
          </S.BtnWrapper>
        </S.WriteForm>
      </S.TitleBanner>
      <S.FormBtm />

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
          limitLen="5"
        />
      )}
    </>
  );
}
