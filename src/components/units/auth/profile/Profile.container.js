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

  // My Profile api
  const fetchMyProfile = async () => {
    await axios
      .get(apiPath + "/profile/my-profile")
      .then((response) => {
        const responseData = { ...response.data };
        setMyProfileData(responseData);
      })
      .catch((error) => console.error(error));
  };

  // api 요청
  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    if (selectedCategory === "MyProfile") fetchMyProfile();

    // Messenger api
    const fetchMsgList = async () => {
      await axios
        .get(apiPath + "/chat/chatroom-list")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.error(error));
    };
    if (selectedCategory === "Messenger") fetchMsgList();

    // 언마운트시 api요청 취소시키는 과정 반드시 필요...ㅠㅠ
    return () => {};
  }, [selectedCategory]);

  // 쪽지 보내기 api
  const onClickSendMsg = async () => {
    await axios
      .post(apiPath + "/chat/send", {
        content: "안녕하세요오오",
        recipientId: user02,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  const onClickLogout = () => {
    const result = confirm("로그아웃 하시겠습니까?");
    if (result) {
      router.push("/main");
      setIsLoggedIn(false);
      alert("로그아웃 완료");
    }
  };

  // 프로필이미지 api
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
  };

  const onClickUploadImg = async () => {
    const formData = new FormData();
    formData.append("images", selectedFile);

    await axios
      .post(apiPath + "/profile/profile-picture", formData)
      .then((response) => {
        console.log(response);
        fetchMyProfile();
      })
      .catch((error) => console.error(error));
  };

  const onClickDelImg = async () => {
    await axios
      .delete(apiPath + "/profile/profile-picture")
      .then((response) => {
        console.log(response);
        fetchMyProfile();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <S.Container>
        <S.SideBar>
          <S.ProfileImage data={myProfileData}>
            <S.defaultProfile
              src={myProfileData.profileUrl || "/icon/defaultProfile.png"}
              data={myProfileData}
            />
          </S.ProfileImage>
          <S.profileFileBtn htmlFor="upload-input">파일 선택</S.profileFileBtn>
          <input
            id="upload-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <S.profileBtn onClick={onClickUploadImg}>등록</S.profileBtn>
          <S.profileBtn onClick={onClickDelImg}>기본 프로필로 변경</S.profileBtn>
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
