import { useState } from "react";
import styled from "styled-components";

export default function ReviewStep3() {
  const [oneLine, setOneLine] = useState("");

  return (
    <StepContainer>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setOneLine(e.target.value)
        }
        placeholder="우리의 여행을 한 줄로 표현해보세요!"
        defaultValue={oneLine}
      ></input>
    </StepContainer>
  );
}

const StepContainer = styled.div`
  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: 1px solid rgba(153, 153, 153, 0.5);
    background: rgba(255, 255, 255);
    color: #000;
    font-size: 16px;
    font-weight: 500;
    padding: 0 20px;
  }
`;
