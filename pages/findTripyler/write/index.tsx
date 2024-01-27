import React, { useState } from "react";
import styled from "styled-components";
import Banner from "../../../src/components/write/Banner";
import TripylerStep1 from "../../../src/components/write/TripylerStep1";
import TripylerStep2 from "../../../src/components/write/TripylerStep2";
import TripylerStep3 from "../../../src/components/write/TripylerStep3";
import Buttons from "../../../src/components/write/Buttons";

import {
  MyHashtag,
  Place,
  Step1Data,
  Step2Data,
} from "../../../src/interfaces/write";
import { FaChevronDown } from "react-icons/fa6";

export default function FindTripylerWritePage() {
  const [step1Data, setStep1Data] = useState<Step1Data>({
    totalPeopleNum: 2,
  });
  const [step2Data, setStep2Data] = useState<Step2Data>();
  const [placeData, setPlaceData] = useState<Place>();
  const [image, setImage] = useState<File>();
  const [hashtagList, setHashtagList] = useState<MyHashtag[]>([]);
  const [tripDate, setTripDate] = useState<string[]>([]);

  const steps = [
    {
      title: "여행 정보 입력",
      content: (
        <TripylerStep1
          data={step1Data}
          placeData={placeData}
          tripDate={tripDate}
          hashtagList={hashtagList}
          setData={setStep1Data}
          setPlaceData={setPlaceData}
          setHashtagList={setHashtagList}
          setTripDate={setTripDate}
        />
      ),
    },
    {
      title: "내용 작성",
      content: <TripylerStep2 setData={setStep2Data} />,
    },
    {
      title: "이미지 선택",
      content: <TripylerStep3 setImage={setImage} />,
    },
  ];

  return (
    <>
      <Banner>
        <Form>
          {steps.map((el, idx) => {
            const [isOpen, setIsOpen] = useState(true);

            return (
              <StepContainer key={el.title}>
                <TitleWrapper>
                  <TitleTxtWrapper
                    onClick={() =>
                      console.log(
                        step1Data,
                        step2Data,
                        image,
                        tripDate,
                        placeData
                      )
                    }
                  >
                    <div>Step {`${idx + 1}/${steps.length}`}</div>
                    <div>{el.title}</div>
                  </TitleTxtWrapper>
                  <FaChevronDown
                    style={{
                      fontSize: "20px",
                      color: "#333",
                      cursor: "pointer",
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease-in-out",
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </TitleWrapper>
                <Line />
                {isOpen && el.content}
              </StepContainer>
            );
          })}
          <Buttons
            tripylerData={{
              ...step1Data,
              ...step2Data,
              tripylerWithList: [
                ...(step1Data.tripylerWithList?.map((el) => el.nickname) || []),
              ],
              startDate: tripDate[0],
              endDate: tripDate[1],
              continentId: placeData?.continentId,
              nationId: placeData?.nationId,
              regionId: placeData?.regionId,
              firstTripStyleId: hashtagList[0]?.id || 0,
              secondTripStyleId: hashtagList[1]?.id || 0,
              thirdTripStyleId: hashtagList[2]?.id || 0,
              fourthTripStyleId: hashtagList[3]?.id || 0,
              fifthTripStyleId: hashtagList[4]?.id || 0,
            }}
            image={image}
          />
        </Form>
      </Banner>
      <div style={{ height: "2000px" }} />
    </>
  );
}

const Form = styled.div`
  position: absolute;
  top: 320px;
  width: 95%;
  max-width: 1000px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding: 100px 80px;

  ${({ theme }) => theme.media.mobile} {
    padding: 60px 50px;
  }
`;

const StepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleTxtWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    &:first-child {
      color: #666;
      font-size: 14px;
    }

    &:last-child {
      color: #000;
      font-size: 22px;
      font-weight: 600;
    }
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(153, 153, 153, 0.5);
`;
