import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from "react-hook-form";

import * as S from "./ChnPw.styles";

import Axios from "@/apis";

export default function ChnPwForm() {
  const router = useRouter();
  const { register, handleSubmit, getValues, formState: {errors} } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 최소 8자, 하나의 문자, 숫자, 특수 문자를 포함해야 함


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
      const response = await Axios.post(
        '/user/password/change',
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
      <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputWrapper>
          <S.Wrapper>
            <S.Label htmlFor='nameInput'>새로운 비밀번호</S.Label>
            <S.Input
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
              {errors.newPw && (<S.ErrorMsg>{errors.newPw.message}</S.ErrorMsg>)}
          </S.Wrapper>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Wrapper>
            <S.Label htmlFor='phoneInput'>새로운 비밀번호 확인</S.Label>
            <S.Input
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
              <S.ErrorMsg>{errors.newPwChk.message}</S.ErrorMsg>)
            }
          </S.Wrapper>
        </S.InputWrapper>
        
        <S.ButtonWrapper>
          <S.OKButton type="submit">OK</S.OKButton>
        </S.ButtonWrapper>
      </S.Form>
    </S.Container>
    </>
  );
}