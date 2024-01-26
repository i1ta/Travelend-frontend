import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

import * as S from "./FindPw.styles";

import Axios from "@/apis";

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
        const response = await Axios.post(
          '/user/auth/username',
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
        const response = await Axios.post(
          '/user/authentication-code/send',
          requestData,
          {"Content-Type": "application/json; charset=utf-8"}
        );
        if (response.status === 200) {
          console.log(response);
          setAuthenticationNum(response.data);
        }
      } else {
        console.log(authenticationNum);
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
      <S.Title>비밀번호 찾기</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputWrapper>
          <S.Wrapper>
            <S.Label htmlFor='idInput'>아이디</S.Label>
            <S.Input
              id="idInput"
              placeholder="ID"
              required
              {...register("id")}
            />
          </S.Wrapper>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Wrapper>
            <S.Label htmlFor='phoneInput'>휴대폰 번호</S.Label>
            <S.Input
              id="phoneInput"
              placeholder="phone number"
              required
              {...register("phone", {
                required: true,
                minLength: 11,
              })}
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
