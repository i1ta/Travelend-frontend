import { useState } from "react";
import * as S from "./Messengser.styles";

export default function Messenger() {
  const [selectedMsg, setSelectedMsg] = useState("");

  const onClickMsgList = (event) => {
    event.preventDefault();
    setSelectedMsg(event.currentTarget.id);
    console.log(event.currentTarget);
  };

  return (
    <>
      <S.MsgForm>
        <S.MsgListSection>
          <S.ListTitle>쪽지 목록</S.ListTitle>
          <S.MsgList
            id="user02"
            onClick={onClickMsgList}
            selectedMsg={selectedMsg}
          >
            <S.Profile src="/img/shinchan.jpg"></S.Profile>
            <S.ListInfoWrapper>
              <S.ID>user02</S.ID>
              <S.ListContents>안녕하세요!</S.ListContents>
            </S.ListInfoWrapper>
            <S.isReadPoint></S.isReadPoint>
          </S.MsgList>
          <S.MsgList
            id="user03"
            onClick={onClickMsgList}
            selectedMsg={selectedMsg}
          >
            <S.Profile src="/img/shinchan.jpg"></S.Profile>
            <S.ListInfoWrapper>
              <S.ID>user03</S.ID>
              <S.ListContents>안녕하세요!</S.ListContents>
            </S.ListInfoWrapper>
            <S.isReadPoint></S.isReadPoint>
          </S.MsgList>
          <S.MsgList
            id="user04"
            onClick={onClickMsgList}
            selectedMsg={selectedMsg}
          >
            <S.Profile src="/img/shinchan.jpg"></S.Profile>
            <S.ListInfoWrapper>
              <S.ID>user04</S.ID>
              <S.ListContents>안녕하세요!</S.ListContents>
            </S.ListInfoWrapper>
            <S.isReadPoint></S.isReadPoint>
          </S.MsgList>
        </S.MsgListSection>

        {selectedMsg ? (
          <S.MsgSection>
            <S.UserWrapper>
              <S.Profile
                src="/img/shinchan.jpg"
                style={{ marginRight: "20px" }}
              ></S.Profile>
              <S.ID>{selectedMsg}</S.ID>
            </S.UserWrapper>
            <S.ChatWrapper>
              <S.ChatBubbleWrapper isSend={true}>
                <S.ChatBubble>안녕하세요!</S.ChatBubble>
              </S.ChatBubbleWrapper>
              <S.ChatBubbleWrapper isSend={false}>
                <S.ChatBubble>안녕하세요!</S.ChatBubble>
              </S.ChatBubbleWrapper>
              <S.ChatBubbleWrapper isSend={true}>
                <S.ChatBubble>산토리니 글 보고 연락드려요</S.ChatBubble>
              </S.ChatBubbleWrapper>
            </S.ChatWrapper>
            <S.SendWrapper>
              <S.SendInput></S.SendInput>
              <S.SendBtn>Send</S.SendBtn>
            </S.SendWrapper>
          </S.MsgSection>
        ) : (
          <S.MsgSection style={{alignItems: "center"}}>
            <S.NoneSelectedImg src='/icon/dialogue.png'/>
            <S.NoneSelectedTxt>쪽지 목록을 선택해주세요</S.NoneSelectedTxt>
          </S.MsgSection>
        )}
      </S.MsgForm>
    </>
  );
}
