import { useEffect, useState } from "react";

import * as S from "./MyProfile.styles";
import axios from "axios";

export default function MyProfile(props) {
  const formatPhone = (phoneNum) => {
    const regex = /^(\d{3})(\d{4})(\d{4})$/;
    return phoneNum.replace(regex, "$1-$2-$3");
  };

  const [mbtiList, setMbtiList] = useState([]);
  const [mbti, setMbti] = useState(props.data.mbti);
  
  useEffect(() => {
    if(mbti === ''){
      setMbti(props.data.mbti);
    }
  }, [props]);

  const [isModify, setIsModify] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const apiPath = "https://api.tripyle.xyz";

  useEffect(() => {
    console.log(isModify);
  }, [isModify]);

  const handleOpenModal = async () => {
    await axios
      .get(apiPath + "/profile/mbti")
      .then( async (response) => {
        console.log(response);
        await setMbtiList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(mbtiList);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitModal = (e) => {
    console.log(e.target.innerText);
    setMbti(e.target.innerText);
    handleCloseModal();
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
    {isModify 
    ?
        (<S.MyProfileWrapper>
      <S.StyleTitleWrapper>
        <S.StyleTitle>My Style</S.StyleTitle>
        {props.data.firstTripStyle &&
        (<S.StyleHashTag>#{props.data.firstTripStyle}</S.StyleHashTag>)}
        {props.data.secondTripStyle &&
        (<S.StyleHashTag>#{props.data.secondTripStyle}</S.StyleHashTag>)}
        {props.data.thirdTripStyle &&
        (<S.StyleHashTag>#{props.data.thirdTripStyle}</S.StyleHashTag>)}
      </S.StyleTitleWrapper>

      <S.StyleWrapper>
        <S.StyleContent>저는 북유럽 쪽을 좋아하고 즉흥적으로 많이 여행을 떠나는 편입니다!</S.StyleContent> 
      </S.StyleWrapper>

      <S.Title>My Profile</S.Title>
      <S.TableWrapper>
        <S.Table>
          <tr>
            <S.Tc>이름</S.Tc>
            <S.Td>{props.data.name}</S.Td>
            <S.Tc>성별</S.Tc>
            {props.data.gender === 'M'
            ?
            <S.Td>남</S.Td>
            :
            <S.Td>여</S.Td>
            }
          </tr>
          <tr>
            <S.Tc>나이</S.Tc>
            <S.Td>{props.data.age}</S.Td>
            <S.Tc>MBTI</S.Tc>
            <S.Td>
              <S.mbti onClick={handleOpenModal}>{mbti}</S.mbti>
              {isModalOpen && (
            <S.ModalOverlay>
              <S.Modal>
                <S.ModalTitle>MBTI</S.ModalTitle>
                <S.ModalMbtiWrapper>
                  {mbtiList.map((ele)=> (
                    <S.ModalMbtiContent key={ele.id} onClick={handleSubmitModal}>{ele.name}</S.ModalMbtiContent>
                  ))}
                </S.ModalMbtiWrapper>
                <S.ModalBtnWrapper>
                  <S.ModalCancelBtn onClick={handleCloseModal}>
                    취소
                  </S.ModalCancelBtn>
                  <S.ModalSubmitBtn onClick={handleSubmitModal}>
                    확인
                  </S.ModalSubmitBtn>
                </S.ModalBtnWrapper>
              </S.Modal>
            </S.ModalOverlay>
          )}
            </S.Td>
          </tr>
          <tr>
            <S.Tc>이메일</S.Tc>
            <S.Td>
              <S.EmailFirstInput
                type="text"
              />
              <S.EmailAt>@</S.EmailAt>
              <S.EmailSecondSelect>
                <S.EmailOption>naver.com</S.EmailOption>
                <S.EmailOption>gmail.com</S.EmailOption>
              </S.EmailSecondSelect>
            </S.Td>
            <S.Tc>연락처</S.Tc>
            <S.Td>
              <S.EmailFirstInput
                type="text"
              />
            </S.Td>
          </tr>
          <tr>
            <S.Tc>프로필</S.Tc>
            <S.Td>
              <S.ProfileWrapper>
                <input
                  id="upload-input"
                  type="file"
                  onChange={handleFileChange}
                />
                <S.profileBtn onClick={onClickUploadImg}>등록</S.profileBtn>
                <S.profileBtn onClick={onClickDelImg}>
                  기본 프로필로 변경
                </S.profileBtn>
              </S.ProfileWrapper>
            </S.Td>
          </tr>

        </S.Table>
      </S.TableWrapper>

      <S.BtnWrapper>
        <S.Btn onClick={props.modifyProfile}>프로필 수정 완료</S.Btn>
      </S.BtnWrapper>
    </S.MyProfileWrapper>)
      :
      (<S.MyProfileWrapper>
        <S.StyleTitleWrapper>
          <S.StyleTitle>My Style</S.StyleTitle>
          {props.data.firstTripStyle &&
          (<S.StyleHashTag>#{props.data.firstTripStyle}</S.StyleHashTag>)}
          {props.data.secondTripStyle &&
          (<S.StyleHashTag>#{props.data.secondTripStyle}</S.StyleHashTag>)}
          {props.data.thirdTripStyle &&
          (<S.StyleHashTag>#{props.data.thirdTripStyle}</S.StyleHashTag>)}
        </S.StyleTitleWrapper>
  
        <S.StyleWrapper>
          <S.StyleContent>저는 북유럽 쪽을 좋아하고 즉흥적으로 많이 여행을 떠나는 편입니다!</S.StyleContent> 
        </S.StyleWrapper>
  
        <S.Title>My Profile</S.Title>
        <S.TableWrapper>
          <S.Table>
            <tr>
              <S.Tc>이름</S.Tc>
              <S.Td>{props.data.name}</S.Td>
              <S.Tc>성별</S.Tc>
              {props.data.gender === 'M'
              ?
              <S.Td>남</S.Td>
              :
              <S.Td>여</S.Td>
              }
            </tr>
            <tr>
              <S.Tc>나이</S.Tc>
              <S.Td>{props.data.age}</S.Td>
              <S.Tc>MBTI</S.Tc>
              <S.Td>{mbti}</S.Td>
            </tr>
            <tr>
              <S.Tc>이메일</S.Tc>
              <S.Td>{props.data.email}</S.Td>
              <S.Tc>연락처</S.Tc>
              <S.Td>{formatPhone(props.data.phone)}</S.Td>
            </tr>
  
          </S.Table>
        </S.TableWrapper>
  
        <S.BtnWrapper>
          <S.Btn onClick={() => setIsModify(true)}>프로필 수정</S.Btn>
        </S.BtnWrapper>
      </S.MyProfileWrapper>
      )
  
    }
    </>
  );
}