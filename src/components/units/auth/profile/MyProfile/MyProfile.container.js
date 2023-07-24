import { use, useEffect, useState } from "react";

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

  const [instagram, setInstagram] = useState(props.data.instagram); // 이메일
  const [phone, setPhone] = useState(props.data.phone); // 휴대폰 번호
  // const [selected, setSelectedEmail] = useState('naver.com'); // email 뒷 부분

  const [myHashtag, setMyHashtag] = useState([]); // hashtag
  const [hashtagList, setHashtagList] = useState([]);
  const [hashtagName, setHashtagName] = useState([props.data.firstTripStyle, props.data.secondTripStyle, props.data.thirdTripStyle]);
  // const [hashtagId, setHashtagId] = useState([]);
  const hashtagId = [];

  const [firstBio, setFirstBio] = useState(props.data.firstBio);
  const [secondBio, setSecondBio] = useState(props.data.secondBio);
  const [thirdBio, setThirdBio] = useState(props.data.thirdBio);
  
  const startSetting = async () => {
    if(mbti === ''){
      setMbti(props.data.mbti);

      // mbti 리스트 받아오기
      await axios
      .get(apiPath + "/profile/mbti")
      .then( async (response) => {
        console.log(response);
        setMbtiList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });

    }
    if(instagram === '' && props.data.instagram != null){
      setInstagram(props.data.instagram);
    }
    if(phone === ''){
      setPhone(props.data.phone);
    }
    if(myHashtag.length === 0){

      // hashtag 리스트 받아오기
      await axios
      .get(apiPath + "/hashtag/list")
      .then((response) => {
        setHashtagList([...response.data.data]);
      })
      .catch((error) => {
        console.error(error);
      });

      setHashtagName([props.data.firstTripStyle, props.data.secondTripStyle, props.data.thirdTripStyle]);
    }
    if(firstBio === ''){
      setFirstBio(props.data.firstBio);
    }
    if(secondBio === ''){
      setSecondBio(props.data.secondBio);
    }
    if(thirdBio === ''){
      setThirdBio(props.data.thirdBio);
    }
  };

  useEffect(() => {startSetting()}, [props]);

  useEffect(() => {
    if(hashtagName[0] !== "" && myHashtag.length === 0){
      hashtagName.forEach((name) => {
        if(name !== ""){
          let matchingHashtag = hashtagList.find((hashtag) => hashtag.name === name);
          if(matchingHashtag){
            setMyHashtag((prev) => [...prev, {id: matchingHashtag.id, name: matchingHashtag.name}])
          }
        }
      });
    }
  }, [hashtagName]);

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
        setMbtiList(response.data.data);
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

    console.log(e.target.innerText);
    for(let i = 0; i < 16; i++){
      console.log(mbtiList[i]);
      if(mbtiList[i].name == e.target.innerText){
        setMbtiIdx(mbtiList[i].id);
        console.log(mbtiList[i].id);
      }
    }
    console.log(e.target.innerText);
    handleCloseModal();
  };

  // 프로필이미지 api
  const onModifyProfile = async () => {    
    let idx = 0;
    for(let i = 0; i < 16; i++){
      if(mbtiList[i]?.name == mbti){
        idx = mbtiList[i].id;
      }
    }
    
    const bioList = [firstBio, secondBio, thirdBio];
    console.log(instagram);
    await props.modifyProfile(instagram, phone, idx, myHashtag, bioList);
    await props.fetchMyProfile();
    props.setModify(true);

    // setEmail(`${email.split("@")[0]}@${selected}`);
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

  };

  const isDuplicate = (name) => myHashtag.some((tag) => tag?.name === name);

  const handleAddHashtag = (id, name) => {
    console.log(myHashtag);
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
    setMyHashtag([...shownMyHashtag]);
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
          console.log(response);
          if(response.data.code === 200){
            setAuthAnswer(response.data.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    alert('인증번호가 전송되었습니다.');
    setIsAuthPhone(true);
  }

  const onHandleAuthCheck = async (e) => {
    if(authAnswer != authPhone){
      alert('인증 번호가 일치하지 않습니다.');
    } else{
      alert('인증이 완료되었습니다.');
    }
  }

  // 공개여부 설정
  
  const onOpenPrivate = async (e) => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    await axios
      .post(apiPath + `/profile/${e.target.id}-private`)
      .then((res) => {
        console.log(res);
      });
  }

  const onClosePrivate = async (e) => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    await axios
      .post(apiPath + `/profile/${e.target.id}-private`)
      .then((res) => {
        console.log(res);
      });
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
                (<S.ModalHashtag id={e.id} onClick={handleDelHashtag}>
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
          <S.BioWrapper>
            {firstBio?.length > 0 
              ? 
              (<S.StyleBioImg src="/icon/check.png"/>)
              :
              (<S.StyleBioImg src="/icon/blackCheck.png"/>)
            }
            <S.StyleModifyBioWrapper>
              함께 <S.StyleBioInput max={firstBio?.length > 50} value={firstBio} onChange={(e) => setFirstBio(e.target.value)}/> 
              <S.StyleMaxErr>{firstBio?.length} / 50 </S.StyleMaxErr>
              여행을 떠나려고 해요.
            </S.StyleModifyBioWrapper>
            <S.StyleBioDelImg onClick={e => setFirstBio('')} src="/icon/delete.png"/>
          </S.BioWrapper>

          <S.BioWrapper>
            {secondBio?.length > 0 
              ? 
              (<S.StyleBioImg src="/icon/check.png"/>)
              :
              (<S.StyleBioImg src="/icon/blackCheck.png"/>)
            }
            <S.StyleModifyBioWrapper>
              저는 <S.StyleBioInput max={secondBio?.length > 50} value={secondBio} onChange={(e) => setSecondBio(e.target.value)}/> 
              <S.StyleMaxErr>{secondBio?.length} / 50 </S.StyleMaxErr>
              여행자에요.
              
            </S.StyleModifyBioWrapper>
            <S.StyleBioDelImg onClick={e => setSecondBio('')} src="/icon/delete.png"/>
          </S.BioWrapper>

          <S.BioWrapper>
            {thirdBio?.length > 0 
              ? 
              (<S.StyleBioImg src="/icon/check.png"/>)
              :
              (<S.StyleBioImg src="/icon/blackCheck.png"/>)
            }
            <S.StyleModifyBioWrapper>
              <S.StyleBioInput max={thirdBio?.length > 50}value={thirdBio} onChange={(e) => setThirdBio(e.target.value)}/>
              <S.StyleMaxErr>{thirdBio?.length} / 50 </S.StyleMaxErr>
            </S.StyleModifyBioWrapper>
            <S.StyleBioDelImg onClick={e => setThirdBio('')} src="/icon/delete.png"/>
            
          </S.BioWrapper>
        </S.StyleContent> 
      </S.StyleWrapper>

      {isModifyCheckModal && (<Modal setIsModifyCheckModal={setIsModifyCheckModal} onModifyProfile={onModifyProfile}/>)}
      
      <S.Title>My Profile</S.Title>
      <S.TableWrapper>
        <S.Table>
          <tr>
            <S.Tc>이름</S.Tc>
            <S.Td>{props.data.name}</S.Td>
            
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
            <S.Tc>나이</S.Tc>
            <S.Td>{props.data.age}</S.Td>
            <S.Tc>Insta</S.Tc>
            <S.ModifyTd>
              <S.EmailWrapper>
              <S.EmailFirstInput
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
              />
              </S.EmailWrapper>
            </S.ModifyTd>
            
          </tr>
          <tr>
            <S.Tc>성별</S.Tc>
            {props.data.gender === 'M'
            ?
            <S.Td>남</S.Td>
            :
            <S.Td>여</S.Td>
            }
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
          {(!props.data.firstBio && !props.data.secondBio && !props.data.thirdBio) 
            &&
          (
            <S.BioNoneWrapper>
              <S.StyleNoneBioImg src="/icon/text.png"/>
              <S.StyleBio>소개를 입력해주세요</S.StyleBio>
            </S.BioNoneWrapper>
          )}

          {props.data.firstBio &&
          (<S.BioWrapper>
            <S.StyleBioImg src="/icon/check.png"/>
            <S.StyleBio>
              함께 <S.BioBold>{props.data.firstBio}</S.BioBold> 여행을 떠나려고 해요.
            </S.StyleBio>
          </S.BioWrapper>)}

          {props.data.secondBio &&
          (<S.BioWrapper>
            <S.StyleBioImg src="/icon/check.png"/>
            <S.StyleBio>
              저는 <S.BioBold>{props.data.secondBio}</S.BioBold> 여행자에요.
            </S.StyleBio>
          </S.BioWrapper>)}

          {props.data.thirdBio &&
          (<S.BioWrapper>
            <S.StyleBioImg src="/icon/check.png"/>
            <S.StyleBio>{props.data.thirdBio}</S.StyleBio>
          </S.BioWrapper>)}
        </S.StyleContent> 
        </S.StyleWrapper>
  
        <S.Title>My Profile</S.Title>
        <S.TableWrapper>
          <S.Table>
            <tr>
              <S.Tc>이름</S.Tc>
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt>{props.data.name}</S.TdTxt>
                  {props.data.namePrivate ?
                  (<S.LockIcon id="name" src="/icon/lock.png" onClick={onOpenPrivate}></S.LockIcon>) :
                  (<S.LockIcon id="name" src="/icon/unlock.png" onClick={onClosePrivate}></S.LockIcon>)
                  }
                </S.TdWrapper>
              </S.Td>
              <S.Tc>MBTI</S.Tc>
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt>{mbti}</S.TdTxt>
                  {props.data.mbtiPrivate ?
                  (<S.LockIcon id="mbti" src="/icon/lock.png" onClick={onOpenPrivate}></S.LockIcon>) :
                  (<S.LockIcon id="mbti" src="/icon/unlock.png" onClick={onClosePrivate}></S.LockIcon>)
                  }
                </S.TdWrapper>
              </S.Td>
            </tr>
            <tr>
              <S.Tc>나이</S.Tc>
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt>{props.data.age}</S.TdTxt>
                </S.TdWrapper>
              </S.Td>
              <S.Tc>Insta</S.Tc>
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt><a href="https://www.instagram.com/" style={{'font-weight': 'bold'}}>@{props.data.instagram}</a></S.TdTxt>
                  {props.data.instagramPrivate ?
                  (<S.LockIcon id="instagram" src="/icon/lock.png" onClick={onOpenPrivate}></S.LockIcon>) :
                  (<S.LockIcon id="instagram" src="/icon/unlock.png" onClick={onClosePrivate}></S.LockIcon>)
                  }
                </S.TdWrapper>
              </S.Td>
            </tr>
            <tr>
              
              <S.Tc>성별</S.Tc>
              {props.data.gender === 'M'
              ?
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt>남</S.TdTxt>
                </S.TdWrapper>
              </S.Td>
              :
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt>여</S.TdTxt>
                </S.TdWrapper>
              </S.Td>
              }
              <S.Tc>연락처</S.Tc>
              <S.Td>
                <S.TdWrapper>
                  <S.TdTxt>{formatPhone(phone)}</S.TdTxt>
                  {props.data.phonePrivate ?
                  (<S.LockIcon id="phone" src="/icon/lock.png" onClick={onOpenPrivate}></S.LockIcon>) :
                  (<S.LockIcon id="phone" src="/icon/unlock.png" onClick={onClosePrivate}></S.LockIcon>)
                  }
                </S.TdWrapper>
              </S.Td>
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