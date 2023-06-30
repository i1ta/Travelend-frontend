import { useEffect } from 'react';
import {useRouter} from 'next/router';
import { useRecoilValue } from "recoil";

import { LoginState, NicknameState } from "../../../../../States/LoginState";

import * as S from './MyProfile.styles'

export default function MyProfile() {
  const router = useRouter();
  const loginState = useRecoilValue(LoginState);

  useEffect(() => {
    if(!loginState){
      alert('로그인을 해주세요.');
      router.push('/auth/signIn');
    }
  }, []);

  return (
    <>
      <S.MyProfileWrapper>
        <S.Title>My Profile</S.Title>
        <S.TableWrapper>
          <S.Table>
            <tr>
              <S.Tc>이름</S.Tc>
              <S.Td>{localStorage.getItem("name")}</S.Td>
              <S.Tc>거주지</S.Tc>
              <S.Td>{localStorage.getItem("bio")}</S.Td>
            </tr>
            <tr>
              <S.Tc>나이</S.Tc>
              <S.Td>{localStorage.getItem("age")}</S.Td>
              <S.Tc>선호 인원수</S.Tc>
              <S.Td>2명</S.Td>
            </tr>
            <tr>
              <S.Tc>이메일</S.Tc>
              <S.Td>{localStorage.getItem("email")}</S.Td>
              <S.Tc>MBTI</S.Tc>
              <S.Td>{localStorage.getItem("mbti")}</S.Td>
            </tr>
            <tr>
              <S.Tc>연락처</S.Tc>
              <S.Td>{localStorage.getItem("phone")}</S.Td>
              <S.Tc>여행 스타일</S.Tc>
              <S.Td>{localStorage.getItem("firstTripStyle")}</S.Td>
            </tr>
          </S.Table>
        </S.TableWrapper>

        <S.BtnWrapper>
          <S.Btn>프로필 수정</S.Btn>
        </S.BtnWrapper>
      </S.MyProfileWrapper>
    </>
  );
}
