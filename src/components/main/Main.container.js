import {
  FindCardFilter,
  FindCardList,
  JwtTokenState,
  LoginState
} from "@/States/LoginState";
import Axios from "@/apis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import MainBanner from "../commons/MainBanner";
import AdverBanner from "./AdverBanner.tsx";
import ReviewBanner from "./ReviewBanner.tsx";
import ReviewBox from "./ReviewBox.tsx";
import TripylerBox from "./TripylerBox.tsx";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [findCardList, setFindCardList] = useRecoilState(FindCardList);
  const [findCardFilter, setFindCardFilter] = useRecoilState(FindCardFilter);
  const setJwtToken = useSetRecoilState(JwtTokenState);
  const jwtInfo = useRecoilValue(JwtTokenState);
  const apipath = "https://api.tripyle.xyz";

  const [tripylerList, setTripylerList] = useState([]);

  // 토큰이 만료 확인
  // function checkToken() {
  //   if (jwtInfo.expiryTime < new Date().getTime()) {
  //     alert("토큰이 만료되었습니다. 로그인을 다시 진행하여 주세요.");
  //     router.push("/auth/signIn");
  //     logout({ setJwtToken });
  //     setIsLoggedIn(false);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // 로그인 여부 확인
  const checkLogin = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다");
      router.push("/auth/signIn");
    }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     checkToken();
  //   }
  // }, []);

  // 초기값 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (tripylerList.length === 0) {
        const requestData = {
          continentId: 0,
          endDate: null,
          keyWord: "",
          nationId: 0,
          regionId: 0,
          startDate: null,
          totalPeopleNum: 0,
        };

        try {
          const res = await Axios.post(
            `${apipath}/tripyler/list?isRecruiting=1&option=1`,
            requestData
          );
          console.log(res.data.data);
          setTripylerList(res.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  // 여행지 선택
  const [selectedDestination, setSelectedDestination] = useState({
    continent: { id: 0, name: "" },
    country: { id: 0, name: "" },
    city: { id: 0, name: "" },
  });

  // Trip'yler 찾기 필터링
  const router = useRouter();
  const onClcickFilterFind = async () => {
    const requestData = {
      continentId: parseInt(selectedDestination.continent.id),
      endDate: tripDate[1],
      keyWord: keyword,
      nationId: parseInt(selectedDestination.country.id),
      regionId: parseInt(selectedDestination.city.id),
      startDate: tripDate[0],
      totalPeopleNum: parseInt(selectedNum),
    };

    await Axios
      .post(`${apipath}/tripyler/list?isRecruiting=1&option=1`, requestData)
      .then((res) => {
        const arr = res.data.data;
        setFindCardList(res.data.data);
      })
      .catch((error) => console.log(error));

    const query = {
      continent: JSON.stringify(selectedDestination.continent.name),
      continentId: selectedDestination.continent.id,
      country: JSON.stringify(selectedDestination.country.name),
      countryId: selectedDestination.country.id,
      city: JSON.stringify(selectedDestination.city.name),
      cityId: selectedDestination.city.id,
      startDate: JSON.stringify(tripDate[0] || ""),
      endDate: JSON.stringify(tripDate[1] || ""),
      num: selectedNum,
      keyword: JSON.stringify(keyword),
    };

    router.push("/findTripyler");
    console.log(query);
    setFindCardFilter(query);
  };

  // 여행 후기 데이터 불러오기
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        continentId: 0,
        endMonth: 12,
        keyWord: "",
        nationId: 0,
        regionId: 0,
        startMonth: 1,
        totalPeopleNum: 0,
      };

      await Axios
        .post(`${apipath}/review/list?option=4`, requestData)
        .then((res) => {
          setReviewList(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, []);

  // 달력
  const [tripDate, setTripDate] = useState([]);

  // 인원수 선택
  const [selectedNum, setSelectedNum] = useState(0);

  // 검색어
  const [keyword, setKeyword] = useState("");

  return (
    <Container>
      <MainBanner />

      <TripylerBox 
        onClcickFilterFind={onClcickFilterFind} 
        tripylerList={tripylerList}
      />
      <ReviewBanner />
      <ReviewBox 
        reviewList={reviewList}
      />
      <AdverBanner/>
    </Container>
  );
}

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

