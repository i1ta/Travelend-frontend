import { useEffect, useState } from "react";
import * as S from "./Messengser.styles";

export default function Messenger(props) {
  return (
    <>
      <S.MsgForm>
        <S.MsgListSection>
          <S.ListTitle>쪽지 목록</S.ListTitle>
          {props.msgListData.map((e) => (
            <S.MsgList
              id={e.chatRoomId}
              type="button"
              onClick={() =>
                props.onClickMsgList(e.chatRoomId, e.name, e.profileUrl)
              }
              selectedId={props.msgData.chatRoomId}
            >
              <S.Profile
                src={e.profileUrl || "/icon/defaultProfile.png"}
              ></S.Profile>
              <S.ID>{e.name}</S.ID>
            </S.MsgList>
          ))}
        </S.MsgListSection>

        {props.msgData.chatRoomId ? (
          <S.MsgSection>
            <S.UserWrapper>
              <S.Profile
                src={props.msgData.profileUrl || "/icon/defaultProfile.png"}
              ></S.Profile>
              <S.ID>{props.msgData.name}</S.ID>
            </S.UserWrapper>
            <S.ChatWrapper>
              {props.msgData.chatContents.map((e) => (
                <S.ChatBubbleWrapper isSend={e.sender}>
                  <S.ChatBubble>{e.content}</S.ChatBubble>
                </S.ChatBubbleWrapper>
              ))}
            </S.ChatWrapper>
            <S.SendWrapper onSubmit={props.onSubmitSendMsg}>
              <S.SendInput
                // onChange={props.onChangeSendMsg}
                // value={props.sendMsg}
                // onKeyPress={props.onKeyPressSendMsg}
                name="message"
                autocomplete="off"
              ></S.SendInput>
              <S.SendBtn>Send</S.SendBtn>
            </S.SendWrapper>
          </S.MsgSection>
        ) : (
          <S.MsgSection style={{ alignItems: "center" }}>
            <S.NoneSelectedImg src="/icon/dialogue.png" />
            <S.NoneSelectedTxt>쪽지 목록을 선택해주세요</S.NoneSelectedTxt>
          </S.MsgSection>
        )}
      </S.MsgForm>
    </>
  );
}
