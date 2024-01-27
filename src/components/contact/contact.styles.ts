import { styled } from "styled-components";

export const MainContainer = styled.div`
  margin: 40px auto;
  width: 95%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  width: 100%;
`;

export const MainTitle = styled.div`
  font-size: 36px;
  color: ${(props) => props.theme.colors.main1};
  font-weight: 700;
  margin-bottom: 24px;
`;

export const MainTxt = styled.div`
  font-size: 16px;
  line-height: 200%;
  color: #a7a7a7;
  margin-bottom: 8px;
`;

export const Line = styled.div`
  height: 1px;
  background-color: #a7a7a7;
  margin-bottom: 40px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const TitleBox = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border-radius: 20px;
  box-shadow: 0px 2px 20px 3px rgba(153, 153, 153, 0.25);
`;

export const TitleTag = styled.div`
  width: 15%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: ${(props) => props.theme.colors.main1};
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
`;

export const TitleInput = styled.input`
  width: 85%;
  padding: 0 12px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
`;

export const ContentInput = styled.textarea`
  width: 100%;
  min-height: 400px;
  font-size: 16px;
  padding: 20px 16px;
  border: 1px solid #a7a7a7;
  border-radius: 10px;
  resize: none;
`;

export const PhotoBox = styled.div`
  width: 100%;
  height: 200px;

  text-align: center;
  line-height: 200px;
  font-size: 25px;
`;

export const NoImgWrapper = styled.label`
  height: 200px;

  border-radius: 10px;
  border: 1px solid #a7a7a7;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  &:hover::after {
    content: "+";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    font-size: 100px;
    color: white;
  }
`;

export const ImgWrapper = styled.label`
  overflow: hidden;
  height: 200px;
  position: relative;

  border-radius: 10px;
  border: 1px solid #a7a7a7;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const NoImgIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const NoImgIcon = styled.img`
  width: 80px;
`;

export const NoImgTxt = styled.div`
  color: rgba(102, 102, 102);
  font-size: 20px;
  font-weight: 600;
`;

export const NoImgSubTxt = styled.div`
  color: rgba(102, 102, 102, 0.8);
  font-size: 18px;
  font-weight: 500;
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 16px;

  border: 1px solid #a7a7a7;
  border-radius: 10px;
  font-size: 16px;
`;

export const EmailNoti = styled.div`
  width: 100%;
  font-size: 16px;
  color: #a7a7a7;
`;

export const TermsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const TermsInput = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 5px;
`;

export const TermsTxt = styled.div`
  font-size: 16px;
  color: #a7a7a7;
`;

export const Btn = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.main1};
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;

export const Input = styled.input`
  display: none;
`
