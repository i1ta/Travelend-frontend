import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled'

import axios from 'axios';

export default function ChnPwForm() {
  const router = useRouter();
  const { register, handleSubmit, getValues, formState: {errors} } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 최소 8자, 하나의 문자, 숫자, 특수 문자를 포함해야 함

  const [certificationOk, setCertificationOk] = useState(false);

  const onSubmit = async (e) => {
    try {      
      console.log(e);
      setIsSubmitting(true);
      const requestData = {
        "newPassword": getValues("newPw"),
        "newPasswordCheck": getValues("newPwChk"),
        "username": router.query.username
      };
      console.log(requestData);
      const response = await axios.post(
        'https://api.tripyle.xyz/user/password/change',
        requestData,
        {"Content-Type": "application/json; charset=utf-8"}
      );
      console.log(response);
      if (response.status === 200 && response.data === '새로운 비밀번호로 변경되었습니다') {
        alert('비밀번호가 변경되었습니다.');
        router.push('/auth/signIn');
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Container>
      <Title>비밀번호 변경</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Wrapper>
            <Label htmlFor='nameInput'>새로운 비밀번호</Label>
            <Input
                id="nameInput"
                type='password'
                {...register("newPw", {
                  required: true,
                  pattern: {
                    value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                    message: '비밀번호를 8자 이상으로 영문 대소문자, 숫자, 특수기호를 조합해서 사용하세요. '
                  }
              })}
              />
              {errors.newPw && (<ErrorMsg>{errors.newPw.message}</ErrorMsg>)}
          </Wrapper>
        </InputWrapper>
        <InputWrapper>
          <Wrapper>
            <Label htmlFor='phoneInput'>새로운 비밀번호 확인</Label>
              <Input
                id="phoneInput"
                type='password'
                {...register("newPwChk", {
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const password = getValues("newPw");
                      return password === value || "비밀번호가 일치하지 않습니다.";
                    }
                  }
                })}
              />
              {errors.newPwChk && (
                <ErrorMsg>{errors.newPwChk.message}</ErrorMsg>)
              }
          </Wrapper>
        </InputWrapper>
        
          <ButtonWrapper>
            <OKButton type="submit">OK</OKButton>
          </ButtonWrapper>
      </Form>
    </Container>
    </>
  );
}


const Title = styled.h2`
  padding: 5px 7px;
  border-bottom: 3px solid black;
  letter-spacing: -1px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
margin: 10px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorMsg = styled.div`
  color: red;
  visibility: ${(props) => (props.hideText === true ? 'hidden' : 'visible')}
`

const Button = styled.button`
  background-color: white;

  border-radius: 5px;
  border: 1px solid #03045E;
  color: #03045E;

  padding: 14px;
  cursor: pointer;
  margin-left: 0.7rem;
  
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OKButton = styled.button`
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