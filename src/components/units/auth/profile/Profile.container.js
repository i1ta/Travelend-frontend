import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import * as S from "./Profile.styles";

import { LoginState, NicknameState } from '@/States/LoginState';

import axios from 'axios';

export default function Profile() {
    const router = useRouter();
    return(
        <>
            <div>
                <h2>일타최고 Trip'yler</h2>
                <div>
                    <div>
                        <div>사진 등록</div>
                        <div>보유 포인트</div>
                    </div>
                    <div>
                        <div>
                            <span>이름</span>
                            <span>김일타</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}