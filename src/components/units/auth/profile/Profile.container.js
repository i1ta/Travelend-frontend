import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
  const [_, setIsLoggedIn] = useRecoilState(LoginState);
  const loginState = useRecoilValue(LoginState);
  const nicknameState = useRecoilValue(NicknameState);

  const router = useRouter();
  const onClickCategory = (event) => {
    setSelectedCategory(event.target.id);
  };

  const [myProfileData, setMyProfileData] = useState({
    name: "",
    age: 0,
    email: "",
    gender: "",
    mbti: "",
    phone: "",
    address: "",
    profileUrl: "",
    firstTripStyle: "",
    secondTripStyle: "",
    thirdTripStyle: "",
  });
  const apiPath = "https://api.tripyle.xyz";

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");
    const fetchMyProfile = async () => {
      await axios
        .get(apiPath + "/profile/my-profile")
        .then((response) => {
          const responseData = { ...response.data };
          setMyProfileData(responseData);
        })
        .catch((error) => console.error(error));
    };
    if (selectedCategory === "MyProfile") fetchMyProfile();

    // 언마운트시 api요청 취소시키는 과정 반드시 필요...ㅠㅠ
    return () => {};
  }, [selectedCategory]);

  const onClickLogout = () => {
    const result = confirm("로그아웃 하시겠습니까?");
    if (result) {
      router.push("/main");
      setIsLoggedIn(false);
      alert("로그아웃 완료");
    }
  };

  return (
    <>
      <S.Container>
        <S.SideBar>
          <S.Image>사진 등록</S.Image>
          {loginState && <S.Name>{nicknameState} 님</S.Name>}
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
          <S.LogoutWrapper onClick={onClickLogout}>
            <S.LogoutImg src="/icon/logout.png" />
            <S.LogoutTxt>Logout</S.LogoutTxt>
          </S.LogoutWrapper>
        </S.SideBar>
        {selectedCategory === "MyProfile" && <MyProfile data={myProfileData} />}
        {selectedCategory === "MyCollections" && <MyCollections />}
        {selectedCategory === "Triplog" && <Triplog />}
        {selectedCategory === "Messenger" && <Messenger />}
      </S.Container>
    </>
  );
}
