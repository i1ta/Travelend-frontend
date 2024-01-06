import { useState } from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

interface ImagesProps {
  imgList: string[];
}

export default function Images({ imgList }: ImagesProps) {
  const [showImgNum, setShowImgNum] = useState(0);
  const onClickNextImg = () => {
    if (showImgNum < imgList?.length - 3) setShowImgNum((prev) => prev + 1);
  };

  const onClickPrevImg = () => {
    if (showImgNum > 0) setShowImgNum((prev) => prev - 1);
  };

  return (
    <ImgWrapper>
      <ImgShowWrapper>
        <FaAngleLeft
          style={{
            visibility: imgList?.length <= 3 ? "hidden" : "visible",
            cursor: "pointer",
            color: "#666",
            fontSize: "40px",
          }}
          onClick={onClickPrevImg}
        />

        {imgList
          ?.filter((el, idx) => idx >= showImgNum && idx < showImgNum + 3)
          .map((el, idx) => (
            <ShowingImg key={idx}>
              <img src={el} />
            </ShowingImg>
          ))}

        <FaAngleRight
          style={{
            visibility: imgList?.length <= 3 ? "hidden" : "visible",
            cursor: "pointer",
            color: "#666",
            fontSize: "40px",
          }}
          onClick={onClickNextImg}
        />
      </ImgShowWrapper>
    </ImgWrapper>
  );
}

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImgShowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ShowingImg = styled.div`
  width: 25%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
  }
`;
