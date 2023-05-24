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
width: 139px;
background-color: black;
margin-bottom: 70px;
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
  /* margin-bottom: 10px; */
  height: 73px;
  width: 500px;
  padding: 25px 35px;
  margin-right: 15px;
  margin-top: 20px;

  border: 2px solid #d6d5d5;
  border-radius: 5px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: #666666;

  &:-webkit-autofill {
    -webkit-text-fill-color: #666666;
  }
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
  margin-right: 20px;
  background: #ffffff;
  border: 1.5px solid #d6d5d5;
  width: 25px;
  height: 25px;
  background-color: #c8b6ff;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckBtn = styled.button`
  width: 143px;
  height: 73px;
  line-height: 1;

  border: 1px solid #03045e;
  border-radius: 5px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  color: #03045e;
`;

export const BlankBtn = styled.div`
  width: 143px;
  height: 73px;
`;

export const BlankLabel = styled.div`
  width: 170px;
  height: 73px;
`;

export const BirthDateWrapper = styled.div`
  height: 73px;
  width: 500px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #d6d5d5;
  border-radius: 5px;
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
  margin: 40px 0px 40px 15px;
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

export const AcceptLabel = styled.div`
  width: 480px;

  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const AcceptWrapper = styled.div`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 40px;
  border: 2px solid #a4a4a4;
  border-radius: 5px;
  width: 500px;
`;

export const AcceptContents = styled.div`
  border: 2px solid #a4a4a4;
  border-radius: 5px;
  width: 480px;
  height: 150px;
  margin: auto;
  margin-bottom: 10px;
`;

export const CheckBox = styled.input``;

export const EnrollBtn = styled.button`
  width: 500px;
  height: 73px;
  background: #c8b6ff;
  border-radius: 5px;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;
