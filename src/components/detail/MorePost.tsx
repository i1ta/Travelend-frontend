import { MorePostProps } from "@/interfaces/detail";
import { useRouter } from "next/router";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styled from "styled-components";

export default function MorePost({ data, isReview }: MorePostProps) {
  const router = useRouter();

  const onClickPrevPost = () => {
    isReview
      ? router.push(`/review/${data.previousId}`)
      : router.push(`/findTripyler/${data.previousId}`);
  };

  const onClickNextPost = () => {
    isReview
      ? router.push(`/review/${data.nextId}`)
      : router.push(`/findTripyler/${data.nextId}`);
  };

  return (
    <PostList>
      <PostListTitle>목록</PostListTitle>
      <ListWrapper>
        <FaCaretUp style={{ color: "#D9D9D9" }} />
        <ListTitle>이전 게시물</ListTitle>
        <PostTitle
          onClick={onClickPrevPost}
          disabled={data?.previousId === null}
          style={{ cursor: data?.previousId === null ? "default" : "pointer" }}
        >
          {data?.previousTitle || "--- 없음 ---"}
        </PostTitle>
      </ListWrapper>
      <ListWrapper
        style={{ borderBottom: "1px solid rgba(214, 214, 214, 0.60)" }}
      >
        <FaCaretDown style={{ color: "#D9D9D9" }} />
        <ListTitle>다음 게시물</ListTitle>
        <PostTitle
          onClick={onClickNextPost}
          disabled={data?.nextId === null}
          style={{ cursor: data?.nextId === null ? "default" : "pointer" }}
        >
          {data?.nextTitle || "--- 없음 ---"}
        </PostTitle>
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

const PostTitle = styled.button`
  color: #868686;
  font-size: 16px;
  font-weight: 500;
`;
