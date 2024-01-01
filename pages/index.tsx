import { useRecoilValue } from "recoil";
import Main from "../src/components/main/Main.container";
import {
  RequestData,
  TripylerMainData
} from "../src/interfaces/main.ts";
import { LoginState } from "../src/states/LoginState";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Axios from "../src/apis";

export default function MainPage() {
  const loginState = useRecoilValue(LoginState);
  const router = useRouter();

  const [data, setData] = useState<TripylerMainData[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (data?.length === 0) {
        const requestData: RequestData = {
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
            `/tripyler/list?isRecruiting=1&option=1`,
            requestData
          );
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Main/>
    </>
  );
}
