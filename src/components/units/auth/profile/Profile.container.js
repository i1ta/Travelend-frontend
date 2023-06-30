import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import * as S from "./Profile.styles";
import MyProfile from "./MyProfile/MyProfile.container";
import MyCollections from "./MyCollections/MyCollections.container";
import Triplog from "./Triplog/Triplog.container";
import Messenger from "./Messenger/Messenger.container";

import { LoginState, NicknameState } from "@/States/LoginState";

import axios from "axios";

export default function Profile() {
  const [selectedCategory, setSelectedCategory] = useState("MyProfile");

  const router = useRouter();
  const onClickCategory = (event) => {
    setSelectedCategory(event.target.id);
  };
  return (
    <>
      <S.Container>
        <S.SideBar>
          <S.Image>사진 등록</S.Image>
          <S.Name>user01 님</S.Name>
          <S.Point>보유 포인트 0 p</S.Point>

          <S.CategoryWrapper>
            <S.Category
              id="MyProfile"
              onClick={onClickCategory}
              selectedCategory={selectedCategory}
            >
              My Profile
            </S.Category>
            <S.Category
              id="MyCollections"
              onClick={onClickCategory}
              selectedCategory={selectedCategory}
            >
              My Collections
            </S.Category>
            <S.Category
              id="Triplog"
              onClick={onClickCategory}
              selectedCategory={selectedCategory}
            >
              Triplog
            </S.Category>
            <S.Category
              id="Messenger"
              onClick={onClickCategory}
              selectedCategory={selectedCategory}
            >
              Messenger
            </S.Category>
          </S.CategoryWrapper>
          <S.LogoutWrapper>
            <S.LogoutImg src="/icon/logout.png" />
            <S.LogoutTxt>Logout</S.LogoutTxt>
          </S.LogoutWrapper>
        </S.SideBar>
        {selectedCategory === "MyProfile" && <MyProfile />}
        {selectedCategory === "MyCollections" && <MyCollections />}
        {selectedCategory === "Triplog" && <Triplog />}
        {selectedCategory === "Messenger" && <Messenger />}
      </S.Container>
    </>
  );
}
