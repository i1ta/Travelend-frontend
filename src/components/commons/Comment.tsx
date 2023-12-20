import styled from "styled-components";
import Axios from "../../apis";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Data {
  content: string;
  nickname: string;
  userId: number;
}

export default function Comment() {
  const router = useRouter();
  const { tripylerId } = router.query;
  const [data, setData] = useState<Data[]>([]);
  const [cmtLen, setCmtLen] = useState(5);

  const fetchComment = async () => {
    await Axios.get(`/tripyler/${tripylerId}/comment/list`)
      .then((res) => {
        setData([...res.data.data]);
      })
      .catch((error) => console.error(error));
  };

  const onClickMoreCmt = () => {
    if (data.length > cmtLen) setCmtLen((prev) => prev + 5);
  };

  const onSubmitCmt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await Axios.post(`/tripyler/comment`, {
      content: e.currentTarget.comment.value,
      tripylerId,
    })
      .then(() => {
        fetchComment();
      })
      .catch((err) => console.error(err));
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (tripylerId) fetchComment();
  }, [tripylerId]);

  return (
    <PostList>
      <PostListTitleWrapper>
        <PostListTitle>댓글</PostListTitle>
        <PostListCnt>{data.length}개</PostListCnt>
      </PostListTitleWrapper>
      {data.length > 0 ? (
        <CmtListWrapper>
          {data
            .filter((el: any, idx: number) => idx < cmtLen)
            .map((el: any) => (
              <CmtList>
                <ListTitle>{el.nickname}</ListTitle>
                <CmtContents>{el.content}</CmtContents>
              </CmtList>
            ))}
        </CmtListWrapper>
      ) : (
        <NoCmtWrapper>
          <NoCmtIcon src="/icon/noCmt.png" />
          <NoCmtTxt>첫 댓글을 작성해보세요</NoCmtTxt>
        </NoCmtWrapper>
      )}

      {data.length > cmtLen && (
        <MoreBtn onClick={onClickMoreCmt}>
          <MoreBtnTxt>댓글 더보기</MoreBtnTxt>
          <MoreBtnIcon src="/icon/moreBtn.svg" />
        </MoreBtn>
      )}
      <CmtWriteWrapper onSubmit={onSubmitCmt}>
        <ListTitle>댓글 작성하기</ListTitle>
        <CmtInput
          placeholder="직접 댓글을 작성해보세요"
          name="comment"
          autoComplete="off"
        />
        <CmtWriteBtn>작성</CmtWriteBtn>
      </CmtWriteWrapper>
    </PostList>
  );
}

const PostList = styled.div`
  width: 1400px;
  margin: auto;
  margin-bottom: 120px;
`;

const PostListTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const PostListTitle = styled.div`
  color: #868686;
  font-size: 30px;
  font-weight: 700;
  margin-right: 20px;
`;

const PostListCnt = styled.div`
  color: #666;
  font-size: 20px;
  font-weight: 400;
`;

const ListTitle = styled.div`
  width: 230px;
  color: #868686;
  font-size: 24px;
  font-weight: 700;
  margin-right: 20px;
`;

const CmtListWrapper = styled.div`
  padding: 30px 40px;
  border-top: 1px solid rgba(214, 214, 214, 0.6);
  border-bottom: 1px solid rgba(214, 214, 214, 0.6);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const NoCmtWrapper = styled(CmtListWrapper)`
  padding: 50px 40px;
  align-items: center;
  gap: 25px;
`;

const NoCmtIcon = styled.img`
  width: 80px;
  height: 80px;
`;

const NoCmtTxt = styled.div`
  font-size: 18px;
  color: #666;
`;

const CmtList = styled.div`
  display: flex;
  align-items: center;
`;

const CmtContents = styled.div`
  color: #868686;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MoreBtn = styled.button`
  width: 1400px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: aliceblue;
  }
`;

const MoreBtnTxt = styled.div`
  margin-right: 15px;
  color: #868686;
  font-size: 20px;
  font-weight: 500;
`;

const MoreBtnIcon = styled.img``;

const CmtWriteWrapper = styled.form`
  display: flex;
  align-items: center;
  padding: 0px 40px;
  margin-top: 30px;
`;

const CmtInput = styled.input`
  width: 950px;
  height: 60px;
  padding: 15px 26px;
  color: #868686;
  font-size: 20px;
  font-weight: 500;
  margin-right: 30px;

  border-radius: 10px;
  background: rgba(225, 225, 225, 0.3);
  border: none;
`;

const CmtWriteBtn = styled.button`
  width: 150px;
  height: 60px;
  background-color: #90e0ef;
  border-radius: 10px;

  color: #fff;
  font-size: 22px;
  font-weight: 500;
`;
