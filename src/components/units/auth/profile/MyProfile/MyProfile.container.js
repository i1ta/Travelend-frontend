import { useEffect, useState } from "react";

import * as S from "./MyProfile.styles";
import Modal from "../../../../commons/Modal/Modal";
import axios from "axios";

export default function MyProfile(props) {
  const formatPhone = (phoneNum) => {
    const regex = /^(\d{3})(\d{4})(\d{4})$/;
    return phoneNum.replace(regex, "$1-$2-$3");
  };

  const [mbtiList, setMbtiList] = useState([]);
  const [mbti, setMbti] = useState(props.data.mbti);
  const [mbtiIdx, setMbtiIdx] = useState(0);

  const [email, setEmail] = useState(props.data.email); // 이메일
  const [phone, setPhone] = useState(props.data.phone); // 휴대폰 번호
  const [selected, setSelectedEmail] = useState('naver.com'); // email 뒷 부분

  const [myHashtag, setMyHashtag] = useState([]); // hashtag
  const [hashtagList, setHashtagList] = useState([]);
  const [hashtagName, setHashtagName] = useState([props.data.firstTripStyle, props.data.secondTripStyle, props.data.thirdTripStyle]);
  // const [hashtagId, setHashtagId] = useState([]);
  const hashtagId = [];
  
  const startSetting = async () => {
    if(mbti === ''){
      setMbti(props.data.mbti);
    }
    if(email === '' && props.data.email != null){
      setEmail(props.data.email);
    }
    if(phone === ''){
      setPhone(props.data.phone);
    }
    console.log(myHashtag);
    if(myHashtag.length === 0){
      await axios
      .get(apiPath + "/hashtag/list")
      .then((response) => {
        setHashtagList([...response.data.data]);
      })
      .catch((error) => {
        console.error(error);
      });

      setHashtagName([props.data.firstTripStyle, props.data.secondTripStyle, props.data.thirdTripStyle]);
      
      console.log(hashtagList, hashtagName);
      hashtagList.forEach((hashtag) => {
        if (hashtagName.includes(hashtag.name)) {
          hashtagId.push(hashtag.id);
        }
      });
      
      console.log(hashtagId);
      setMyHashtag([{ id: hashtagId[0], name: props.data.firstTripStyle }, { id: hashtagId[1], name: props.data.secondTripStyle }, { id: hashtagId[2], name: props.data.thirdTripStyle }]);
    }
  };

  useEffect(() => {startSetting()}, [props]);

  const [isModify, setIsModify] = useState(false); // 수정 여부
  const [isModalOpen, setModalOpen] = useState(false); // mbti 모달
  const [isProfileModal, setIsProfileModal] = useState(false); // 프로필 모달
  const [isModifyCheckModal, setIsModifyCheckModal] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false); // 스타일 모달

  const apiPath = "https://api.tripyle.xyz";

  useEffect(() => {
    console.log(isModify);
  }, [isModify]);

  useEffect(() => {
    if(props.isProfileModal === true){
      setSelectedFile(props.selectedFile);
      setIsProfileModal(true);
    }
  }, [props.isProfileModal])


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

  const handleCloseProfileModal = () => {
    setIsProfileModal(false);
  }

  const handleSubmitProfileModal = async (e) => {
    await onClickUploadImg();
    setIsProfileModal(false);
  }

  const handleModifyCheckModal = async (e) => {
    await setIsModifyCheckModal(true);
    await console.log(isModifyCheckModal);
  }

  // 프로필이미지 api
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
  };

  const onClickUploadImg = async () => {
    const formData = new FormData();
    formData.append("images", selectedFile);
    console.log(selectedFile);

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
    await setEmail(`${email.split("@")[0]}@${selected}`);
    console.log(email);
    await props.modifyProfile(email, phone, mbtiIdx, myHashtag);
    await props.fetchMyProfile();
    props.setModify(true);

    setIsAuthPhone(false);
    setIsModifyCheckModal(true);
    setIsModify(false);
    setIsModifyCheckModal(true);
  }

  // style 모달
  const [shownMyHashtag, setShownMyHashtag] = useState([]);
  const [errorHashtag, setErrorHashtag] = useState("");

  const handleOpenStyleModal = async () => {
    await axios
      .get(apiPath + "/hashtag/list")
      .then((response) => {
        setHashtagList([...response.data.data]);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsStyleModalOpen(true);

    let hashtagName = [props.data.firstTripStyle, props.data.secondTripStyle, props.data.thirdTripStyle];
    
    hashtagList.forEach((hashtag) => {
      if (hashtagName.includes(hashtag.name)) {
        hashtagId.push(hashtag.id);
      }
    });
    
    console.log(hashtagId);
    setMyHashtag([{ id: hashtagId[0], name: props.data.firstTripStyle }, { id: hashtagId[1], name: props.data.secondTripStyle }, { id: hashtagId[2], name: props.data.thirdTripStyle }]);
  };

  const isDuplicate = (name) => myHashtag.some((tag) => tag.name === name);

  const handleAddHashtag = (id, name) => {
    if (myHashtag.length < 3 && !isDuplicate(name)) {
      console.log(id, name);
      setMyHashtag((prev) => [...prev, { id, name }]);
    }
  };

  const handleDelHashtag = (event) => {
    setMyHashtag(myHashtag.filter((e) => e.id !== parseInt(event.target.id)));
  };

  const handleSearchHashtag = async (event) => {
    event.preventDefault();
    if (myHashtag.length < 3 && !isDuplicate(event.target.search.value)) {
      await axios
        .get(apiPath + "/hashtag", {
          params: {
            name: event.target.search.value,
          },
        })
        .then((response) => {
          console.log(response);
          console.log(event.target.search.value);
          const data = response.data.data;
          if (data.length !== 0) {
            handleAddHashtag(data[0].id, data[0].name);
            setErrorHashtag("");
          } else {
            setErrorHashtag(
              "해당 키워드는 존재하지 않습니다. 다시 입력해주세요."
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    event.target.reset();
  };

  const handleCloseStyleModal = () => {
    // setMyHashtag([...shownMyHashtag]);
    setIsStyleModalOpen(false);
  };

  const handleSubmitStyleModal = () => {
    setShownMyHashtag([...myHashtag]);
    setIsStyleModalOpen(false);
    console.log(myHashtag);
  };

  // 휴대폰 인증
  const [isAuthPhone, setIsAuthPhone] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [authAnswer, setAuthAnswer] = useState('');

  const onHandleAuth = async (e) => {
    await axios
        .post(apiPath + "/user/authentication-code/send", {
          "phone": phone
        })
        .then((response) => {
          if(response.code === 200){
            setAuthAnswer(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    alert('인증번호가 전송되었습니다.');
    setIsAuthPhone(true);
  }

  const onHandleAuthCheck = async (e) => {
    if(authAnswer == authPhone){
      alert('인증 번호가 일치하지 않습니다.');
    } else{
      alert('인증이 완료되었습니다.');
    }
  }
  return (
    <>
    {isModify 
    ?
      (<S.MyProfileWrapper>
      <S.StyleTitleWrapper>
        <S.StyleTitle>My Style</S.StyleTitle>
        {myHashtag.map((e) => (
          e.name !== "" && 
          (<S.StyleHashTag id={e.id}>#{e.name}</S.StyleHashTag>))
        )}
        
        <S.StyleHashTag onClick={handleOpenStyleModal}>
          <S.StyleEditImg 
            src="/icon/edit.png"
          />
        </S.StyleHashTag>

        {/* =================== 스타일 모달창  ==================== */}

      {isStyleModalOpen && (
        <S.ModalOverlay>
          <S.Modal>
          <S.ModalTitle>여행 스타일</S.ModalTitle>
            <S.ModalInputWrapper onSubmit={handleSearchHashtag}>
              <S.ModalInput
                placeholder={"여행스타일 검색 (최대 3개)"}
                name="search"
                autocomplete="off"
              ></S.ModalInput>
              <S.ModalInputBtn>
                <img src="/icon/search.png" />
              </S.ModalInputBtn>
            </S.ModalInputWrapper>
            {/* <S.ModalHashtagError>{errorHashtag}</S.ModalHashtagError> */}
            <S.ModalMyStyleWrapper>
              {myHashtag.map((e) => (
                e.name !== "" && (<S.ModalHashtag id={e.id} onClick={handleDelHashtag}>
                  #{e.name}
                </S.ModalHashtag>)
              ))}
            </S.ModalMyStyleWrapper>
            <S.ModalRecogStyleWrapper>
              <S.ModalRecogTitle>키워드(50개)</S.ModalRecogTitle>
              <S.ModalRecogHashtagWrapper>
                {hashtagList.map((e) =>
                  myHashtag.filter((el) => el.id == e.id).length == 0 ? (
                    <S.ModalRecogHahstag
                      key={e.id}
                      id={e.id}
                      onClick={() => handleAddHashtag(e.id, e.name)}
                    >
                      #{e.name}
                    </S.ModalRecogHahstag>
                  ) : (
                    <S.ModalHashtag
                      key={e.id}
                      id={e.id}
                      onClick={handleDelHashtag}
                    >
                      #{e.name}
                    </S.ModalHashtag>
                  )
                )}
              </S.ModalRecogHashtagWrapper>
            </S.ModalRecogStyleWrapper>
            <S.ModalBtnWrapper>
              <S.ModalCancelBtn onClick={handleCloseStyleModal}>
                취소
              </S.ModalCancelBtn>
              <S.ModalSubmitBtn onClick={handleSubmitStyleModal}>
                확인
              </S.ModalSubmitBtn>
            </S.ModalBtnWrapper>
          </S.Modal>
        </S.ModalOverlay>
      )}
        
      </S.StyleTitleWrapper>

      <S.StyleWrapper>
        <S.StyleContent>
          <S.StyleLineBio>
        {props.data.firstBio && 
        (<S.StyleBioInput value={props.data.firstBio}/>)
        } </S.StyleLineBio>

          <S.StyleLineBio>
        {props.data.secondBio && 
        (<S.StyleBioInput value={props.data.secondBio}/>)}
          </S.StyleLineBio>

          <S.StyleLineBio>
        {props.data.thirdBio && 
        (<S.StyleBioInput value={props.data.thirdBio}/>)}
          </S.StyleLineBio>
        </S.StyleContent> 
      </S.StyleWrapper>

      {isModifyCheckModal && (<Modal setIsModifyCheckModal={setIsModifyCheckModal} onModifyProfile={onModifyProfile}/>)}
      
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
                value={email.split("@")[0]}
                onChange={e => setEmail(e.target.value)}
              />
              <S.EmailAt>@</S.EmailAt>
              <S.EmailSecondSelect onChange={(e) => setSelectedEmail(e.target.value)} value={selected}>
                <S.EmailOption>naver.com</S.EmailOption>
                <S.EmailOption>gmail.com</S.EmailOption>
              </S.EmailSecondSelect>
              </S.EmailWrapper>
            </S.ModifyTd>
            <S.Tc>연락처</S.Tc>
            <S.ModifyTd>
              <S.PhoneWrapper>
                <S.PhoneInput
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <S.phoneBtn onClick={onHandleAuth}>인증</S.phoneBtn>
              </S.PhoneWrapper>

              {isAuthPhone &&
              (<S.PhoneWrapper>
                <S.PhoneInput
                  type="text"
                  value={authPhone}
                  onChange={e => setAuthPhone(e.target.value)}
                />
              
                <S.phoneBtn onClick={onHandleAuthCheck}>확인</S.phoneBtn>
              </S.PhoneWrapper>)}
            </S.ModifyTd>
          </tr>


        </S.Table>
      </S.TableWrapper>

      <S.BtnWrapper>
        <S.Btn 
          type="button"
          onClick={onModifyProfile}
        >프로필 수정 완료</S.Btn>
        <S.CancleBtn 
          type="button"
          onClick={() => {setIsModify(false); props.setModify(true); setIsModifyCheckModal(true);}}
        >취소</S.CancleBtn>
      </S.BtnWrapper>
    </S.MyProfileWrapper>)
      :
      (<S.MyProfileWrapper>
        <S.StyleTitleWrapper>
          <S.StyleTitle>My Style</S.StyleTitle>
          {myHashtag.map((e) => (
          e.name !== "" && 
          (<S.StyleHashTag id={e.id}>#{e.name}</S.StyleHashTag>))
        )}
        </S.StyleTitleWrapper>
        

        <S.StyleWrapper>
        <S.StyleContent>
        {props.data.firstBio && 
        (<S.StyleLineBio>
            {props.data.firstBio}
          </S.StyleLineBio>)
        }
        {props.data.secondBio && 
        (<S.StyleLineBio>
            {props.data.secondBio}
          </S.StyleLineBio>)}
        {props.data.thirdBio && 
        (<S.StyleBio>
            {props.data.thirdBio}
          </S.StyleBio>)}
        </S.StyleContent> 
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
          <S.Btn onClick={() => {setIsModify(true); props.setModify(false);}}>프로필 수정</S.Btn>
        </S.BtnWrapper>
      </S.MyProfileWrapper>
      )
  
    }
    </>
  );
}