import Axios from "@/apis";
import { Place, PlaceModalProps } from "@/interfaces/write";
import { useState } from "react";
import styled from "styled-components";

export default function PlaceModal({
  setIsOpenModal,
  setPlaceData,
}: PlaceModalProps) {
  const [place, setPlace] = useState<Place | undefined>();
  const [errPlace, setErrPlace] = useState("");

  const onSubmitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = event.currentTarget.search.value;

    await Axios.get(`/tripyler/search?regionName=${value}`)
      .then((res) => {
        setPlace({ ...res.data.data });
        setErrPlace("");
      })
      .catch((err) => {
        setPlace(undefined);
        setErrPlace("서비스하지 않는 지역입니다.");
      });
    (event.target as HTMLFormElement).reset();
  };

  const handleSubmitModal = () => {
    setPlaceData({ ...place });
    setIsOpenModal(false);
  };

  return (
    <ModalOverlay>
      <Modal>
        <ModalTitle>여행 지역</ModalTitle>
        <ModalInputWrapper onSubmit={onSubmitSearch}>
          <ModalInput
            placeholder="도시를 검색해주세요"
            name="search"
          ></ModalInput>
          <ModalInputBtn>
            <img src="/icon/search.png" alt="search"/>
          </ModalInputBtn>
        </ModalInputWrapper>
        <ModalHashtagError>{errPlace}</ModalHashtagError>
        <ModalResult>
          {place?.nationName
            ? `${place.nationName}, ${place.regionName}`
            : "나라, 도시"}
        </ModalResult>
        <ModalBtnWrapper>
          <ModalCancelBtn onClick={() => setIsOpenModal(false)}>
            취소
          </ModalCancelBtn>
          <ModalSubmitBtn onClick={handleSubmitModal}>확인</ModalSubmitBtn>
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

const ModalResult = styled.div`
  width: 460px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.main1};
  border-radius: 10px;
  margin-bottom: 4px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: #666;
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
