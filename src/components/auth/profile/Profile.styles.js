import styled from "@emotion/styled";

export const Container = styled.div`
  /* min-height: calc(100vh - 100px); */
  display: flex;
  justify-content: center;
`;

// 사이드 바

export const SideBar = styled.section`
  // width: 335px;
  width: 16.75rem;
  min-height: 960px;
  background-color: white;
  box-shadow: 2px 0px 8px #ccc;
  z-index: 50;
  padding: 40px 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SideNotBar = styled(SideBar)`
  padding: 12.5rem 0;
`;

export const ProfileLine = styled.div`
  width: 12.5rem;
  height: 1px;
  background-color: #999999;
  margin-bottom: 1.5rem;
`;

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BlockTxt = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-size: 6.5rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #9AB3F5;
  }
`;

export const BlockHypen = styled.div`
  width: 1px;
  height: 15px;
  background: #999;
`;

export const ProfileImage = styled.div`
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  background-color: #e6e6e6;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const profileFileBtn = styled.label`
background-color: #ffffff;
border: 1px solid #9AB3F5;
border-radius: 15px;
color: #000000;
font-weight: bold;
// width: 250px;
width: 12.5rem;
height: 70px;
margin-top: 20px;
padding: 10px 0;
font-size: 1rem;
line-height: 50px;
text-align: center;
cursor: pointer;
`

export const profileBtn = styled.button`
background-color: #ffffff;
border: 1px solid #9AB3F5;
color: #000000;
font-weight: bold;
border-radius: 15px;

// width: 250px;
width: 12.5rem;
height: 70px;
margin-top: 20px;
padding: 10px 0;
font-size: 1rem;
`

export const Name = styled.div`
  margin: 30px 0;
  color: #666666;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const Point = styled.div`
  margin-bottom: 40px;
  color: #666666;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const CategoryWrapper = styled.div`
  border-top: 1px solid #999999;
  flex: 1;
  padding: 40px 0px;

  display: flex;
  flex-direction: column;
`;

export const Category = styled.button`
  width: 14rem;
  height: 70px;
  margin-bottom: 30px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 64px;

  background-color: ${(props) =>
    props.selectedCategory == props.id ? "#9AB3F5" : "#ffffff"};
  color: ${(props) =>
    props.selectedCategory == props.id ? "#ffffff" : "#666666"};
`;

export const LogoutWrapper = styled.button`
  display: flex;
  align-items: center;
`;

export const LogoutImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 8px;
`;

export const LogoutTxt = styled.div`
  font-size: 1rem;
  color: #999999;
`;

export const Table = styled.table`
    max-width: 1000px;
    width: 50rem;
    height: 520px;

    background-color: white;
    margin-top: 100px;
    border-collapse: collapse;
    border-radius: 15px;
    border-style: hidden;
    box-shadow: 0 0 0 2px #9AB3F5;
`;

export const Td = styled.td`
    height: 30px;
    width: 250px;
    border: none;
    font-size: 1rem;
    color: #666666;
`;

export const StyleTd = styled(Td)`
  background: #90e0ef;
  width: 77px;
  height: 30px;
  border-radius: 20px;
  color: white;
  margin: 100px 100px;
`;

export const Tc = styled(Td)`
    text-align: center;
    color: #9AB3F5;
    border: none;
`;

export const StyleBox = styled.div``;

export const BtnWrapper = styled.div`
  align-items: center;
  text-align: center;
  margin: 20px 0;
`;

export const Btn = styled.button`
    border-radius: 50px;
    background-color: #9AB3F5;
    padding: 15px 50px;
    border: none;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
`;

// 프로필 모달 창
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
  background-color: #9AB3F5;
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

export const DefaultProfile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

export const ModalLine = styled.div`
  width: 295px;
  height: 1px;
  background-color: #999999;
  margin-top: 20px;
`;

export const ModalProfileExplain = styled.div`
  font-size: 20px;
  padding: 10px;
  margin-top: 10px;
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
  color: #9AB3F5;
  border: 1px solid #9AB3F5;
  border-radius: 10px;
  margin: 0 10px;

  text-align: center;
  font-weight: 400;
  font-size: 12px;
`;

export const ModalSubmitBtn = styled(ModalCancelBtn)`
  background-color: #9AB3F5;
  color: #ffffff;
  border: none;
`;
