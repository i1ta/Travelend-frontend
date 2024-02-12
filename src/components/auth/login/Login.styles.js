import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

export const Title = styled.h1`
  padding: 5px 7px;
  border-bottom: 3px solid black;
  letter-spacing: -1px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  margin: 1rem 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #d6d5d5;

  font-size: 16px;
  padding: 20px;
  margin: 0.6rem;
  width: 500px;
`;

export const CheckboxContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  gap: 8px;

  input {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.main1};
    appearance: none;
    cursor: pointer;
    transition: background 0.2s;

    &:checked {
      background: ${({ theme }) => theme.colors.main1};
      border: none;
      content: "✔";
    }
  }

  label {
    color: #666666;
    font-size: 16px;
    letter-spacing: -0.3px;
  }
`;

export const Button = styled.button`
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main1};
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;

  padding: 20px;
  margin: 20px;

  width: 500px;
`;
