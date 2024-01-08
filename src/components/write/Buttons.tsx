import styled from "styled-components";

interface ButtonsProps {
  isEdit?: boolean;
}

export default function Buttons({ isEdit }: ButtonsProps) {
  const onClickCancelBtn = () => {
    alert("취소");
  };

  const onClickEditBtn = () => {
    alert("수정");
  };

  const onClickSubmitBtn = () => {
    alert("작성");
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
