import { useState } from "react";
import styled from "styled-components";

import { TripylerStep2Props } from "@/interfaces/write";

export default function TripylerStep2({ setData, isEdit }: TripylerStep2Props) {
  return (
    <StepContainer>
      <TitleContainer>
        <InputTitle>제목</InputTitle>
        <input
          placeholder="제목을 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
          // defaultValue={title}
        />
      </TitleContainer>
      <ContentContainer>
        <InputTitle>내용</InputTitle>
        <textarea
          placeholder="내용을 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData((prev) => ({ ...prev, content: e.target.value }))
          }
          // defaultValue={content}
        ></textarea>
      </ContentContainer>
    </StepContainer>
  );
}

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TitleContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 75%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid rgba(153, 153, 153, 0.5);
    background: rgba(255, 255, 255);
    font-size: 16px;
    padding: 0 20px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  textarea {
    width: 75%;
    min-height: 400px;
    border-radius: 5px;
    border: 1px solid rgba(153, 153, 153, 0.5);
    background: rgba(255, 255, 255);
    font-size: 16px;
    line-height: 150%;
    padding: 20px 20px;
    resize: none;
  }

  div {
    margin-top: 8px;
  }
`;

const InputTitle = styled.div`
  width: 23%;
  color: #333;
  font-size: 16px;
  font-weight: 700;
`;
