import { useRouter } from "next/router";
import { useState } from "react";
import * as S from "./write.style";

export default function TriplogWrite(props) {
  const [isOpenStep1, setIsOpenStep1] = useState(true);
  const [isOpenStep2, setIsOpenStep2] = useState(true);
  const [isOpenStep3, setIsOpenStep3] = useState(true);
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);
  const [isOpenWithTripList, setIsOpenWithTripList] = useState(false);
  const [tripylerWithList, settripylerWithList] = useState([
    {
      nickname: "user01",
      profileUrl: "/img/hooni.jpeg",
    },
    {
      nickname: "user01",
      profileUrl: "/img/hooni.jpeg",
    },
    {
      nickname: "user01",
      profileUrl: "/img/hooni.jpeg",
    },
    {
      nickname: "user01",
      profileUrl: "/img/hooni.jpeg",
    },
    {
      nickname: "user01",
      profileUrl: "/img/hooni.jpeg",
    },
  ]);

  const apiPath = "https://api.tripyle.xyz";
  const router = useRouter();

  const onClickMoreBtn = (event) => {
    const stepNum = event.currentTarget.id;
    console.log(event);
    if (stepNum === "1") setIsOpenStep1((prev) => !prev);
    if (stepNum === "2") setIsOpenStep2((prev) => !prev);
    if (stepNum === "3") setIsOpenStep3((prev) => !prev);
  };

  // 콤보박스
  const onClickCmbBox = () => {
    setIsOpenCmbBox((prev) => !prev);
  };

  const onClickCmbBoxItem = () => {
    setIsOpenCmbBox(false);
  };

  // 동행 Tripyler
  const onClickWithTrip = () => {
    setIsOpenWithTripList((prev) => !prev);
  };

  // 이미지
  // const [imageUrl, setImageUrl] = useState("");
  // const [imageName, setImageName] = useState("");
  const [imageList, setImageList] = useState([{ url: "", name: "" }]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(event.target.files);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // setImageUrl(reader.result);
        // setImageName(file.name);
        imageList.length < 10 &&
          setImageList((prev) => [
            ...prev,
            { url: reader.result, name: file.name },
          ]);
      });
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
      setImageName("");
    }
  };

  // 작성완료, 취소 Btn
  const onClickCancelBtn = () => {
    alert("취소");
  };

  const onClickSubmitBtn = () => {
    alert("작성완료");
  };

  return (
    <>
      <S.TitleBanner>
        <S.TitleTxt>
          <S.Title>여행 후기 게시물 {props.isEdit ? "수정" : "등록"}</S.Title>
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
                  <S.InputTitle>여행기록 선택</S.InputTitle>
                  <S.CmbBox
                    onClick={onClickCmbBox}
                    style={{ position: "relative" }}
                  >
                    <S.CmbBoxTxt>선택</S.CmbBoxTxt>
                    <S.CmbBoxArrow src="/icon/moreBtn.svg" />
                    {isOpenCmbBox && (
                      <S.CmbBoxList>
                        <S.CmbBoxListItem onClick={onClickCmbBoxItem}>
                          ddddddddddddddddd
                        </S.CmbBoxListItem>
                        <S.CmbBoxListItem>룰ㄹ루랄</S.CmbBoxListItem>
                        <S.CmbBoxListItem>
                          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </S.CmbBoxListItem>
                      </S.CmbBoxList>
                    )}
                  </S.CmbBox>
                </S.InputInfoWrapper>
                <S.InfoBox>
                  <S.InfoBoxItem>
                    <S.InfoBoxTitle>여행지</S.InfoBoxTitle>
                    <S.InfoBoxInput>그리스, 산토리니</S.InfoBoxInput>
                  </S.InfoBoxItem>
                  <S.InfoBoxItem>
                    <S.InfoBoxTitle>여행기간</S.InfoBoxTitle>
                    <S.InfoBoxInput>23.01.12 - 23.01.23</S.InfoBoxInput>
                  </S.InfoBoxItem>
                  <S.InfoBoxItem
                    style={{ marginLeft: "35x", position: "relative" }}
                  >
                    <S.InfoBoxTitle>동행 Tripyler</S.InfoBoxTitle>

                    <S.WithTripProfileList>
                      {tripylerWithList
                        ?.filter((el, idx) => idx < 4)
                        .map((el, idx) => (
                          <S.WithTripProfileWrapper
                            key={el.nickname}
                            style={{ left: `${idx * 35}px` }}
                            onClick={onClickWithTrip}
                          >
                            <S.WithTripProfile
                              src={el.profileUrl || "/icon/defaultProfile.png"}
                            />
                          </S.WithTripProfileWrapper>
                        ))}
                      {tripylerWithList.length > 4 && (
                        <S.WithTripMoreBox onClick={onClickWithTrip}>
                          +{tripylerWithList.length - 4}
                        </S.WithTripMoreBox>
                      )}
                    </S.WithTripProfileList>
                    {isOpenWithTripList && (
                      <S.WithTripList>
                        <S.WithTripListTitle>
                          Trip’yler 리스트
                        </S.WithTripListTitle>
                        <S.WithTripListWrapper>
                          {tripylerWithList.map((el) => (
                            <S.WithTripListItem>
                              <S.WithTripListProfile>
                                <S.Image
                                  src={
                                    el.profileUrl || "/icon/defaultProfile.png"
                                  }
                                />
                              </S.WithTripListProfile>
                              <S.WithTripListID>{el.nickname}</S.WithTripListID>
                            </S.WithTripListItem>
                          ))}
                        </S.WithTripListWrapper>
                      </S.WithTripList>
                    )}
                  </S.InfoBoxItem>
                </S.InfoBox>
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
                <S.TitleInput placeholder="제목을 입력해주세요"></S.TitleInput>
                <S.LongTextarea placeholder="내용을 입력해주세요"></S.LongTextarea>
                <S.ImgWrapper>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>
                  <S.ImageItem>
                    <S.ImageWrapper>
                      <S.Img src="/img/review1.png" />
                    </S.ImageWrapper>
                    <S.ImgNameWrapper>
                      <S.ImgName>산토리니 마을.jpg</S.ImgName>
                      <S.ImgDelBtn src="/icon/delBtn.svg" />
                    </S.ImgNameWrapper>
                  </S.ImageItem>

                  <S.ImgAddBtn htmlFor="upload-input">
                    <S.ImgAddIcon src="/icon/plus.png" />
                    <S.ImgAddTxt>이미지 추가</S.ImgAddTxt>
                  </S.ImgAddBtn>
                  <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    multiple
                  />
                </S.ImgWrapper>
              </S.StepInfoWrapper>
            )}
          </S.StepWrapper>

          <S.StepWrapper>
            <S.FormTitleWrapper>
              <S.FormTitleTxtWrapper>
                <S.StepTxt>Step 3/3</S.StepTxt>
                <S.StepTitleTxt>여행 한줄</S.StepTitleTxt>
                <S.StepSubTitleTxt>
                  여행 후기 메인 본문에 같이 노출됩니다.
                </S.StepSubTitleTxt>
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
                  <S.LongInput placeholder="우리의 여행을 한 줄로 표현해보세요!"></S.LongInput>
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
      <S.FormBtm />
    </>
  );
}
