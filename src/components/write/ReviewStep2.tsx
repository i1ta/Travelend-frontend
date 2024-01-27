import styled from "styled-components";

import { ReveiwStep2Props } from "@/interfaces/write";
import { FaPlus } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

export default function ReviewStep2({
  setData,
  setImageData,
  imageData,
}: ReveiwStep2Props) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file =
      e.currentTarget.files !== null ? e.currentTarget.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        imageData.length < 10 &&
          setImageData((prev) => [...prev, { url: reader.result, file: file }]);
      });
      reader.readAsDataURL(file);
    }
  };

  const onClickDelBtn = (index: number) => {
    setImageData(imageData.filter((el, idx) => idx !== index));
  };

  return (
    <StepContainer>
      <TitleInput
        onChange={(e) =>
          setData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="제목을 입력해주세요"
        // defaultValue={title}
      ></TitleInput>
      <LongTextarea
        onChange={(e) =>
          setData((prev) => ({ ...prev, content: e.target.value }))
        }
        placeholder="내용을 입력해주세요"
        // defaultValue={content}
      ></LongTextarea>
      {imageData.length === 0 ? (
        <>
          <NoImgWrapper htmlFor="first-upload-input">
            <NoImgIconWrapper>
              <IoImageOutline style={{ color: "#333", fontSize: "28px" }} />
              <div> 이미지 첨부</div>
            </NoImgIconWrapper>
            <NoImgSubTxt>
              여행 이미지는 최대 10장까지 첨부 가능합니다.
            </NoImgSubTxt>
            <Input
              id="first-upload-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </NoImgWrapper>
        </>
      ) : (
        <ImgWrapper>
          {imageData.map((el, idx) => (
            <ImageItem key={idx}>
              <ImageWrapper>
                <img src={typeof el.url === "string" ? el.url : ""} alt="img"/>
              </ImageWrapper>
              <ImgNameWrapper>
                <div>{el.file.name}</div>
                <MdOutlineCancel
                  style={{ color: "#666", cursor: "pointer" }}
                  onClick={() => onClickDelBtn(idx)}
                />
              </ImgNameWrapper>
            </ImageItem>
          ))}

          {imageData.length < 10 && (
            <ImgAddBtn htmlFor="upload-input">
              <FaPlus style={{ fontSize: "20px", color: "#333" }} />
              <div>이미지 추가</div>
              <Input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </ImgAddBtn>
          )}
        </ImgWrapper>
      )}
    </StepContainer>
  );
}

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 20px;

  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  font-size: 16px;
`;

const LongTextarea = styled.textarea`
  width: 100%;
  height: 500px;
  padding: 20px;

  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(255, 255, 255);
  font-size: 16px;
  resize: none;
  overflow-y: auto;
`;

const ImgWrapper = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 0px;

  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: #fff;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ImageWrapper = styled.div`
  height: 150px;
  overflow: hidden;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const ImgNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  div {
    flex: 1;
    color: #666;
    font-size: 16px;
  }
`;

const ImgAddBtn = styled.label`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background: rgba(217, 217, 217, 0.4);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  div {
    color: #333;
    font-size: 18px;
    font-weight: 700;
  }

  input {
    display: none;
  }
`;

const NoImgWrapper = styled.label`
  width: 100%;
  height: 228px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }

  &:hover::after {
    content: "+";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    font-size: 100px;
    color: white;
  }

  input {
    display: none;
  }
`;

const NoImgIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  div {
    color: #333;
    font-size: 20px;
    font-weight: 600;
  }
`;

const NoImgSubTxt = styled.div`
  color: #666;
  font-size: 16px;
`;

const Input = styled.input``;