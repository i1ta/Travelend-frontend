import { MyHashtag, TripylerStep1Props } from "@/interfaces/write";
import { useState } from "react";
import styled from "styled-components";
import CalendarTool from "@/components/commons/Tools/Calendar";
import PlaceModal from "./PlaceModal";
import StyleModal from "../commons/Modal/StyleModal";
import IDModal from "./IDModal";

export default function TripylerStep1({
  isEdit,
  data,
  placeData,
  tripDate,
  hashtagList,
  setData,
  setPlaceData,
  setTripDate,
  setHashtagList,
}: TripylerStep1Props) {
  const [isOpenPlaceModal, setIsOpenPlaceModal] = useState(false);
  const [isOpenStyleModal, setIsOpenStyleModal] = useState(false);
  const [isOpneWithTripyler, setIsOpenWithTripyler] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const [commaPrice, setCommaPrice] = useState("");

  const onChangeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/,/g, "");
    if (isNaN(parseInt(value))) {
      setCommaPrice("");
      return;
    }
    setCommaPrice(parseInt(value).toLocaleString());
    setData((prev) => ({ ...prev, estimatedPrice: parseInt(value) }));
  };

  const onClickUpDownBtn = (isUp: boolean) => {
    if (isUp) {
      setData((prev) => ({
        ...prev,
        totalPeopleNum: prev.totalPeopleNum + 1,
      }));
    } else if (data.totalPeopleNum > 1) {
      setData((prev) => ({
        ...prev,
        totalPeopleNum: prev.totalPeopleNum - 1,
      }));
    }
  };

  return (
    <StepContainer>
      <ItemContainer>
        <InputTitle>여행지역</InputTitle>
        <GrayInput>
          {placeData?.nationName
            ? `${placeData?.nationName}, ${placeData?.regionName}`
            : ""}
        </GrayInput>
        <InputBtn onClick={() => setIsOpenPlaceModal(true)}>지역 선택</InputBtn>
      </ItemContainer>

      <ItemContainer style={{ position: "relative" }}>
        <InputTitle>여행일정</InputTitle>
        <DateInput>
          <div onClick={() => setIsOpenCalendar((prev) => !prev)}>
            {tripDate.length === 0 ? "출발" : tripDate[0]}
          </div>
          <div />
          <div onClick={() => setIsOpenCalendar((prev) => !prev)}>
            {tripDate.length === 0 ? "도착" : tripDate[1]}
          </div>
        </DateInput>
        {isOpenCalendar && (
          <CalendarWrapper>
            <CalendarTool
              setIsOpenCalendar={setIsOpenCalendar}
              setTripDate={setTripDate}
              restrict={true}
            />
          </CalendarWrapper>
        )}
        <InputBtn onClick={() => setIsOpenCalendar((prev) => !prev)}>
          일정선택
        </InputBtn>
      </ItemContainer>

      <ItemContainer>
        <InputTitle>동행자 인원수</InputTitle>
        <WhiteInput>
          <button onClick={() => onClickUpDownBtn(false)}>-</button>
          <div>{data?.totalPeopleNum}명</div>
          <button onClick={() => onClickUpDownBtn(true)}>+</button>
        </WhiteInput>
        <EmptyBtn />
      </ItemContainer>

      <ItemContainer>
        <InputTitle>
          찾는 여행 성향 <br />
          <span>(5개 필수선택)</span>
        </InputTitle>

        <GrayInput style={{ gap: "16px" }}>
          {hashtagList.map((e) => (
            <Hashtag key={e.id}>#{e.name}</Hashtag>
          ))}
        </GrayInput>
        <InputBtn
          onClick={() => {
            setIsOpenStyleModal(true);
          }}
        >
          스타일 선택
        </InputBtn>
      </ItemContainer>

      <ItemContainer>
        <InputTitle>예상 여행 경비</InputTitle>
        <WhiteInput>
          <div>약</div>
          <input value={commaPrice.toLocaleString()} onChange={onChangeMoney} />
          <div>원</div>
        </WhiteInput>
        <EmptyBtn />
      </ItemContainer>

      <ItemContainer>
        <InputTitle>함께하는 Travelend</InputTitle>
        <GrayInput style={{ gap: "16px" }}>
          {data.tripylerWithList?.map((e) => (
            <TripylerID key={e.id}>@{e.nickname}</TripylerID>
          ))}
        </GrayInput>
        <InputBtn
          onClick={() => {
            setIsOpenWithTripyler(true);
          }}
        >
          아이디 검색
        </InputBtn>
      </ItemContainer>

      {/* 모달창 */}
      {isOpenPlaceModal && (
        <PlaceModal
          setPlaceData={setPlaceData}
          setIsOpenModal={setIsOpenPlaceModal}
        />
      )}
      {isOpenStyleModal && (
        <StyleModal
          data={hashtagList}
          setData={setHashtagList}
          setIsOpenModal={setIsOpenStyleModal}
          limitLen="5"
          placeholder="5개 필수"
        />
      )}
      {isOpneWithTripyler && (
        <IDModal
          data={data}
          setData={setData}
          setIsOpenModal={setIsOpenWithTripyler}
        />
      )}
    </StepContainer>
  );
}

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ItemContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputTitle = styled.div`
  width: 23%;
  color: #333;
  font-size: 16px;
  font-weight: 700;

  span {
    color: #666;
    font-size: 12px;
    font-weight: 400;
  }
`;

const InputBtn = styled.button`
  width: 18%;
  height: 100%;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.main1};
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const EmptyBtn = styled(InputBtn)`
  visibility: hidden;
`;

const GrayInput = styled.div`
  width: 55%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: 16px;
`;

const DateInput = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    &:first-child,
    &:last-child {
      width: 45%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: rgba(217, 217, 217, 0.2);
      border: 1px solid rgba(153, 153, 153, 0.5);
      border-radius: 5px;

      color: #000;
      font-size: 16px;
    }

    &:nth-child(2) {
      height: 2px;
      width: 3%;
      background-color: #666666;
    }
  }
`;

const WhiteInput = styled(GrayInput)`
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0px 15px;

  div {
    color: #000;
    font-size: 16px;
  }

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    text-align: center;
    color: #666;
    font-size: 30px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${(props) => props.theme.colors.main1};
    }
  }

  input {
    flex: 1;
    padding: 4px 12px;
    color: #000;
    font-size: 16px;
    text-align: right;
  }
`;

const Hashtag = styled.div`
  width: 95px;
  height: 34px;
  border-radius: 18px;
  background: ${(props) => props.theme.colors.main2};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const TripylerID = styled.div`
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

const CalendarWrapper = styled.div`
  width: 350px;
  height: 300px;
  top: 50px;
  left: 31%;
  position: absolute;
  background-color: aliceblue;
`;
