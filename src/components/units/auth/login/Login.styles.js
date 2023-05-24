import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: center;
  
`

export const Title = styled.h1`
  padding: 5px 7px;
  border-bottom: 3px solid black;
  letter-spacing: -1px;
`

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
  border: 1px solid #D6D5D5;

  font-size: 15px;

  padding: 15px 20px;
  margin: 0.6rem;
  width: 500px;
  height: 70px;

  &: focus{
    outline: none;
  }
`;

export const CheckboxContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  margin-left: 20px;
`;

export const CheckboxInput = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: 2.5px solid #D6D5D5;
  appearance: none;
  cursor: pointer;
  transition: background 0.2s;

  &: checked{
    background: #D6D5D5;
    border: none;
    content:'✔';
  }
`

export const Label = styled.label`
  color: #666666;
  font-size: 16px;
  letter-spacing: -0.3px;
  margin-left: 8px;

  cursor: pointer;
`;

export const Button = styled.button`
  border-radius: 100px;
  border: none;
  background-color: #C8B6FF;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;

  padding: 15px 20px;
  margin: 20px;

  width: 500px;
  height: 70px;

  cursor: pointer;
`