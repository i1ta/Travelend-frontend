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
  const [mbtiIdx, setMbtiIdx] = useState(0);

  const [email, setEmail] = useState(props.data.email);
  const [phone, setPhone] = useState(props.data.phone);
  
  useEffect(() => {
    if(mbti === ''){
      setMbti(props.data.mbti);
    }
    if(email === '' && props.data.email != null){
      setEmail(props.data.email.split("@")[0]);
    }
    if(phone === ''){
      setPhone(props.data.phone);
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
    setMbti(e.target.innerText);

    for(let i = 0; i < 16; i++){
      if(mbtiList[i].name === e.target.innerText){
        setMbtiIdx(mbtiList[i].id);
        console.log(mbtiList[i].id);
      }
    }
    console.log(e.target.innerText);
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
        props.fetchMyProfile();
      })
      .catch((error) => console.error(error));
  };

  const onClickDelImg = async () => {
    await axios
      .delete(apiPath + "/profile/profile-picture")
      .then((response) => {
        console.log(response);
        props.fetchMyProfile();
      })
      .catch((error) => console.error(error));
  };

  const onModifyProfile = async () => {
    await props.modifyProfile(email, phone, mbtiIdx);
    await props.fetchMyProfile();

    setIsModify(false);
  }

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
            <S.ModifyTd>{props.data.name}</S.ModifyTd>
            <S.Tc>성별</S.Tc>
            {props.data.gender === 'M'
            ?
            <S.ModifyTd>남</S.ModifyTd>
            :
            <S.ModifyTd>여</S.ModifyTd>
            }
          </tr>
          <tr>
            <S.Tc>나이</S.Tc>
            <S.ModifyTd>{props.data.age}</S.ModifyTd>
            <S.Tc>MBTI</S.Tc>
            <S.ModifyTd>
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
            </S.ModifyTd>
          </tr>
          <tr>
            <S.Tc>이메일</S.Tc>
            <S.ModifyTd>
              <S.EmailWrapper>
              <S.EmailFirstInput
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <S.EmailAt>@</S.EmailAt>
              <S.EmailSecondSelect>
                <S.EmailOption>naver.com</S.EmailOption>
                <S.EmailOption>gmail.com</S.EmailOption>
              </S.EmailSecondSelect>
              </S.EmailWrapper>
            </S.ModifyTd>
            <S.Tc>연락처</S.Tc>
            <S.ModifyTd>
              <S.PhoneInput
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </S.ModifyTd>
          </tr>
          <tr>
            <S.Tc>프로필</S.Tc>
            <S.ModifyTd>
              <S.ProfileWrapper>
                <S.ProfileFileInput
                  id="upload-input"
                  type="file"
                  onChange={handleFileChange}
                />
              </S.ProfileWrapper>
            </S.ModifyTd>
            <S.Tc></S.Tc>
            <S.ModifyTd>
              <S.ProfileWrapper>
                <S.profileRegisterBtn onClick={onClickUploadImg}>등록</S.profileRegisterBtn>
                <S.profileBtn onClick={onClickDelImg}>
                  기본 프로필로 변경
                </S.profileBtn>
              </S.ProfileWrapper>
            </S.ModifyTd>
          </tr>

        </S.Table>
      </S.TableWrapper>

      <S.BtnWrapper>
        <S.Btn 
          type="button"
          onClick={onModifyProfile}>프로필 수정 완료</S.Btn>
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
              <S.Td>{email}</S.Td>
              <S.Tc>연락처</S.Tc>
              <S.Td>{formatPhone(phone)}</S.Td>
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