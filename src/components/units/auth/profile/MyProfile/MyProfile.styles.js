import styled from "@emotion/styled";

export const MyProfileWrapper = styled.div`
  width: 1105px;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
`;

export const StyleTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 1000px;
`;

export const StyleTitle = styled.h1`
  font-size: 36px;
  color: #c8b6ff;
  margin-bottom: 30px;
  margin-right: 30px;
`;

export const StyleHashTag = styled.div`
  line-height: 42px;
  height: 42px;
  font-size: 17px;
  font-weight: bold;
  background-color: #90e0ef;
  border: 1px solid #90e0ef;

  border-radius: 15px;
  color: #ffffff;
  margin: 0 10px;
  margin-top: 6px;
  padding: 0 20px;
`;

export const StyleWrapper = styled.div`

`;

export const StyleContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2.5px solid #c8b6ff;
  border-radius: 15px;
  background-color: white;
  padding: auto;

  width: 1000px;
  height: 100px;

  font-size: 20px;
`;


export const Title = styled.h1`
  width: 1000px;
  font-size: 36px;
  color: #c8b6ff;
  margin-bottom: 65px;
  margin-top: 100px;
`;

// 테이블

export const TableWrapper = styled.div`
  display: inline-block;
  border-radius: 50px;
`;

export const Table = styled.table`
  width: 1000px;
  height: 520px;
  background-color: white;
  margin-bottom: 50px;

  border-collapse: collapse;
  border-radius: 15px;
  border-style: hidden;
  box-shadow: 0 0 0 2px #c8b6ff;
`;

export const Td = styled.td`
  height: 30px;
  width: 250px;
  border: none;
  font-size: 20px;
  color: #666666;
`;

export const Tc = styled(Td)`
  text-align: center;
  color: #c8b6ff;
  border: none;
`;

// 수정 시 스타일

export const EmailFirstInput = styled.input`
  height: 52px;
  width: 142px;
  border: 2px solid #c8b6ff;
  border-radius: 15px;
  font-size: 20px;
  box-shadow: 0 0 0 rgb(255, 255, 255), 0.2em 0.2em 1em rgba(0, 0, 0, 0.3);
`;

export const EmailAt = styled.span`
  margin: 0px 10px;
`;

export const EmailSecondSelect = styled.select`
  height: 52px;
  width: 161px;
  border: 2px solid #c8b6ff;
  border-radius: 15px;
  font-size: 20px;
  box-shadow: 0 0 0 rgb(255, 255, 255), 0.2em 0.2em 1em rgba(0, 0, 0, 0.3);
`;

export const EmailOption = styled.option`
  font-size: 20px;
';

export const mbti = styled.span`
  cursor: pointer;
  border: 2px solid #c8b6ff;
  border-radius: 15px;
  padding: 5px 10px;
`;

export const BtnWrapper = styled.div`
  align-items: center;
  text-align: center;
`;

export const Btn = styled.button`
  width: 200px;
  height: 63px;
  border-radius: 50px;
  background-color: #c8b6ff;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

export const ProfileImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background-color: #e6e6e6;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const defaultProfile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const profileFileBtn = styled.label`
  background-color: #c8b6ff;
  width: 60px;
  height: 50px;
  margin-top: 10px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
`;

export const profileBtn = styled.button`
  background-color: #c8b6ff;
  width: 60px;
  height: 50px;
  margin-top: 10px;
  font-size: 20px;
`;

// mbti 모달 창
export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
  width: 550px;
  padding-bottom: 27px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px 10px 0px 0px;
  background-color: #c8b6ff;
  text-align: center;
  margin-bottom: 26px;

  font-weight: 700;
  font-size: 22px;
  line-height: 50px;
  color: #ffffff;
`;

export const ModalMbtiWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ModalMbtiContent = styled.div`
  cursor: pointer;
  text-align: center;
  width: 17.5%;
  font-size: 20px;
  padding: 10px 20px;
  margin: 10px 15px;
  background-color: #90e0ef;
  color: #ffffff;
  border-radius: 15px;

  &:hover {
    background-color: #19d0f2;
  }
`;

export const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 174px;
`;

export const ModalCancelBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: #ffffff;
  color: #c8b6ff;
  border: 1px solid #c8b6ff;
  border-radius: 10px;
  margin: 0 10px;

  text-align: center;
  font-weight: 400;
  font-size: 12px;
`;

export const ModalSubmitBtn = styled(ModalCancelBtn)`
  background-color: #c8b6ff;
  color: #ffffff;
  border: none;
`;
