import styled from "@emotion/styled";

export const MsgForm = styled.section`
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
`;

// 쪽지 목록

export const MsgListSection = styled.section`
  width: 385px;
  height: 100%;
  border-right: 1px solid #999999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListTitle = styled.div`
  width: 330px;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: #000000;
  margin-top: 50px;
  margin-bottom: 25px;
`;

export const MsgList = styled.button`
  width: 330px;
  height: 70px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 25px;

  background-color: ${(props) =>
    props.selectedId == props.id ? "#c8b6ff" : "transparent"};
  color: ${(props) => (props.selectedId == props.id ? "#FFFFFF" : "#000000")};
`;

export const Profile = styled.img`
  width: 45px;
  height: 45px;
  background-color: aliceblue;
  border-radius: 50%;
  margin-right: 20px;
`;

export const ID = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 3px;
`;

// 채팅창 부분

export const MsgSection = styled.section`
  width: 720px;
  height: 100%;
  border-right: 1px solid #999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NoneSelectedImg = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;

export const NoneSelectedTxt = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: #666666;
`;

export const UserWrapper = styled.div`
  width: 100%;
  height: 78px;
  padding: 16px 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #999999;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding: 20px 10px 20px 20px;

  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바 너비 설정 */
  }

  &:hover::-webkit-scrollbar {
    opacity: 1;
    transition: opacity 0.7s ease-in-out;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 4px;
    transition: opacity 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;


export const ChatBubbleWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isSend ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

export const ChatBubble = styled.div`
  padding: 16px 25px;
  background-color: #c8b6ff;
  border-radius: 30px;
  /* height: 1000px; */

  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  color: #ffffff;
`;

export const ChatDate = styled.div`
  
  color: #000000;
  text-align: center;
`;
export const ChatTime = styled.div`
  font-size: 12px;
  padding: 16px 25px;
  display: none;
  background-color: #ffffff;
  color: #000000;
  display: ${(props) => (props.show ? "block" : "none")};
`;



export const SendWrapper = styled.form`
  height: 73px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-top: 1px solid #999999;
`;

export const SendInput = styled.input`
  width: 550px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  padding: 15px 10px;
`;

export const SendBtn = styled.button`
  width: 92px;
  height: 52px;
  background: #c8b6ff;
  border-radius: 10px;

  font-weight: 700;
  font-size: 15px;
  line-height: 1;
  text-align: center;
  color: #ffffff;

  &:hover{
    background: #ffffff;
    color: #000000;
  }
  ${({ sendOn }) => 
  sendOn && 
  `
  background: #ffffff;
  color: #000000;
  `
  }
`;