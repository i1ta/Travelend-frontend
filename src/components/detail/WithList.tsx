import styled from "styled-components";
import { FiBriefcase } from "react-icons/fi";
import { useState } from "react";
import { WithListProps } from "@/interfaces/detail";

export default function WithList({ withList }: WithListProps) {
  const [isOpenWithTripList, setIsOpenWithTripList] = useState(false);

  const onClickWithTrip = () => {
    setIsOpenWithTripList((prev) => !prev);
  };

  return (
    <WithTripylerWrapper>
      <WithTripTitleWrapper>
        <FiBriefcase style={{ color: "#333", fontSize: "24px" }} />
        <WithTripTitle>
          함께 하는 <b>Travelend</b>
        </WithTripTitle>
      </WithTripTitleWrapper>
      <WithTripProfileList>
        {withList
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
        {withList?.length > 4 && (
          <WithTripMoreBox onClick={onClickWithTrip}>
            +{withList?.length - 4}
          </WithTripMoreBox>
        )}
      </WithTripProfileList>

      {isOpenWithTripList && (
        <WithTripList>
          <WithTripListTitle>Travelend 리스트</WithTripListTitle>
          <WithTripListWrapper>
            {withList?.map((el) => (
              <WithTripListItem>
                <WithTripListProfile>
                  <UserImg src={el.profileUrl || "/icon/defaultProfile.png"} />
                </WithTripListProfile>
                <WithTripListID>{el.nickname}</WithTripListID>
              </WithTripListItem>
            ))}
          </WithTripListWrapper>
        </WithTripList>
      )}
    </WithTripylerWrapper>
  );
}

export const UserImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const WithTripylerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const WithTripTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WithTripTitle = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: 500;
`;

const WithTripProfileList = styled.div`
  position: relative;
  height: 50px;
`;

const WithTripProfileWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
`;

const WithTripProfile = styled(UserImg)`
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
