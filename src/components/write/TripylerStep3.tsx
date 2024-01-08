import { useState } from "react";
import styled from "styled-components";
import { IoImageOutline } from "react-icons/io5";

export default function TripylerStep3() {
  // 이미지 뷰어
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      e.currentTarget.files !== null ? e.currentTarget.files[0] : null;
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (typeof reader.result === "string") setImageUrl(reader.result);
        setImageName(file.name);
      });
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
      setImageName("");
    }
  };

  return (
    <StepContainer>
      <FileContainer>
        <InputTitle>첨부파일</InputTitle>
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <GrayInput> {imageName || "선택된 파일 없음"}</GrayInput>
        <ReaderBtn htmlFor="upload-input">불러오기</ReaderBtn>
      </FileContainer>

      <ViewerContainer>
        <InputTitle style={{ marginTop: "8px" }}>이미지 뷰어</InputTitle>
        <ImageViewer>
          {imageUrl ? (
            <img src={imageUrl} />
          ) : (
            <>
              <IoImageOutline style={{ fontSize: "60px", color: "#666" }} />
              <div>
                배경에 들어갈 사진을 선택해주세요. <br />
                미선택 시 나라에 맞는 사진이 자동으로 들어갑니다.
              </div>
            </>
          )}
        </ImageViewer>
      </ViewerContainer>
    </StepContainer>
  );
}

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FileContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    display: none;
  }
`;

const InputTitle = styled.div`
  width: 23%;
  color: #333;
  font-size: 16px;
  font-weight: 700;
`;

const GrayInput = styled.div`
  width: 55%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 16px;
`;

const ReaderBtn = styled.label`
  width: 18%;
  height: 100%;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.main1};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const ViewerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ImageViewer = styled.div`
  width: 75%;
  height: 300px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    color: #666;
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
  }

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
  }
`;
