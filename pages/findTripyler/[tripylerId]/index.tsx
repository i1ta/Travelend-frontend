import Banner from "@/components/tripyler/detail/Banner";
import TripylerDetailForm from "@/components/tripyler/detail/TripylerDetailForm";
import Comment from "@/components/commons/Comment";
import MorePost from "@/components/commons/MorePost";
import ApplyList from "@/components/tripyler/detail/ApplyList";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "@/apis";
import React from "react";
import { TripylerDetailData, MorePostData } from "@/interfaces/detail";

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
      <TripylerDetailForm data={data} fetchData={fetchData} />
      {data?.myTripyler && <ApplyList />}
      <Comment />
      <MorePost data={morePostData} />
    </>
  );
}
