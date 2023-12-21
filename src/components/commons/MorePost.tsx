import styled from "styled-components";
import { useRouter } from "next/router";
import { MorePostProps } from "@/interfaces/detail";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export default function MorePost({ data }: MorePostProps) {
  const router = useRouter();

  const onClickPrevPost = () => {
    router.push(`/findTripyler/${data.previousTripylerId}`);
  };

  const onClickNextPost = () => {
    router.push(`/findTripyler/${data.nextTripylerId}`);
  };

  return (
    <PostList>
      <PostListTitle>목록</PostListTitle>
      <ListWrapper>
        <FaCaretUp style={{color: "#D9D9D9"}}/>
        <ListTitle>이전 게시물</ListTitle>
        <PostTitle onClick={onClickPrevPost}>{data?.previousTitle}</PostTitle>
      </ListWrapper>
      <ListWrapper
        style={{ borderBottom: "1px solid rgba(214, 214, 214, 0.60)" }}
      >
        <FaCaretDown style={{color: "#D9D9D9"}}/>
        <ListTitle>다음 게시물</ListTitle>
        <PostTitle onClick={onClickNextPost}>{data?.nextTitle}</PostTitle>
      </ListWrapper>
    </PostList>
  );
}

const PostList = styled.div`
  width: 100%;
`;

const PostListTitle = styled.div`
  color: #868686;
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
  margin-bottom: 30px;
`;

const ListWrapper = styled.div`
  padding: 20px 30px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  align-items: center;
`;

const ListTitle = styled.div`
  width: 230px;
  color: #868686;
  font-size: 18px;
  font-weight: 600;
  margin-left: 12px;
  margin-right: 20px;
`;

const PostTitle = styled.div`
  color: #868686;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
