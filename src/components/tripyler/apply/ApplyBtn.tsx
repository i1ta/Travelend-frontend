import Axios from "@/apis";
import styled from "styled-components";
import { useRouter } from "next/router";
import { ApplyBtnProps } from "@/interfaces/apply";

export default function ApplyBtn({ isChecked, content }: ApplyBtnProps) {
  const router = useRouter();
  const { tripylerId } = router.query;
  const isAuth = isChecked && content !== "";

  const onClickApplyBtn = async () => {
    await Axios.post("/tripyler/apply", {
      content,
      tripylerId,
    })
      .then(() => {
        alert("신청이 완료되었습니다.");
        router.push(`/findTripyler/${tripylerId}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Btn
      onClick={onClickApplyBtn}
      disabled={!isAuth}
      style={{
        cursor: isAuth ? "" : "default",
        backgroundColor: isAuth ? "" : "#999",
      }}
    >
      신청 완료
    </Btn>
  );
}

const Btn = styled.button`
  width: 100%;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.main1};
  padding: 15px 0;

  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;
