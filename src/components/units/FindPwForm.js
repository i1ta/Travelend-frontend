import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled'

import axios from 'axios';

export default function FindPwForm() {
  const router = useRouter();
  const { register, handleSubmit, watch, getValues, formState: {errors} } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [certificationOk, setCertificationOk] = useState(false);
  const [phoneNumberOk, setPhoneNumberOk] = useState(true);
  const [authConfirm, setAuthConfirm] = useState(false);

  // 전화번호 11자 이상일 때만 button On
  const phone = useRef('');
  phone.current = watch("phone");
  useEffect(() => {
    if (phone.current?.length >= 11) {
      setPhoneNumberOk(false);
    } else {
      setPhoneNumberOk(true);
    }
  }, [phone.current]);

  const onSubmit = async (e) => {
    try {      
      console.log(e);
      setIsSubmitting(true);
      const requestData = {
        "phone": getValues("phone"),
        "username": getValues("id"),
      }
      if(authConfirm === true){
        const response = await axios.post(
          'https://api.tripyle.xyz/user/auth/username',
          requestData,
          {"Content-Type": "application/json; charset=utf-8"}
        );
        console.log(response);
        if (response.status === 200) {
          if (response.data === '존재하는 유저입니다') {
            alert('인증되었습니다.');
            router.push({
              pathname: '/auth/chnPw',
              query: { username: getValues("id") }
            });
          } else if (response.data === '존재하지 않는 유저입니다') {
            alert('정보가 존재하지 않습니다.');
          }
        } 
      } else {
        alert('휴대폰 인증을 먼저 진행해주세요.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [authenticationNum, setAuthenticationNum] = useState('');
  const onSubmitCertification = async (e) => {
    try {
      console.log(e);
      setCertificationOk(true);
      if (getValues("phoneChk") === undefined) {
        setCertificationOk(true);
        const phoneValue = getValues("phone");
        const requestData = {
          "phone": phoneValue,
        }
        console.log(requestData);
        alert('전화번호가 발송되었습니다.');
        const response = await axios.post(
          'https://api.tripyle.xyz/user/authentication-code/send',
          requestData,
          {"Content-Type": "application/json; charset=utf-8"}
        );
        if (response.status === 200) {
          console.log(response);
        }
      } else {
        if (getValues("phoneChk") == authenticationNum) {
          alert('인증 완료되었습니다.');
          setAuthConfirm(true);
        } else {
          alert('인증번호가 일치하지 않습니다.');
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container>
      <Title>비밀번호 찾기</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Wrapper>
            <Label htmlFor='idInput'>아이디</Label>
            <Input
              id="idInput"
              placeholder="ID"
              required
              {...register("id")}
            />
          </Wrapper>
        </InputWrapper>
          <InputWrapper>
            <Wrapper>
              <Label htmlFor='phoneInput'>휴대폰 번호</Label>
          <Input
            id="phoneInput"
                placeholder="phone number"
              required
            {...register("phone", {
              required: true,
              minLength: 11,
            })}
              />
              </Wrapper>
          <PhoneBtn
            type="submit"
            disabled={phoneNumberOk || certificationOk}
            onClick={handleSubmit(onSubmitCertification)}
          >
            인증번호 받기
          </PhoneBtn>
        </InputWrapper>
        {certificationOk && (
          <InputWrapper>
            <Input
              id="phoneInput"
              placeholder=""
              required
              {...register("phoneChk")}
            />
              <Button
                type="button"
                onClick={onSubmitCertification}
              >
              인증번호 확인
            </Button>
          </InputWrapper>
          )}
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

  &:focus{
    outline: none;
  }
`;

const Button = styled.button`
  background-color: white;

  border-radius: 5px;
  border: 1px solid #03045E;
  color: #03045E;

  padding: 14px;
  cursor: pointer;
  margin-left: 0.7rem;
  
`;

const PhoneBtn = styled.button`
  background-color: white;

  border-radius: 5px;
  border: 1px solid #03045E;
  color: #03045E;

  padding: 14px;
  cursor: pointer;
  margin-left: 0.7rem;
  margin-bottom: -2.6rem;

  ${({ disabled }) => 
  disabled && 
  `
    border: 1px solid #999999;
    color: #999999;
    cursor: not-allowed;
  `
  }
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