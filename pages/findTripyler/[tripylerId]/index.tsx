import Banner from "../../../src/components/tripyler/detail/Banner";
import TripylerDetailForm from "../../../src/components/tripyler/detail/TripylerDetailForm";
import Comment from "../../../src/components/commons/Comment";
import MorePost from "../../../src/components/commons/MorePost";
import ApplyList from "../../../src/components/tripyler/detail/ApplyList";
import {
  TripylerDetailData,
  MorePostData,
} from "../../../src/interfaces/detail";

import Axios from "../../../src/apis";
import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
          previousTripylerId: data.previousTripylerId,
          nextTripylerId: data.nextTripylerId,
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
        <TripylerDetailForm data={data} fetchData={fetchData} />
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
