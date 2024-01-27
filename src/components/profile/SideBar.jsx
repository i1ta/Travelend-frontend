import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  IsAdmin,
  JwtTokenState,
  LoginState,
  logout,
} from "../../States/LoginState.js";

import { IoPower } from "react-icons/io5";

export default function SideBar({ notMyProfildData }) {
  const router = useRouter();
  const { category } = router.query;
  const [myProfileData, setMyProfileData] = useState({});
  const [selectedFile, setSelectedFile] = useState(myProfileData.profileUrl);

  const setIsLoggedIn = useSetRecoilState(LoginState);
  const setIsAdmin = useSetRecoilState(IsAdmin);
  const setJwtToken = useSetRecoilState(JwtTokenState);

  const onClickCategory = (event) => {
    router.push(`/auth/profile?category=${event.currentTarget.id}`);
  };

  const onClickLogout = () => {
    const result = confirm("로그아웃 하시겠습니까?");
    if (result) {
      window.localStorage.clear();
      router.push("/");
      logout({ setJwtToken });
      setIsLoggedIn(false);
      setIsAdmin(false);
      alert("로그아웃 완료");
    }
  };

  const [isOpenBlock, setIsOpenBlock] = useState(false);
  const toggleBlock = () => {
    setIsOpenBlock((prev) => !prev);
  };

  const [isOpenReport, setIsOpenReport] = useState(false);
  const toggleReport = () => {
    setIsOpenReport((prev) => !prev);
  };

  return (
    <>
      {router.query.userId ? (
        <SideNotBar>
          <ProfileImage>
            <img
              src={notMyProfildData?.profileUrl || "/icon/defaultProfile.png"}
              alt="profileUrl"
            />
          </ProfileImage>
          <Name>{notMyProfildData?.username} 님의 프로필</Name>
          <ProfileLine></ProfileLine>

          <BlockWrapper>
            <BlockTxt onClick={toggleReport}>신고</BlockTxt>
            <BlockHypen />
            <BlockTxt onClick={toggleBlock}>차단</BlockTxt>
          </BlockWrapper>
        </SideNotBar>
      ) : (
        <Container>
          <ProfileImage>
            <img 
              src={selectedFile || "/icon/defaultProfile.png"} 
              alt="selectedFile"
            />
          </ProfileImage>

          <Name>{myProfileData?.username || "user"} 님</Name>

          <CategoryWrapper>
            <Category
              id="MyProfile"
              onClick={onClickCategory}
              category={category}
            >
              My Profile
            </Category>
            <Category
              id="MyCollections"
              onClick={onClickCategory}
              category={category}
            >
              My Collections
            </Category>
            <Category
              id="Triplog"
              onClick={onClickCategory}
              category={category}
            >
              Triplog
            </Category>
            <Category
              id="Messenger"
              onClick={onClickCategory}
              category={category}
            >
              Messenger
            </Category>
          </CategoryWrapper>
          <Logout onClick={onClickLogout}>
            <IoPower style={{ color: "#999", fontSize: "20px" }} />
            <div>Logout</div>
          </Logout>
        </Container>
      )}
    </>
  );
}

const Container = styled.section`
  width: 280px;
  background-color: white;
  box-shadow: 1px 0px 5px #ddd;
  z-index: 50;
  padding: 28px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SideNotBar = styled(SideBar)`
  padding: 250px 0;
`;

const ProfileLine = styled.div`
  width: 250px;
  height: 1px;
  background-color: #999999;
  margin-bottom: 1.5rem;
`;

const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BlockTxt = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #c8b6ff;
  }
`;

const BlockHypen = styled.div`
  width: 1px;
  height: 15px;
  background: #999;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e6e6e6;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Name = styled.div`
  color: #666666;
  font-size: 24px;
  font-weight: 700;
`;

const CategoryWrapper = styled.div`
  width: 80%;
  border-top: 1px solid #ddd;
  padding: 24px 0;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Category = styled.button`
  width: 100%;
  padding: 16px 0;
  font-size: 16px;
  border-radius: 10px;
  text-align: center;

  background-color: ${({ category, id, theme }) =>
    category == id ? theme.colors.main1 : "#ffffff"};
  color: ${({ category, id }) => (category == id ? "#ffffff" : "#666666")};
`;

const Logout = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  div {
    font-size: 16px;
    color: #999999;
  }
`;
