import styled from "@emotion/styled";

export const Title = styled.h2`
  padding: 5px 7px;
  border-bottom: 3px solid black;
  letter-spacing: -1px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin: 10px 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const ErrorMsg = styled.div`
  color: red;
  visibility: ${(props) => (props.hideText === true ? "hidden" : "visible")};
`;

export const Button = styled.button`
  background-color: white;

  border-radius: 5px;
  border: 1px solid #03045e;
  color: #03045e;

  padding: 14px;
  cursor: pointer;
  margin-left: 0.7rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const OKButton = styled.button`
  padding: 20px 70px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;

  background-color: #c8b6ff;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 20px;
  cursor: pointer;
`;
