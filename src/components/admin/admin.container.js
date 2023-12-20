import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "./admin.style";

export default function Admin() {
  const apipath = "https://api.tripyle.xyz";
  const [blcokList, setBlockList] = useState([]);
  const [reportList, setReportList] = useState([]);

  const fetchBlockList = async () => {
    await axios
      .get(`${apipath}/block/list`)
      .then((res) => {
        console.log(res);
        setBlockList(
          res.data.data.map((el) => ({
            id: el.id,
            item: [
              el.id,
              el.blockerUsername,
              el.blockeeUsername,
              el.regDateTime.replace("T", " / "),
            ],
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  const fetchReportList = async () => {
    await axios
      .get(`${apipath}/report/list`)
      .then((res) => {
        console.log(res);
        setReportList(
          res.data.data.map((el) => ({
            id: el.id,
            item: [
              el.id,
              el.reporterUsername,
              el.reporteeUsername,
              el.reportReason,
              el.content,
              el.regDateTime.replace("T", " / "),
            ],
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] =
      window.localStorage.getItem("login-token");

    fetchReportList();
    fetchBlockList();
  }, []);

  return (
    <>
      <S.Container>
        <S.Title onClick={() => console.log(blcokList, reportList)}>
          차단 목록
        </S.Title>
        <S.ContentTable>
          <thead>
            <tr>
              <S.ContentHeader style={{ width: "5%" }}>NO</S.ContentHeader>
              <S.ContentHeader style={{ width: "35%" }}>
                차단한 유저
              </S.ContentHeader>
              <S.ContentHeader style={{ width: "30%" }}>
                차단된 유저
              </S.ContentHeader>
              <S.ContentHeader style={{ width: "30%" }}>
                차단시간
              </S.ContentHeader>
            </tr>
          </thead>
          <tbody>
            {blcokList?.map((el) => (
              <tr
                // id={el.id}
                style={{ cursor: "pointer" }}
                // onClick={onClickItem}
              >
                {el.item?.map((element) => (
                  <S.TableCell>{element}</S.TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </S.ContentTable>

        <S.Title>신고 목록</S.Title>
        <S.ContentTable>
          <thead>
            <tr>
              <S.ContentHeader style={{ width: "5%" }}>NO</S.ContentHeader>
              <S.ContentHeader style={{ width: "10%" }}>
                신고한 유저
              </S.ContentHeader>
              <S.ContentHeader style={{ width: "10%" }}>
                신고된 유저
              </S.ContentHeader>
              <S.ContentHeader style={{ width: "20%" }}>
                신고이유
              </S.ContentHeader>
              <S.ContentHeader style={{ width: "40%" }}>
                신고내용
              </S.ContentHeader>
              <S.ContentHeader style={{ width: "15%" }}>
                신고시간
              </S.ContentHeader>
            </tr>
          </thead>
          <tbody>
            {reportList?.map((el) => (
              <tr
                id={el.id}
                style={{ cursor: "pointer" }}
                // onClick={onClickItem}
              >
                {el.item?.map((element) => (
                  <S.TableCell>{element}</S.TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </S.ContentTable>
      </S.Container>
    </>
  );
}
