import { styled } from 'styled-components';

export const TitleBanner = styled.div`
  width: 100%;
  height: 500px;
  background: rgba(0, 119, 182, 0.8);
  display: flex;
  justify-content: center;
  position: relative;
`;

export const TitleTxt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  margin-top: 140px;
  margin-bottom: 28px;
`;

export const SubTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
`;

export const WriteForm = styled.div`
  position: absolute;
  top: 317px;
  width: 1240px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 80px;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 100px;
`;

export const FormTitleWrapper = styled.div`
  width: 1080px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FormTitleTxtWrapper = styled.div`
  width: 500px;
`;

export const StepTxt = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const StepTitleTxt = styled.div`
  color: #000;
  font-size: 24px;
  font-weight: 600;
`;

export const MoreBtnImg = styled.img`
  transform: ${props => props.isOpenStep ? "rotate(180deg)" : "none"};
`;

export const MoreBtn = styled.button`
  width: 40px;
  height: 40px;
`;

export const Line = styled.div`
  width: 1080px;
  height: 1px;
  background: rgba(153, 153, 153, 0.5);
`;

export const StepInfoWrapper = styled.div`
  margin-top: 50px;
`;

export const InputInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

export const LongInputInfoWrapper = styled(InputInfoWrapper)`
  align-items: flex-start;
`;

export const InputTitle = styled.div`
  width: 250px;
  color: #333;
  font-size: 20px;
  font-weight: 500;
  margin-right: 40px;
`;

export const LongInputTitle = styled(InputTitle)`
  margin-top: 12px;
`;

export const MidInput = styled.div`
  width: 580px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);
  margin-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 18px;
  font-weight: 500;
`;

export const InputBtn = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 5px;
  background: rgba(0, 180, 216, 0.6);
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

export const InputWrapper = styled.div`
  width: 580px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 40px;
`;

export const ShortInput = styled(MidInput)`
  width: 250px;
  margin-right: 0px;
`;

export const Hyphen = styled.div`
  width: 20px;
  height: 2px;
  background: #666;
`;

export const WritableShortInput = styled(ShortInput)`
  background-color: #ffffff;
  justify-content: space-between;
  padding: 0px 15px;
`;

export const UpDownBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  color: #666;
  font-size: 30px;

  &:hover {
    background-color: rgba(144, 224, 239, 0.4);
  }
`;

export const InputTxt = styled.div`
  color: #000;
  font-size: 18px;
  font-weight: 500;
`;

export const InputTitleWrapper = styled.div`
  width: 250px;
  display: flex;
  align-items: flex-end;
  margin-right: 40px;
`;

export const InputTitleInfo = styled.div`
  color: #666;
  font-size: 12px;
  font-weight: 400;
`;

export const Hashtag = styled.div`
  width: 95px;
  height: 34px;
  border-radius: 18px;
  background: #90e0ef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 160px;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  text-align: right;
  border: none;
  outline: none;
`;

export const LongInput = styled.input`
  width: 790px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(255, 255, 255);
  color: rgba(102, 102, 102, 0.8);
  font-size: 18px;
  font-weight: 500;
  padding: 14px 25px;
`;

export const LongTxtArea = styled.textarea`
  width: 790px;
  height: 500px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(255, 255, 255);
  color: rgba(102, 102, 102, 0.8);
  font-size: 18px;
  font-weight: 500;
  padding: 21px 25px;
  resize: none;
`;

export const fileReaderBtn = styled.label`
  width: 170px;
  height: 50px;
  border-radius: 5px;
  background: rgba(0, 180, 216, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

export const ImageViewer = styled.div`
  width: 580px;
  height: 330px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImagePreveiew = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
`;

export const ImageIcon = styled.img`
  margin-bottom: 13px;
`;

export const ImageTxt = styled.div`
  color: rgba(51, 51, 51, 0.8);
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const BtnWrapper = styled.div`
  display: flex;
`;

export const CancelBtn = styled.button`
  width: 200px;
  height: 60px;
  border-radius: 5px;
  background: #d9d9d9;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export const SubmitBtn = styled(CancelBtn)`
  background: #0077b6;
  margin-left: 45px;
`;

export const FormBtm = styled.div`
  height: 2000px;
`;