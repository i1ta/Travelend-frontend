import styled from "@emotion/styled";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 50px;
  width: fit-content;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 8px;
  color: black;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
`;

export const TitleLine = styled.div`
  height: 3px;
  background-color: black;
  margin-bottom: 70px;

  width: ${(props) => (props.kakao ? '250px' : '139px')};
`;

export const Label = styled.div`
  width: 170px;
  display: flex;
  align-items: center;
`;

export const LabelTxt = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: #000000;
`;

export const LabelStar = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  color: #ff1d1d;

  margin-left: 7px;
`;

export const Input = styled.input`
  height: 60px;
  width: 500px;
  padding: 15px 20px;
  margin-right: 15px;

  border-radius: 10px;
  border: 1px solid #d6d5d5;

  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 1;
  color: #666666;

  &:-webkit-autofill {
    -webkit-text-fill-color: #666666;
  }
`;

export const Error = styled.div`
  width: 480px;
  height: 35px;
  display: flex;
  align-items: center;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  color: #ff1d1d;
`;

export const GenderWrapper = styled.div`
  height: 73px;
  width: 500px;
  margin-right: 15px;
  /* background-color: aliceblue; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpanLabel = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: #666666;
`;

export const RadioBtn = styled.input`
  width: 25px;
  height: 25px;
  margin-right: 20px;
  background: #ffffff;
  border: 1.5px solid #d6d5d5;
  border-radius: 20px;
  cursor: pointer;
  appearance: none;
  transition: background 0.2s;

  &:checked {
    background: #c8b6ff;
    border: none;
    content: "✔";
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckBtn = styled.button`
  width: 140px;
  height: 60px;

  border: 1px solid #03045e;
  border-radius: 10px;

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  color: #03045e;
`;

export const BlankBtn = styled.div`
  width: 143px;
  height: 60px;
`;

export const BlankLabel = styled.div`
  width: 170px;
  height: 60px;
`;

export const BirthDateWrapper = styled.div`
  height: 60px;
  width: 500px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  border: 1px solid #d6d5d5;
`;

export const BirthDateInput = styled.input`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: #666666;
  text-align: center;
  border: none;
  outline: none;
  width: 100px;
`;

export const BirthDateSlash = styled.div`
  margin: 0px 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: #666666;
`;

export const AcceptTitleWrapper = styled.div`
  width: 500px;
  margin: 40px 0px 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Line = styled.div`
  width: 156px;
  height: 1px;
  background-color: #666666;
`;

export const AcceptTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 1;
  text-align: center;
  color: #666666;
`;

export const AcceptWrapper = styled.div`
  width: 480px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  background: #ffffff;
  border: 1px solid #d6d5d5;
  border-radius: 5px;
  appearance: none;
  transition: background 0.2s;

  &:checked {
    background-color: #c8b6ff;
    border: none;
    content: "✔";
  }
`;

export const AcceptLabel = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #666666;
`;

export const EnrollBtn = styled.button`
  width: 500px;
  height: 73px;
  background: #c8b6ff;
  border-radius: 5px;
  margin-left: 10px;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;
