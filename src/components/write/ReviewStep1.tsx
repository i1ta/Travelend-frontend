import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import { ReviewStep1Props, TripListData } from "@/interfaces/write";
import Axios from "@/apis";

export default function ReviewStep1({ isEdit, setId }: ReviewStep1Props) {
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);
  const [isOpenWithTripList, setIsOpenWithTripList] = useState(false);
  const [tripList, setTripList] = useState<TripListData[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<TripListData>();

  const onClickCmbBox = () => {
    setIsOpenCmbBox((prev) => !prev);
  };

  const onClickCmbBoxItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = parseInt(e.currentTarget.id);
    setSelectedInfo(tripList[value]);
    setId(tripList[value].tripylerId);
    setIsOpenCmbBox(false);
    setIsOpenWithTripList(false);
  };

  const onClickWithTrip = () => {
    setIsOpenWithTripList((prev) => !prev);
  };

  const fetchList = async () => {
    await Axios.get(`/my-collections/my-all-tripylers`)
      .then((res) => {
        setTripList([...res.data.data]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    !isEdit && fetchList();
  }, []);

  return (
    <StepContainer>
      <ItemContainer style={{ position: "relative" }}>
        <InputTitle>여행기록 선택</InputTitle>
        <CmbBox
          style={{ cursor: isEdit ? "default" : "pointer" }}
          onClick={!isEdit ? onClickCmbBox : undefined}
        >
          <div>{selectedInfo?.title || "선택"}</div>
          {!isEdit && (
            <FaChevronDown
              style={{
                fontSize: "20px",
                color: "#333",
                cursor: "pointer",
                transform: isOpenCmbBox ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onClick={() => setIsOpenCmbBox(!isOpenCmbBox)}
            />
          )}
        </CmbBox>

        {isOpenCmbBox && (
          <CmbBoxList>
            {tripList.map((el, idx) => (
              <CmbBoxListItem
                key={el.tripylerId}
                onClick={onClickCmbBoxItem}
                id={idx.toString()}
              >
                {el.title}
              </CmbBoxListItem>
            ))}
          </CmbBoxList>
        )}
      </ItemContainer>

      <InfoBox>
        <InfoBoxItem>
          <InfoBoxTitle>여행지역</InfoBoxTitle>
          <InfoBoxInput>
            {selectedInfo?.nationName
              ? `${selectedInfo?.nationName}, ${selectedInfo?.regionName}`
              : "선택"}
          </InfoBoxInput>
        </InfoBoxItem>
        <InfoBoxItem>
          <InfoBoxTitle>여행기간</InfoBoxTitle>
          <InfoBoxInput>
            {selectedInfo?.startDate
              ? `${selectedInfo?.startDate} ~ ${selectedInfo?.endDate}`
              : "선택"}
          </InfoBoxInput>
        </InfoBoxItem>
        <InfoBoxItem style={{ marginLeft: "35x", position: "relative" }}>
          <InfoBoxTitle>동행 Tripyler</InfoBoxTitle>

          <WithTripProfileList>
            {selectedInfo?.tripylerWithList ? (
              <>
                {selectedInfo?.tripylerWithList
                  ?.filter((el, idx) => idx < 4)
                  .map((el, idx) => (
                    <WithTripProfileWrapper
                      key={el.nickname}
                      style={{ left: `${idx * 35}px` }}
                      onClick={onClickWithTrip}
                    >
                      <WithTripProfile
                        src={el.profileUrl || "/icon/defaultProfile.png"}
                      />
                    </WithTripProfileWrapper>
                  ))}
                {selectedInfo?.tripylerWithList.length > 4 && (
                  <WithTripMoreBox onClick={onClickWithTrip}>
                    +{selectedInfo?.tripylerWithList.length - 4}
                  </WithTripMoreBox>
                )}
              </>
            ) : (
              "선택"
            )}
          </WithTripProfileList>
          {isOpenWithTripList && (
            <WithTripList>
              <WithTripListTitle>Trip’yler 리스트</WithTripListTitle>
              <WithTripListWrapper>
                {selectedInfo?.tripylerWithList.map((el) => (
                  <WithTripListItem>
                    <WithTripListProfile>
                      <Image
                        src={el.profileUrl || "/icon/defaultProfile.png"}
                      />
                    </WithTripListProfile>
                    <WithTripListID>{el.nickname}</WithTripListID>
                  </WithTripListItem>
                ))}
              </WithTripListWrapper>
            </WithTripList>
          )}
        </InfoBoxItem>
      </InfoBox>
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
`;

const CmbBox = styled.div`
  width: 75%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  div {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }
`;

const CmbBoxList = styled.div`
  width: 75%;
  height: 202px;

  position: absolute;
  top: 50px;
  right: 0;
  z-index: 50;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  border-end-start-radius: 5px;
  border-end-end-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(167, 167, 167, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

const CmbBoxListItem = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  border-bottom: 1px solid rgba(153, 153, 153, 0.5);
  cursor: pointer;

  color: #666;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.main1};
    color: #fff;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  height: 180px;
  padding: 0 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: rgba(217, 217, 217, 0.2);
`;

const InfoBoxTitle = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const InfoBoxInput = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid rgba(153, 153, 153, 0.5);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const InfoBoxItem = styled.div`
  width: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WithTripProfileList = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 50px;
`;

const WithTripProfileWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  background-color: #fff;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const WithTripProfile = styled(Image)`
  cursor: pointer;
`;

const WithTripMoreBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #999;

  color: #666;
  font-size: 12px;
  cursor: pointer;
`;

const WithTripList = styled.div`
  width: 170px;
  height: 200px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 100px;
  left: 5px;
  box-shadow: 0px 5px 20px 3px rgba(153, 153, 153, 0.25);
  padding-top: 10px;
`;

const WithTripListTitle = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const WithTripListWrapper = styled.div`
  max-height: 150px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  gap: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 설정 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(167, 167, 167, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 4px;
  }
`;

const WithTripListItem = styled.div`
  display: flex;
  gap: 15px;
`;

const WithTripListProfile = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: aliceblue;
  overflow: hidden;
`;

const WithTripListID = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
