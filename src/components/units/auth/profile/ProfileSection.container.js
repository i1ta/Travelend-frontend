import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import * as S from "./ProfileSection.styles";

import { LoginState, NicknameState } from '@/States/LoginState';

import axios from 'axios';

export default function Profile() {
    const router = useRouter();

    // 로그인 여부 확인
    const loginState = useRecoilValue(LoginState);
    const nicknameState = useRecoilValue(NicknameState);
    return(
        <>
                <S.Section>
                    <S.Image>사진 등록</S.Image>
                    {loginState &&
                        (<S.Name>{nicknameState} 님</S.Name>)
                    }
                    <S.Point>보유 포인트 0 p</S.Point>

                    <S.CategoryWrapper>
                        <S.Category selected><S.Link href='/auth/profile' selected>My Propile</S.Link></S.Category>
                        <S.Category>Like & Scrap</S.Category>
                        <S.Category>Triplog</S.Category>
                        <S.Category>Messenger</S.Category>
                    </S.CategoryWrapper>

                    <S.Logout>Logout</S.Logout>
                </S.Section>
                
        </>
    );
}