import { useEffect, useState } from "react";
import * as S from "./Messengser.styles";

export default function Messenger(props) {
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

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
                props.onClickMsgList(e.chatRoomId, e.name, e.profileUrl, e.recipientId)
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
              {props.msgData.chatContents.map((e, index) => {
                // 이전 메시지의 날짜와 현재 메시지의 날짜 비교
                const currentDate = e.sendTime.split("T")[0];
                const previousDate =
                  index > 0 ? props.msgData.chatContents[index - 1].sendTime.split("T")[0] : "";

                // 날짜가 변경되었을 때에만 ChatDate 표시
                const showDate = currentDate !== previousDate;

                return (
                  <>
                  {showDate && (
                    <S.ChatDate>{e.sendTime.split("T")[0]}</S.ChatDate>
                  )}
                  <S.ChatBubbleWrapper 
                    isSend={e.sender}
                  >
                    {e.sender 
                    ?
                    (<>
                    <S.ChatTime show={isHovered && hoverIndex === index}>{`${e.sendTime.split("T")[1].split(":")[0]}:${e.sendTime.split("T")[1].split(":")[1]}`}</S.ChatTime>
                    <S.ChatBubble
                      onMouseEnter={() => {
                        setIsHovered(true)
                        setHoverIndex(index);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setHoverIndex(null);
                      }}
                    >
                      {e.content}
                    </S.ChatBubble>
                    </>)
                    :
                    (<>
                    <S.ChatBubble
                      onMouseEnter={() => {
                        setIsHovered(true)
                        setHoverIndex(index);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setHoverIndex(null);
                      }}
                    >
                      {e.content}
                    </S.ChatBubble>
                    <S.ChatTime show={isHovered && hoverIndex === index}>{`${e.sendTime.split("T")[1].split(":")[0]}:${e.sendTime.split("T")[1].split(":")[1]}`}</S.ChatTime>
                    </>)
                  }
                  </S.ChatBubbleWrapper>
                  </>
                )
              })}
            </S.ChatWrapper>
            <S.SendWrapper onSubmit={props.onSubmitSendMsg}>
              <S.SendInput
                name="message"
                autocomplete="off"
                onChange={(e) => setInput(e.target.value)}
              ></S.SendInput>
              <S.SendBtn sendOn={input.length > 0}>Send</S.SendBtn>
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
