import { styled } from 'styled-components';

export const ContentsLoc = styled.div`
  width: 1400px;
  height: 65px;
  margin: auto;
  margin-bottom: 50px;
  background-color: rgba(0, 180, 216, 0.6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0px 25px;
`;

export const LocIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

export const LocTxt = styled.div`
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
`;

export const Contents = styled.div`
  width: 1400px;
  margin: auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
`;

export const ContentsImgWrapper = styled.div`
  width: 100%;
  height: 380px;
  overflow: hidden;
  margin-bottom: 70px;
`;

export const ContentsImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const ContentsTopWrapper = styled.div`
  width: 1200px;
  margin: auto;
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
`;

export const ContentsTitle = styled.div`
  color: #9ab3f5;
  font-size: 45px;
  font-weight: 600;
  margin-right: 30px;
`;

export const ContentsDate = styled.div`
  color: #666;
  font-size: 15px;
  font-weight: 300;
`;

export const ContentsMidTopWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
`;

export const MidTopLeftWrapper = styled.div`
  display: flex;
`;

export const UserImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 30px;
  border-radius: 50%;
  background-color: aliceblue;
  overflow: hidden;
`;

export const UserImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const UserTxtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

export const UserID = styled.div`
  margin-bottom: 20px;
  color: #c8b6ff;
  font-size: 30px;
  font-weight: 600;
`;

export const UserInfo = styled.div`
  color: #666;
  font-size: 25px;
  font-weight: 500;
`;

export const UserStyleWrapper = styled.div`
  height: 95px;
  display: flex;
  align-items: flex-end;
`;

export const UserStyle = styled.div`
  border-radius: 30px;
  background: #00b4d8;
  padding: 8px 18px;
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
`;

export const MidTopRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ContentsInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentsInfoIcon = styled.img`
  margin-right: 20px;
  width: 30px;
  height: 30px;
`;

export const ContentsInfoTxt = styled.div`
  color: #666;
  font-size: 20px;
  font-weight: 300;
`;

export const ContentsMidBtmWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0px;
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
`;

export const MidBtmTitle = styled.div`
  color: #9ab3f5;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 17px;
`;

export const MidBtmStyleWrapper = styled.div`
  display: flex;
  margin-bottom: 65px;
`;

export const MidBtmStyle = styled(UserStyle)`
  background-color: #90e0ef;
`;

export const MidBtmBodyTxt = styled.div`
  width: 1200px;
  min-height: 300px;
  margin: auto;
  padding: 50px 30px;
  border-radius: 20px;
  background: rgba(167, 167, 167, 0.15);

  color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
  font-weight: 500;
`;

export const ContentsBtmWrapper = styled.div`
  width: 1200px;
  margin: auto;
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BtmLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BtmIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  cursor: pointer;
`;

export const BtmTxt = styled.div`
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-right: 25px;
`;

export const ApplyBtn = styled.button`
  padding: 20px 30px;
  border-radius: 12px;
  background: #00b4d8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ApplyBtnTxt = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin-right: 15px;
`;

export const ApplyBtnIcon = styled.img`
  height: 20px;
`;

export const PostList = styled.div`
  width: 1400px;
  margin: auto;
  margin-bottom: 100px;
`;

export const CmtListWrapper = styled.div`
  padding: 30px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

export const CmtList = styled.div`
  display: flex;
  align-items: center;
`;

export const CmtContents = styled.div`
  color: #868686;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CmtMoreBtn = styled.button`
  width: 1400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: aliceblue;
  }
`;

export const CommetnMoreBtnTxt = styled.div`
  margin-right: 15px;
  color: #868686;
  font-size: 20px;
  font-weight: 500;
`;

export const CommetnMoreBtnIcon = styled.img``;

export const CmtWriteWrapper = styled.form`
  display: flex;
  align-items: center;
  padding: 0px 30px;
  margin-top: 30px;
`;

export const CmtInput = styled.input`
  width: 950px;
  height: 60px;
  padding: 15px 26px;
  color: #868686;
  font-size: 20px;
  font-weight: 500;
  margin-right: 30px;

  border-radius: 10px;
  background: rgba(225, 225, 225, 0.3);
  border: none;
`;

export const CmtWriteBtn = styled.button`
  width: 150px;
  height: 60px;
  background-color: #90e0ef;
  border-radius: 10px;

  color: #fff;
  font-size: 22px;
  font-weight: 500;
`;

export const PostListTitle = styled.div`
  color: #868686;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const ListWrapper = styled.div`
  padding: 30px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  align-items: center;
`;

export const ListIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 15px solid #d9d9d9;
  margin-right: 30px;
`;

export const ListTitle = styled.div`
  width: 230px;
  color: #868686;
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
`;

export const PostTitle = styled(CmtContents)`
  cursor: pointer;
`;

export const RcmPost = styled.div`
  width: 1400px;
  margin: auto;
  margin-bottom: 100px;
`;

export const RcmPostTitle = styled(PostListTitle)``;

export const RcmPostItems = styled.div`
  display: flex;
`;

export const RcmPostItem = styled.div`
  width: 335px;
  height: 453px;
  background: #fff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
`;
