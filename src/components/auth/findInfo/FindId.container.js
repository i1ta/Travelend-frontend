import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from 'react';

import * as S from "./FindId.styles";

import axios from 'axios';

export default function FindIdForm() {
  const { register, handleSubmit, getValues, watch, formState: {errors} } = useForm();
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

  // Ok 버튼 클릭 시
  const onSubmit = async (e) => {
    try {      
      console.log(e);
      setIsSubmitting(true);
      const requestData = {
        "name": getValues("name"),
        "phone": getValues("phone")
      }
      // 휴대폰 인증 완료했을 경우
      if(authConfirm === true){
        const response = await axios.post(
          'https://api.tripyle.xyz/user/auth/name',
          requestData,
          {"Content-Type": "application/json; charset=utf-8"}
        );
        if (response.status === 200) {
          console.log(response.data.data.username);
          alert(response.data.data.username);
        } 
      } else {
        alert('휴대폰 인증을 먼저 진행해주세요.');
      }
    } catch (error) {
      if(error.response.status === 400){
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };

  // 휴대폰 인증 버튼 클릭 시
  const [authenticationNum, setAuthenticationNum] = useState('');
  const onSubmitCertification = async (e) => {
    try {
      console.log(e);
      console.log(getValues("phoneChk"));
      
      // 인증 번호 받기 버튼
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
          setAuthenticationNum(response.data.data);
        
        } 
      }
      // 인증 번호 확인 버튼
      else {
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
      <S.Container>
      <S.Title>아이디 찾기</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputWrapper>
          <S.Wrapper>
            <S.Label htmlFor='nameInput'>이름</S.Label>
            <S.Input
              id="nameInput"
              type="text"
              placeholder="name"
              required
              {...register("name")}
            />
          </S.Wrapper>
        </S.InputWrapper>
          <S.InputWrapper>
            <S.Wrapper>
              <S.Label htmlFor='phoneInput'>휴대폰 번호</S.Label>
          <S.Input
            id="phoneInput"
            placeholder="phone number"
            {...register("phone")}
              />
              </S.Wrapper>
          <S.PhoneBtn
            type="submit"
            disabled={phoneNumberOk || certificationOk}
            onClick={handleSubmit(onSubmitCertification)}
          >
            인증번호 받기
          </S.PhoneBtn>
        </S.InputWrapper>
        {certificationOk && (
          <S.InputWrapper>
            <S.Input
              id="phoneInput"
              placeholder=""
              required
              {...register("phoneChk")}
            />
              <S.Button
                type="button"
                onClick={onSubmitCertification}
              >
              인증번호 확인
            </S.Button>
          </S.InputWrapper>
          )}
          <S.ButtonWrapper>
            <S.OKButton type="submit">OK</S.OKButton>
          </S.ButtonWrapper>
      </S.Form>
    </S.Container>
    </>
  );
}
