import Comment from "../../../src/components/detail/Comment";
import MorePost from "../../../src/components/detail/MorePost";
import ApplyList from "../../../src/components/detail/ApplyList";
import Banner from "../../../src/components/detail/Banner";
import TripylerForm from "../../../src/components/detail/TripylerForm";
import {
  MorePostData,
  TripylerDetailData,
} from "../../../src/interfaces/detail.ts";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../../../src/apis";

export default function FindTripylerDetailPage() {
  const router = useRouter();
  const { tripylerId } = router.query;

  const [data, setData] = useState<TripylerDetailData>();
  const [morePostData, setMorePostData] = useState<MorePostData>();

  // 데이터 불러오기
  const fetchData = async () => {
    await Axios.get(`/tripyler/${tripylerId}`)
      .then((res) => {
        const data = res.data.data;
        setData({ ...data });
        setMorePostData({
          previousId: data.previousTripylerId,
          nextId: data.nextTripylerId,
          previousTitle: data.previousTitle,
          nextTitle: data.nextTitle,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (tripylerId) {
      fetchData();
    }
  }, [tripylerId]);

  return (
    <>
      <Banner imageUrl={data?.image} />
      <Container>
        <TripylerForm data={data} fetchData={fetchData} />
        {data?.myTripyler && <ApplyList />}
        <Comment />
        <MorePost data={morePostData} />
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
