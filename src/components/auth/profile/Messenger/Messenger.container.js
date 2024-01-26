import { useEffect, useState, useRef } from "react";
import * as S from "./Messengser.styles";
import Report from "@/components/commons/Modal/Report";
import Block from "@/components/commons/Modal/Block";
import { useRouter } from "next/router";
import { IoChatbubbleEllipsesOutline, IoSend } from "react-icons/io5";

export default function Messenger(props) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [nowChatRoomId, setNowChatRoomId] = useState(0);
  const [nowRecipientId, setNowRecipientId] = useState(0);
  const containerRef = useRef();

  const MoveToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "auto",
    });
    console.log("실행");
  };

  useEffect(() => {
    MoveToBottom();
  }, [props.msgData]);

  // 차단기능
  const [isOpenBlock, setIsOpenBlock] = useState(false);
  const toggleBlock = () => {
    setIsOpenBlock((prev) => !prev);
  };

  // 신고기능
  const [isOpenReport, setIsOpenReport] = useState(false);
  const toggleReport = () => {
    setIsOpenReport((prev) => !prev);
  };

  return (
    <>
      <S.MsgForm>
        <S.MsgListSection>
          <S.ListTitle onClick={toggleBlock}>쪽지 목록</S.ListTitle>
          {props.msgListData.map((e) => (
            <S.MsgList
              id={e.chatRoomId}
              type="button"
              onClick={() => {
                props.onClickMsgList(
                  e.chatRoomId,
                  e.name,
                  e.profileUrl,
                  e.recipientId
                );
                setNowChatRoomId(e.chatRoomId);
                setNowRecipientId(e.recipientId);
              }}
              selectedId={props.msgData.chatRoomId}
            >
              <S.ProfileContainer>
                <S.Profile
                  src={e.profileUrl || "/icon/defaultProfile.png"}
                ></S.Profile>
                <S.ID id={e.chatRoomId} selectedId={props.msgData.chatRoomId}>
                  {e.name}
                </S.ID>
              </S.ProfileContainer>
              <S.Date id={e.chatRoomId} selectedId={props.msgData.chatRoomId}>
                23.11.24
              </S.Date>
            </S.MsgList>
          ))}
        </S.MsgListSection>

        {props.msgData.chatRoomId ? (
          <S.MsgSection>
            <S.TopWrapper>
              <S.TopContent>
                <S.UserWrapper
                  onClick={() =>
                    router.push(
                      `/auth/profile?userId=${props.msgData.recipientId}`
                    )
                  }
                >
                  <S.Profile
                    src={props.msgData.profileUrl || "/icon/defaultProfile.png"}
                  ></S.Profile>
                  <div>{props.msgData?.name}</div>
                </S.UserWrapper>
                <S.BlockWrapper>
                  <S.BlockTxt onClick={toggleReport}>신고</S.BlockTxt>
                  <S.BlockHypen />
                  <S.BlockTxt onClick={toggleBlock}>차단</S.BlockTxt>
                </S.BlockWrapper>
              </S.TopContent>
            </S.TopWrapper>

            <S.ChatWrapper ref={containerRef}>
              {props.msgData.chatContents.map((e, index) => {
                // 이전 메시지의 날짜와 현재 메시지의 날짜 비교
                const currentDate = e.sendTime.split("T")[0];
                const previousDate =
                  index > 0
                    ? props.msgData.chatContents[index - 1].sendTime.split(
                        "T"
                      )[0]
                    : "";

                // 날짜가 변경되었을 때에만 ChatDate 표시
                const showDate = currentDate !== previousDate;

                return (
                  <>
                    {showDate && (
                      <S.ChatDate>{e.sendTime.split("T")[0]}</S.ChatDate>
                    )}
                    <S.ChatBubbleWrapper isSend={e.sender}>
                      {e.sender ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "8px",
                          }}
                        >
                          <S.ChatTime
                            show={isHovered && hoverIndex === index}
                          >{`${e.sendTime.split("T")[1].split(":")[0]}:${
                            e.sendTime.split("T")[1].split(":")[1]
                          }`}</S.ChatTime>
                          <S.ChatBubble
                            onMouseEnter={() => {
                              setIsHovered(true);
                              setHoverIndex(index);
                            }}
                            onMouseLeave={() => {
                              setIsHovered(false);
                              setHoverIndex(null);
                            }}
                          >
                            {e.content}
                          </S.ChatBubble>
                        </div>
                      ) : (
                        <>
                          <S.ChatBubble
                            onMouseEnter={() => {
                              setIsHovered(true);
                              setHoverIndex(index);
                            }}
                            onMouseLeave={() => {
                              setIsHovered(false);
                              setHoverIndex(null);
                            }}
                          >
                            {e.content}
                          </S.ChatBubble>
                          <S.ChatTime
                            show={isHovered && hoverIndex === index}
                          >{`${e.sendTime.split("T")[1].split(":")[0]}:${
                            e.sendTime.split("T")[1].split(":")[1]
                          }`}</S.ChatTime>
                        </>
                      )}
                    </S.ChatBubbleWrapper>
                  </>
                );
              })}
            </S.ChatWrapper>

            <S.SendWrapper onSubmit={props.onSubmitSendMsg}>
              <input
                name="message"
                autocomplete="off"
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button sendOn={input.length > 0}>
                <IoSend />
              </button>
            </S.SendWrapper>
          </S.MsgSection>
        ) : (
          <S.MsgSection style={{ alignItems: "center" }}>
            <IoChatbubbleEllipsesOutline
              style={{
                color: "#666",
                fontSize: "120px",
                marginBottom: "24px",
              }}
            />
            <S.NoneSelectedTxt>쪽지 목록을 선택해주세요</S.NoneSelectedTxt>
          </S.MsgSection>
        )}
      </S.MsgForm>

      {/* ========== 모달 ========== */}
      {isOpenBlock && (
        <Block
          name={props.msgData.name}
          id={nowRecipientId}
          toggleBlock={toggleBlock}
        />
      )}
      {isOpenReport && (
        <Report
          name={props.msgData.name}
          id={nowRecipientId}
          toggleReport={toggleReport}
        />
      )}
    </>
  );
}
