import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import { MorePostData, ReviewDetailData } from "../../../src/interfaces/detail";
import Axios from "../../../src/apis";

import Banner from "../../../src/components/detail/Banner";
import ReviewForm from "../../../src/components/detail/ReviewForm";
import Comment from "../../../src/components/detail/Comment";
import MorePost from "../../../src/components/detail/MorePost";

export default function ReviewDetailPage() {
  const router = useRouter();
  const { reviewId } = router.query;

  const [data, setData] = useState<ReviewDetailData>();
  const [morePostData, setMorePostData] = useState<MorePostData>();

  // 데이터 불러오기
  const fetchData = async () => {
    await Axios.get(`/review/${reviewId}`)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setData({ ...data });
        setMorePostData({
          previousId: data.previousReviewId,
          nextId: data.nextReviewId,
          previousTitle: data.previousTitle,
          nextTitle: data.nextTitle,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (reviewId) {
      fetchData();
    }
  }, [reviewId]);

  return (
    <>
      <Banner imageUrl={data?.tripylerImage} />
      <Container>
        <ReviewForm data={data} fetchData={fetchData} />
        <Comment isReview />
        <MorePost data={morePostData} isReview />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1000px;
  width: 95%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px;
`;
