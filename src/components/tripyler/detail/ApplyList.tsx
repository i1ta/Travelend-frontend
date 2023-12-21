import Axios from "@/apis";
import { ApplyListData, ApplyListItem } from "@/interfaces/detail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ListItem = ({ el, checkApplyUser, onClickApplyBtn }: ApplyListItem) => {
  return (
    <ApplyItem key={el.applicantId}>
      <ApplyProfileWrapper
        id={el.applicantId.toString()}
        onClick={checkApplyUser}
      >
        <UserImg src={el.profileUrl || "/icon/defaultProfile.png"} />
      </ApplyProfileWrapper>
      <ApplyID id={el.applicantId.toString()} onClick={checkApplyUser}>
        {el.nickname}
      </ApplyID>
      <ViewApplyBtn onClick={() => onClickApplyBtn(el.tripylerApplyId)}>
        신청폼
      </ViewApplyBtn>
    </ApplyItem>
  );
};

export default function ApplyList() {
  const router = useRouter();
  const { tripylerId } = router.query;
  const [applyList, setApplyList] = useState<ApplyListData[]>([]);
  const [isOpenApplyList, setIsOpenApplyList] = useState(false);

  const fetchList = async () => {
    await Axios.get("/tripyler/apply")
      .then((res) => {
        const { [tripylerId as string]: selectedValue } = res.data.data;
        setApplyList([...selectedValue]);
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const onClickMoreApply = () => {
    setIsOpenApplyList((prev) => !prev);
  };

  const checkApplyUser = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push({
      pathname: "/auth/profile",
      query: { userId: parseInt(e.currentTarget.id) },
    });
  };

  const onClickApplyBtn = (id: number) => {
    router.push(`/findTripyler/${tripylerId}/${id}`);
  };

  useEffect(() => {
    if (tripylerId) fetchList();
  }, [tripylerId]);

  return (
    <PostList>
      <PostListTitleWrapper>
        <PostListTitle>동행 신청자</PostListTitle>
        <PostListCnt>총 {applyList.length}명</PostListCnt>
      </PostListTitleWrapper>

      {applyList.length > 0 ? (
        <List>
          {isOpenApplyList
            ? applyList.map((el) => (
                <ListItem
                  el={el}
                  checkApplyUser={checkApplyUser}
                  onClickApplyBtn={onClickApplyBtn}
                />
              ))
            : applyList
                .filter((el: any, index: number) => index < 6)
                .map((el: any) => (
                  <ApplyItem key={el.applicantId}>
                    <ApplyProfileWrapper>
                      <UserImg
                        src={el.profileUrl || "/icon/defaultProfile.png"}
                      />
                    </ApplyProfileWrapper>
                    <ApplyID>{el.nickname}</ApplyID>
                    <ViewApplyBtn
                      onClick={() =>
                        router.push(
                          `/findTripyler/${tripylerId}/${el.tripylerApplyId}`
                        )
                      }
                    >
                      신청폼
                    </ViewApplyBtn>
                  </ApplyItem>
                ))}
        </List>
      ) : (
        <NoCmtWrapper>
          <NoCmtIcon src="/icon/noUser.png" />
          <NoCmtTxt>신청자가 없어요</NoCmtTxt>
        </NoCmtWrapper>
      )}
      {applyList.length > 6 && (
        <MoreBtn onClick={onClickMoreApply}>
          <MoreBtnTxt>{isOpenApplyList ? "닫기" : "전체보기"}</MoreBtnTxt>
          <MoreBtnIcon src="/icon/moreBtn.svg" isOpen={isOpenApplyList} />
        </MoreBtn>
      )}
    </PostList>
  );
}

export const PostList = styled.div`
  width: 100%;
`;

export const PostListTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const PostListTitle = styled.div`
  color: #868686;
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
`;

export const PostListCnt = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 400;
`;

export const List = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

export const ApplyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ApplyProfileWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 0px;
  margin-bottom: 10px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ApplyID = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    font-weight: 700;
  }
`;

export const ViewApplyBtn = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #9ab3f5;

  color: #9ab3f5;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

export const UserImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const CmtListWrapper = styled.div`
  padding: 30px 40px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

export const NoCmtWrapper = styled(CmtListWrapper)`
  padding: 50px 40px;
  align-items: center;
  gap: 25px;
`;

export const NoCmtIcon = styled.img`
  width: 80px;
  height: 80px;
`;

export const NoCmtTxt = styled.div`
  font-size: 18px;
  color: #666;
`;

export const MoreBtn = styled.button`
  width: 1400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: aliceblue;
  }
`;

export const MoreBtnTxt = styled.div`
  margin-right: 15px;
  color: #868686;
  font-size: 20px;
  font-weight: 500;
`;

export const MoreBtnIcon = styled.img<MoreBtnIconProps>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "none")};
`;

interface MoreBtnIconProps {
  isOpen?: boolean;
}
