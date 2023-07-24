import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

import * as S from "./Profile.styles";
import Modal from "../../../commons/Modal/Modal";
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
    namePrivate: false,
    username: "",
    age: 0,
    email: "",
    gender: "",
    mbti: "",
    mbtiPrivate: false,
    phone: "",
    phonePrivate: false,
    address: "",
    profileUrl: "",
    instagram: "",
    instagramPrivate: false,
    firstTripStyle: "",
    secondTripStyle: "",
    thirdTripStyle: "",
    firstBio: "",
    secondBio: "",
    thirdBio: "",
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
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");
      
    await axios
      .get(apiPath + "/profile/my-profile")
      .then((response) => {
        console.log(response);
        const responseData = { ...response.data.data };
        setMyProfileData(responseData);
        console.log(responseData);
      })
      .catch((error) => console.error(error));
  };

  
  // My Profile 수정 api
  const modifyProfile = async (getInsta, getPhone, getMbtiIdx, getHashtag, getBio) => {
    console.log(getInsta, getPhone, getMbtiIdx, getHashtag);
    console.log(myProfileData.firstBio, myProfileData.secondBio, myProfileData.thirdBio);
    console.log(getHashtag[0]?.id, getHashtag[1]?.id, getHashtag[2]?.id);
    console.log(getBio[0], getBio[1], getBio[2]);
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    if(selectedFile === "/icon/defaultProfile.png"){
      await onClickDelImg();
    } else {
      await onClickUploadImg();
    }

    await axios
      .patch(apiPath + "/profile/my-profile/update", {
        "firstBio": getBio[0] || '',
        "firstTripStyleId": getHashtag[0]?.id || 0,
        "instagram": getInsta,
        "mbtiId": getMbtiIdx,
        "phone": getPhone,
        "secondBio": getBio[1] || '',
        "secondTripStyleId": getHashtag[1]?.id || 0,
        "thirdBio": getBio[2] || '',
        "thirdTripStyleId": getHashtag[2]?.id || 0
      }, { "Content-Type": "application/json" })
      .then((response) => {
        console.log(response);
        const responseData = { ...response.data.data };
        setMyProfileData(responseData);
      })
      .catch((error) => console.error(error));
  }

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
    console.log(event.target);
    event.preventDefault();
    handleSendMsg(event.target.message.value);
    event.target.reset(); // 적용 안 됨
  };

  // 채팅방 내용 읽어오는 api
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
      window.localStorage.clear();
      router.push("/main");
      setIsLoggedIn(false);
      alert("로그아웃 완료");
    }
  };

  const [isModify, setIsModify] = useState(true);
  const [isModalOn, setIsModalOn] = useState(false);

  const handleModify = (value) => {
    setIsModify(value);
  }
  // 프로필이미지 api
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(myProfileData.profileUrl);
  const [selectedUrl, setSelectedUrl] = useState(selectedFile); 
  const [chnFile, setChnFile] = useState(selectedFile); // 모달창에서 보이는 이미지 url

  useEffect(() => {
    if(selectedFile === ''){setSelectedFile(myProfileData.profileUrl)};
  }, [myProfileData])

  const handleFileChange = (event) => {
    setChnFile(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setSelectedUrl(reader.result);
    }
    setIsProfileModal(true);
  };

  useEffect(() => {},[selectedFile]);
  const onClickUploadImg = async () => {
    const formData = new FormData();
    formData.append("images", chnFile);

    await axios
      .post(apiPath + "/profile/profile-picture", formData)
      .then((response) => {
        console.log(response);
        fetchMyProfile();
        setSelectedFile(selectedUrl);
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

  const handleCloseProfileModal = () => {
    setIsProfileModal(false);
  }

  const [isModifyCheckModal, setIsModifyCheckModal] = useState(false);
  const handleSubmitProfileModal = async (e) => {
    // setIsModifyCheckModal(true);
    setSelectedFile(selectedUrl);
    setIsProfileModal(false);
    console.log(selectedFile);
  }

  return (
    <>
    {isModify
    ?
      (<S.Container>
        <S.SideBar>
          
          <S.ProfileImage data={selectedFile}>
            <S.DefaultProfile
              src={selectedFile || "/icon/defaultProfile.png"}
              data={selectedFile}
            />
          </S.ProfileImage>
          
          <S.Name>{myProfileData.username} 님</S.Name>

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
        {selectedCategory === "MyProfile" && <MyProfile 
          data={myProfileData} 
          modifyProfile={modifyProfile} 
          fetchMyProfile={fetchMyProfile}
          setModify={handleModify}
        />}
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
      )
      :
      (
        <S.Container>
        <S.SideBar>
          <S.ProfileImage data={selectedFile}>
            <S.DefaultProfile
              src={selectedFile || "/icon/defaultProfile.png"}
              data={selectedFile}
            />
          </S.ProfileImage>

          <S.Name>{myProfileData.username} 님</S.Name>
          
          <S.profileFileBtn htmlFor="upload-input">프로필 업로드</S.profileFileBtn>
          <input
            id="upload-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {isProfileModal && (
            <S.ModalOverlay>
              <S.Modal>
                <S.ModalTitle>프로필</S.ModalTitle>
                <S.ModalMbtiWrapper>
                <S.ProfileImage data={selectedUrl}>
                  <S.DefaultProfile
                    src={selectedUrl || "/icon/defaultProfile.png"}
                    data={selectedUrl}
                  />
                </S.ProfileImage>
                </S.ModalMbtiWrapper>
                <S.ModalLine></S.ModalLine>
                <S.ModalProfileExplain>실제 화면에 표시되는 부분입니다.</S.ModalProfileExplain>
                <S.ModalBtnWrapper>
                  <S.ModalCancelBtn onClick={handleCloseProfileModal}>
                    취소
                  </S.ModalCancelBtn>
                  <S.ModalSubmitBtn onClick={(e) => handleSubmitProfileModal()}>
                    등록
                  </S.ModalSubmitBtn>
                </S.ModalBtnWrapper>
              </S.Modal>
            </S.ModalOverlay>
          )}

          {isModifyCheckModal && (<Modal setIsModifyCheckModal={setIsModifyCheckModal} onModifyProfile={handleSubmitProfileModal}/>)}
          <S.profileBtn onClick={(e) => setSelectedFile("/icon/defaultProfile.png")}>
            기본 프로필로 변경
          </S.profileBtn>
        </S.SideBar>
        {selectedCategory === "MyProfile" && <MyProfile 
          data={myProfileData} 
          isProfileModal={isModalOn}
          selectedFile={selectedFile}
          modifyProfile={modifyProfile} 
          fetchMyProfile={fetchMyProfile} 
          setModify={handleModify}
        />}
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
      )
    }
    </>
  );
}