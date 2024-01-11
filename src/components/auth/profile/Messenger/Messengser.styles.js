import styled from "styled-components";

export const MsgForm = styled.section`
  flex: 1;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  border-top: 1px solid #999;
`;

// 쪽지 목록

export const MsgListSection = styled.section`
  width: 30%;
  height: 100%;
  border-right: 1px solid #999999;
  padding: 32px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const ListTitle = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  color: #333;
  margin-bottom: 32px;
`;

export const MsgList = styled.button`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;

  background-color: ${({ selectedId, id, theme }) =>
    selectedId == id ? theme.colors.main1 : "transparent"};
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export const ID = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.selectedId == props.id ? "#FFFFFF" : "#000000")};
`;

export const Date = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${(props) => (props.selectedId == props.id ? "#fff" : "#999")};
`;

// 채팅창 부분

export const MsgSection = styled.section`
  width: 70%;
  height: 100%;
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
  color: #666666;
`;

export const TopWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
`;

export const TopContent = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.main2};
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  div {
    color: white;
    font-size: 18px;
  }
`;

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BlockTxt = styled.div`
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  /* &:hover {
    color: ${({ theme }) => theme.colors.main2};
  } */
`;

export const BlockHypen = styled.div`
  width: 1px;
  height: 15px;
  background: #999;
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding: 20px 10px 20px 20px;

  &::-webkit-scrollbar {
    width: 4px; /* 스크롤바 너비 설정 */
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
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.main1};
  border-radius: 30px;

  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

export const ChatDate = styled.div`
  margin: 10px 0;
  font-size: 12px;
  color: #666666;
  text-align: center;
`;

export const ChatTime = styled.div`
  font-size: 10px;
  display: none;
  background-color: #ffffff;
  color: #666666;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export const SendWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px;

  input {
    flex: 1;
    font-size: 16px;
    padding: 12px 20px;
    border-radius: 10px;
    background: rgba(154, 179, 245, 0.2);
  }

  button {
    padding: 12px;
    background: ${({ theme }) => theme.colors.main2};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    color: #ffffff;
  }
`;
