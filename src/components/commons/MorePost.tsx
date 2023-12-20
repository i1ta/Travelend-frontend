import styled from "styled-components";
import { useRouter } from "next/router";
import { MorePostProps } from "@/interfaces/detail";

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
        <ListIcon />
        <ListTitle>이전 게시물</ListTitle>
        <PostTitle onClick={onClickPrevPost}>{data?.previousTitle}</PostTitle>
      </ListWrapper>
      <ListWrapper
        style={{ borderBottom: "1px solid rgba(214, 214, 214, 0.60)" }}
      >
        <ListIcon style={{ transform: "rotate(180deg)" }} />
        <ListTitle>다음 게시물</ListTitle>
        <PostTitle onClick={onClickNextPost}>{data?.nextTitle}</PostTitle>
      </ListWrapper>
    </PostList>
  );
}

const PostList = styled.div`
  width: 1400px;
  margin: auto;
  margin-bottom: 120px;
`;

const PostListTitle = styled.div`
  color: #868686;
  font-size: 30px;
  font-weight: 700;
  margin-right: 20px;
  margin-bottom: 30px;
`;

const ListWrapper = styled.div`
  padding: 30px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  align-items: center;
`;

const ListIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 15px solid #d9d9d9;
  margin-right: 30px;
`;

const ListTitle = styled.div`
  width: 230px;
  color: #868686;
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
`;

const PostTitle = styled.div`
  color: #868686;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;
