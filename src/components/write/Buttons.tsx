import Axios from "@/apis";
import { useRouter } from "next/router";
import styled from "styled-components";

interface ButtonsProps {
  isEdit?: boolean;
  image?: File | undefined;
  tripylerData?: any;
  reviewData?: any;
}

export default function Buttons({
  isEdit,
  tripylerData,
  image,
  reviewData,
}: ButtonsProps) {
  const router = useRouter();
  const { tripylerId } = router.query;

  const onClickSubmitBtn = async () => {
    const formData = new FormData();
    formData.append(
      "tripylerCreateDto",
      new Blob([JSON.stringify(tripylerData)], { type: "application/json" })
    );
    formData.append("images", image);

    await Axios.post("/tripyler", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    })
      .then((res) => {
        alert("게시물이 등록되었습니다");
        router.push("/findTripyler");
      })
      .catch((error) => console.error(error));
  };

  // 수정완료 버튼
  const onClickEditBtn = async () => {
    const formData = new FormData();
    formData.append(
      "tripylerCreateDto",
      new Blob([JSON.stringify(tripylerData)], { type: "application/json" })
    );
    formData.append("images", image as Blob);

    await Axios.patch(`/tripyler/${tripylerId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    })
      .then((res) => {
        alert(res.data.data);
        router.push(`/findTripyler/${tripylerId}`);
      })
      .catch((err) => console.error(err));
  };

  const onClickCancelBtn = () => {
    // alert("취소");
    console.log(tripylerData);
  };

  return (
    <BtnWrapper>
      <CancelBtn onClick={onClickCancelBtn}>취소</CancelBtn>
      <SubmitBtn onClick={isEdit ? onClickEditBtn : onClickSubmitBtn}>
        {isEdit ? "수정" : "작성"} 완료
      </SubmitBtn>
    </BtnWrapper>
  );
}

const BtnWrapper = styled.div`
  display: flex;
`;

const CancelBtn = styled.button`
  width: 200px;
  height: 60px;
  border-radius: 5px;
  background: #d9d9d9;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

const SubmitBtn = styled(CancelBtn)`
  background: ${({ theme }) => theme.colors.main2};
  margin-left: 45px;
`;
