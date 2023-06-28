import { useEffect, useState } from "react";

import * as S from "./MyProfile.styles";
import axios from "axios";

export default function MyProfile(props) {
  // const [data, setData] = useState({
  //   name: "",
  //   age: 0,
  //   email: "",
  //   gender: "",
  //   mbti: "",
  //   phone: "",
  //   address: "",
  //   profileUrl: "",
  //   firstTripStyle: "",
  //   secondTripStyle: "",
  //   thirdTripStyle: "",
  // });
  // const apiPath = "https://api.tripyle.xyz";

  // useEffect(async () => {
  //   axios.defaults.headers.common["x-auth-token"] =
  //     window.localStorage.getItem("login-token");
  //   await axios
  //     .get(apiPath + "/profile/my-profile")
  //     .then((response) => {
  //       const responseData = { ...response.data };
  //       setData(responseData);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const formatPhone = (phoneNum) => {
    const regex = /^(\d{3})(\d{4})(\d{4})$/;
    return phoneNum.replace(regex, "$1-$2-$3");
  };

  return (
    <>
      <S.MyProfileWrapper>
        <S.Title>My Profile</S.Title>
        <S.TableWrapper>
          <S.Table>
            <tr>
              <S.Tc>이름</S.Tc>
              <S.Td>{props.data.name}</S.Td>
              <S.Tc>거주지</S.Tc>
              <S.Td>{props.data.address}</S.Td>
            </tr>
            <tr>
              <S.Tc>나이</S.Tc>
              <S.Td>{props.data.age}</S.Td>
              <S.Tc>선호 인원수</S.Tc>
              <S.Td>null</S.Td>
            </tr>
            <tr>
              <S.Tc>이메일</S.Tc>
              <S.Td>{props.data.email}</S.Td>
              <S.Tc>MBTI</S.Tc>
              <S.Td>{props.data.mbti}</S.Td>
            </tr>
            <tr>
              <S.Tc>연락처</S.Tc>
              <S.Td>{formatPhone(props.data.phone)}</S.Td>
              <S.Tc>여행 스타일</S.Tc>
              <S.Td>{props.data.firstTripStyle}</S.Td>
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
