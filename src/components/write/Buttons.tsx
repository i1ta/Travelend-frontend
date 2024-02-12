import Axios from "@/apis";
import { ButtonsProps } from "@/interfaces/write";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Buttons({
  isEdit,
  isReview,
  tripylerData,
  image,
  reviewData,
  imageData,
}: ButtonsProps) {
  const router = useRouter();
  const { tripylerId, reviewId } = router.query;

  // 찾기 작성/수정 버튼
  const onClickTripylerBtn = async () => {
    const formData = new FormData();
    formData.append(
      "tripylerCreateDto",
      new Blob([JSON.stringify(tripylerData)], { type: "application/json" })
    );
    if (image !== undefined) formData.append("images", image);

    if (!isEdit) {
      // ========== 찾기 작성 api ==========
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
        .catch((error) => {
          console.error(error);
          console.log(tripylerData);
        });
    } else {
      // ========== 찾기 수정 api ==========
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
        .catch((err) => {
          console.error(err);
          console.log(tripylerData);
        });
    }
  };

  // 리뷰 작성/수정 버튼
  const onClickReviewBtn = async () => {
    if (!isEdit) {
      // ========== 리뷰 작성 api ==========
      await Axios.post("/review", reviewData)
        .then((res) => {
          if (imageData !== undefined) {
            if (imageData.length > 0) {
              imageData.forEach(async (el, idx) => {
                const formData = new FormData();
                formData.append("images", el.file);

                await Axios.post(
                  `/review/${res.data.data}/profile-picture`,
                  formData
                )
                  .then((res) => {
                    if (idx === imageData.length - 1) {
                      alert("후기가 등록되었습니다.");
                      router.push("/review");
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    return;
                  });
              });
            } else {
              alert("후기가 등록되었습니다.");
              router.push("/review");
            }
          }
        })
        .catch((error) => console.error(error));
    } else {
      // ========== 리뷰 수정 api (미완) ==========
      await Axios.patch(`/review/${reviewId}`, reviewData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      })
        .then((res) => {
          // alert(res.data.data);
          alert("작성이 완료되었습니다.");
          // router.push("/review");
        })
        .catch((error) => console.error(error));
    }
  };

  const onClickCancelBtn = () => {
    // alert("취소");
    console.log(tripylerData);
    // console.log(reviewData);
    console.log(imageData);
  };

  return (
    <BtnWrapper>
      <CancelBtn onClick={onClickCancelBtn}>취소</CancelBtn>
      <SubmitBtn onClick={!isReview ? onClickTripylerBtn : onClickReviewBtn}>
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
