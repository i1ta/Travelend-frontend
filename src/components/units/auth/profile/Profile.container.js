import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import * as S from "./Profile.styles";
import MyProfile from "./MyProfile/MyProfile.container";
import MyCollections from "./MyCollections/MyCollections.container";
import Triplog from "./Triplog/Triplog.container";
import Messenger from "./Messenger/Messenger.container";

import { LoginState } from "@/States/LoginState";

import axios from "axios";

export default function Profile() {
  const [selectedCategory, setSelectedCategory] = useState("MyProfile");
  const [_, setIsLoggedIn] = useRecoilState(LoginState);
  const apiPath = "https://api.tripyle.xyz";

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

  const [msgListData, setMsgListData] = useState([]);
  const [msgData, setMsgData] = useState({
    chatRoomId: "",
    name: "",
    profileUrl: "",
    recipientId: 0,
    chatContents: [],
  });

  // My Profile api
  const fetchMyProfile = async () => {
    await axios
      .get(apiPath + "/profile/my-profile")
      .then((response) => {
        const responseData = { ...response.data.data };
        setMyProfileData(responseData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    if (selectedCategory === "MyProfile") fetchMyProfile();

    // 쪽지 목록 api
    const fetchMsgList = async () => {
      await axios
        .get(apiPath + "/chat/chatroom-list")
        .then((response) => {
          setMsgListData([...response.data.data]);
        })
        .catch((error) => console.error(error));
    };
    if (selectedCategory === "Messenger") fetchMsgList();
    console.log(msgData);

    return () => {};
  }, [selectedCategory]);

  // 쪽지 보내기 api
  const handleSendMsg = async (message) => {
    await axios
      .post(apiPath + "/chat/send", {
        content: message,
        recipientId: msgData.recipientId,
      })
      .then(async (response) => {
        console.log(response);
        const result = await fetchMsgContents(msgData.chatRoomId);
        setMsgData((prev) => ({
          ...prev,
          chatContents: result,
        }));
      })
      .catch((error) => console.error(error));
  };

  const onSubmitSendMsg = (event) => {
    event.preventDefault();
    handleSendMsg(event.target.message.value);
    event.target.reset();
  };

  // 쪽지 내용 api
  const fetchMsgContents = async (chatRoomId) => {
    try {
      const response = await axios.get(apiPath + "/chat/" + chatRoomId);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const onClickMsgList = async (chatRoomId, name, profileUrl, recipientId) => {
    try {
      const result = await fetchMsgContents(chatRoomId);
      setMsgData({
        chatRoomId,
        name,
        profileUrl,
        recipientId,
        chatContents: result,
      });
    } catch (error) {
      console.error(error);
    }
    console.log(msgData);
  };

  // 로그아웃 버튼
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
          <S.profileBtn onClick={onClickDelImg}>
            기본 프로필로 변경
          </S.profileBtn>
          <S.Name>{myProfileData.username} 님</S.Name>
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
        {selectedCategory === "Messenger" && (
          <Messenger
            msgListData={msgListData}
            msgData={msgData}
            onSubmitSendMsg={onSubmitSendMsg}
            onClickMsgList={onClickMsgList}
          />
        )}
      </S.Container>
    </>
  );
}
