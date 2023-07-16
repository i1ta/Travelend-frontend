import { styled } from "styled-components";

export const TItle = styled.div`
  width: 1400px;
  height: 65px;
  margin: auto;
  padding: 0px 40px;
  display: flex;
  align-items: center;

  color: #fff;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
  border-radius: 10px;
  background: rgba(0, 180, 216, 0.6);
`;

export const PostForm = styled.div`
  width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px;
  background: #fff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
`;

export const InputBar = styled.div`
  width: 1300px;
  height: 80px;
  padding: 0px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: rgba(102, 210, 232, 0.56);
  margin-bottom: 60px;
`;

export const InputTitle = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: 700;
`;

export const InputResult = styled.div`
  height: 60px;
  padding: 0px 50px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 25px;
  font-weight: 700;
`;

export const MemNumWrapper = styled.div`
  width: 1300px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MemNumBtn = styled.div`
  border-radius: 10px;
  background: #f2efef;
  width: 110px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 35px;
  font-weight: 700;
`;

export const MemNumInput = styled.div`
  width: 1300px;
  height: 80px;
  border-radius: 10px;
  background: #f2efef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.37);
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 60px;
`;

export const StyleInputResult = styled(InputResult)`
    width: calc(100px + 10px*2 + 100px*3);
    justify-content: space-between;
`

export const StyleTag = styled.div`
width: 100px;
padding: 10px 0px;
border-radius: 18px;
background: #90E0EF;
color: #FFF;
text-align: center;
font-size: 15px;
font-weight: 600;
`

export const InputResultWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InputResultTxt = styled.div`
  margin: 0px 15px 0px 50px;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
`;

export const TitleInput = styled.input`
  width: 1300px;
  height: 100px;
  padding: 0px 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 30px;
  font-weight: 500;
`;

export const ContentsInput = styled.textarea`
  width: 1300px;
  height: 500px;
  padding: 30px 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 30px;
  font-weight: 500;
  outline: none;
  resize: none;
`;

export const ImgBtn = styled.div`
  width: 1300px;
  height: 580px;
  padding: 30px 0px;
  border-radius: 10px;
  background: rgba(102, 210, 232, 0.14);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 80px;

  color: rgba(0, 0, 0, 0.3);
  font-size: 30px;
  font-weight: 700;
`;

export const SubmitBtnWrapper = styled.div`
  width: 1300px;
  display: flex;
  justify-content: end;
`;

export const SubmitBtn = styled.button`
  width: 224px;
  height: 76px;
  background-color: rgba(102, 170, 232, 0.74);
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
`;

// 모달창

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
  min-width: 550px;
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

export const ModalInputWrapper = styled.form`
  width: 460px;
  height: 40px;
  border: 1px solid #C8B6FF;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

export const ModalInput = styled.input`
  width: 422px;
  height: 100%;
  border: none;
  border-radius: 10px;

  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: #999999;
`;

export const ModalInputBtn = styled.button`
  width: 40px;
  height: 100%;
  background: #C8B6FF;
  border-radius: 8px;

  font-size: 30px;
  line-height: 1;
  color: #ffffff;
`;

export const ModalHashtagError = styled.div`
  width: 460px;
  height: 10px;
  font-size: 10px;
  margin-bottom: 15px;
  justify-content: center;
  text-align: center;
`;

export const ModalResult = styled.div`
  width: 460px;
  height: 40px;
  border: 1px solid #C8B6FF;
  border-radius: 10px;
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: #999999;
`

export const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
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