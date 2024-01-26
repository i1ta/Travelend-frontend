import styled from "styled-components";

export const Page = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 100px;
  width: 95%;
  max-width: 800px;
`;

export const Title = styled.div`
  margin-bottom: 8px;
  color: black;
  font-weight: 700;
  font-size: 28px;
`;

export const TitleLine = styled.div`
  height: 2px;
  background-color: black;
  margin-bottom: 70px;

  width: ${(props) => (props.kakao ? "250px" : "120px")};
`;

export const Label = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    &:first-child {
      font-weight: 400;
      font-size: 16px;
      color: #000000;
    }

    &:last-child {
      font-weight: 700;
      font-size: 18px;
      color: #ff1d1d;
    }
  }
`;

export const Input = styled.input`
  height: 50px;
  width: 60%;
  padding: 15px 20px;

  border-radius: 10px;
  border: 1px solid #d6d5d5;

  font-weight: 400;
  font-size: 16px;
  color: #666666;

  &:-webkit-autofill {
    -webkit-text-fill-color: #666666;
  }
`;

export const Error = styled.div`
  width: 60%;
  height: 24px;
  margin-left: 4%;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  color: #ff1d1d;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2%;
`;

export const CheckBtn = styled.button`
  width: 16%;
  height: 50px;

  border: 1px solid ${({ theme }) => theme.colors.main2};
  border-radius: 10px;

  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.main2};
`;

export const PhoneCheckInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 60%;
  padding: 0 20px;

  border-radius: 10px;
  border: 1px solid #d6d5d5;
  font-size: 16px;

  input {
    width: 85%;
    height: 100%;
    color: #666666;

    &:-webkit-autofill {
      -webkit-text-fill-color: #666666;
    }
  }

  div {
    color: #03045e;
  }
`;

export const GenderWrapper = styled.div`
  height: 50px;
  width: 60%;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
    color: #666666;
  }

  input {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    border: 1.5px solid #d6d5d5;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:checked {
      background: ${({ theme }) => theme.colors.main1};
      border: none;
      content: "✔";
    }
  }
`;

export const BirthDateWrapper = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 10px;
  border: 1px solid #d6d5d5;

  font-size: 16px;
  color: #666666;

  input {
    text-align: center;
    width: 18%;
  }
`;

export const Hashtag = styled.div`
  width: 100px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.main2};

  font-size: 16px;
  color: #ffffff;
`;

export const AcceptTitleWrapper = styled.div`
  width: 60%;
  margin: 32px 0px 10px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Line = styled.div`
  width: 156px;
  height: 0.5px;
  background-color: #999;
`;

export const AcceptTitle = styled.div`
  font-size: 18px;
  color: #666666;
`;

export const AcceptWrapper = styled.div`
  width: 60%;
  margin-left: 4%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;

  input {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 1px solid #d6d5d5;
    border-radius: 5px;
    appearance: none;
    transition: background 0.2s;
    cursor: pointer;

    &:checked {
      background-color: #c8b6ff;
      border: none;
      content: "✔";
    }
  }

  div {
    font-weight: 400;
    font-size: 16px;
    color: #666666;
  }
`;

export const EnrollBtn = styled.button`
  width: 60%;
  padding: 20px 0;
  background: ${({ theme }) => theme.colors.main2};
  border-radius: 5px;
  margin: 40px 0 200px 0;
  margin-left: 5%;

  font-weight: 700;
  font-size: 22px;
  color: #ffffff;
`;
