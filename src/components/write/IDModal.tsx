import Axios from "@/apis";
import { IDModalProps, TripylerWithList } from "@/interfaces/write";
import { useState } from "react";
import styled from "styled-components";

export default function IDModal({
  data,
  setData,
  setIsOpenModal,
}: IDModalProps) {
  const [errTripyler, setErrTripyler] = useState("");
  const [withTripylerList, setWithTripylerList] = useState<TripylerWithList[]>(
    []
  );

  const onSubmitFindID = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = event.currentTarget.search.value;
    await Axios.get(`/review/find-user?username=${value}`)
      .then((res) => {
        if (res.data.data > 0) {
          if (withTripylerList.map((el) => el.nickname).includes(value)) {
            setErrTripyler("이미 포함된 아이디입니다.");
          } else {
            setWithTripylerList((prev) => [
              ...prev,
              {
                id: res.data.data,
                nickname: value,
              },
            ]);
            setErrTripyler("");
          }
        } else {
          setErrTripyler("해당 아이디는 존재하지 않습니다.");
        }
      })
      .catch((err) => console.error(err));
    (event.target as HTMLFormElement).reset();
  };

  const handleSubmit = () => {
    setData((prev) => ({ ...prev, tripylerWithList: [...withTripylerList] }));
    setIsOpenModal(false);
  };

  const handleDelID = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWithTripylerList(
      withTripylerList.filter((e) => e.id !== event.currentTarget.id)
    );
  };

  return (
    <ModalOverlay>
      <Modal>
        <ModalTitle>아이디 검색</ModalTitle>
        <ModalInputWrapper onSubmit={onSubmitFindID}>
          <ModalInput placeholder="아이디 검색" name="search"></ModalInput>
          <ModalInputBtn>
            <img src="/icon/search.png" />
          </ModalInputBtn>
        </ModalInputWrapper>
        <ModalHashtagError>{errTripyler}</ModalHashtagError>
        <ModalTripylerWrapper>
          {withTripylerList.map((el) => (
            <ModalTripylerID onClick={handleDelID} key={el.id} id={el.id}>
              @{el.nickname}
            </ModalTripylerID>
          ))}
        </ModalTripylerWrapper>
        <ModalBtnWrapper>
          <ModalCancelBtn
            onClick={() => {
              setIsOpenModal(false);
            }}
          >
            취소
          </ModalCancelBtn>
          <ModalSubmitBtn onClick={handleSubmit}>확인</ModalSubmitBtn>
        </ModalBtnWrapper>
      </Modal>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  min-width: 550px;
  padding-bottom: 27px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px 10px 0px 0px;
  background-color: ${({ theme }) => theme.colors.main1};
  text-align: center;
  margin-bottom: 26px;

  font-weight: 700;
  font-size: 22px;
  line-height: 50px;
  color: #ffffff;
`;

const ModalInputWrapper = styled.form`
  width: 460px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.main1};
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const ModalInput = styled.input`
  width: 422px;
  height: 100%;
  border: none;
  border-radius: 10px;
  padding: 0px 15px;

  font-weight: 500;
  font-size: 14px;
  color: #666;
`;

const ModalInputBtn = styled.button`
  width: 40px;
  height: 100%;
  background: ${({ theme }) => theme.colors.main1};
  border-radius: 8px;

  font-size: 30px;
  line-height: 1;
  color: #ffffff;
`;

const ModalHashtagError = styled.div`
  width: 460px;
  height: 10px;
  font-size: 10px;
  color: red;
  margin-bottom: 15px;
  justify-content: center;
  text-align: center;
`;

const ModalBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 174px;
`;

const ModalCancelBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.main2};
  border: 1px solid ${({ theme }) => theme.colors.main2};
  border-radius: 10px;
  margin: 0 10px;

  text-align: center;
  font-weight: 400;
  font-size: 12px;
`;

const ModalSubmitBtn = styled(ModalCancelBtn)`
  background-color: ${({ theme }) => theme.colors.main2};
  color: #ffffff;
  border: none;
`;

const ModalTripylerWrapper = styled.div`
  height: 27px;
  display: flex;
  gap: 10.5px;
`;

const ModalTripylerID = styled.button`
  padding: 0px 20px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.colors.main1};
  border-radius: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.main1};
  font-size: 14px;
  font-weight: 600;
`;
