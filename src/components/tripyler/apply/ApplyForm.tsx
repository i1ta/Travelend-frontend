import styled from "styled-components";
import { useState } from "react";
import { ApplyFormProps } from "@/interfaces/apply";

export default function ApplyForm({
  isChecked,
  setIsChecked,
  setContent,
}: ApplyFormProps) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  // 체크박스 설정
  const onChangeCheckbox1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsChecked1(checked);
    if (!checked) setIsChecked(false);
    if (checked && isChecked2) setIsChecked(true);
  };

  const onChangeCheckbox2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsChecked2(checked);
    if (!checked) setIsChecked(false);
    if (checked && isChecked1) setIsChecked(true);
  };

  const onChangeCheckboxAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsChecked(checked);
    if (checked) {
      setIsChecked1(true);
      setIsChecked2(true);
    } else {
      setIsChecked1(false);
      setIsChecked2(false);
    }
  };

  return (
    <Container>
      <ContentsItem>
        <FormTitle>Trip’yler 신청 관련 안내사항</FormTitle>
        <Radio>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onChangeCheckboxAll}
          ></input>
          <div>모두 동의</div>
        </Radio>
        <AcceptItem>
          <AcceptInfo>
            Trip'yle를 사용하여 여행 동반자를 신청하실 경우, 상대방에게 사용자의
            이름과 연령대, 성별이 필수적으로 공개됩니다. 이는 신뢰성과 투명성을
            제공하기 위한 조치로 이루어집니다. 사용자의 개인정보는 안전하게
            처리되며, 이는 서비스 운영과 상대방과의 원활한 의사소통을 위한
            목적으로 사용됩니다.
          </AcceptInfo>
          <Radio>
            <input
              type="checkbox"
              checked={isChecked1}
              onChange={onChangeCheckbox1}
            ></input>
            <div>확인했습니다.</div>
          </Radio>
        </AcceptItem>
        <AcceptItem>
          <AcceptInfo>
            Trip'yle는 모든 사용자들이 쾌적하고 안전한 환경에서 서비스를 이용할
            수 있도록 최선을 다하고 있습니다. 욕설, 비방, 성적인 메시지 등은
            다른 사용자에게 불쾌감을 주거나 서비스 이용 규정을 위반하는 행동으로
            간주될 수 있습니다. 이러한 행동은 Trip'yler 커뮤니티 가이드라인을
            위반하며, 적절한 조치가 취해질 수 있습니다. 모든 사용자들이 서로를
            존중하고 예의를 갖추며 소통할 수 있는 환경을 유지하기 위해,
            Trip’yle는 여행 동반자 간의 적절한 상호 작용을 촉구합니다
          </AcceptInfo>
          <Radio>
            <input
              type="checkbox"
              checked={isChecked2}
              onChange={onChangeCheckbox2}
            ></input>
            <div>확인했습니다.</div>
          </Radio>
        </AcceptItem>
      </ContentsItem>

      <ContentsItem>
        <FormTitle>Trip’yler 신청</FormTitle>
        <SubTitle>상대방에게 본인에 대해 간단히 소개해주세요.</SubTitle>
        <Input
          onChange={(event) => setContent(event.target.value)}
          placeholder="본인의 해당 지역 여행일정, 본인의 여행 스타일, 원하는 여행 코스 등"
        ></Input>
      </ContentsItem>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 40px;
`;

export const ContentsItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormTitle = styled.div`
  color: ${(props) => props.theme.colors.main2};
  font-size: 24px;
  font-weight: 600;
`;

export const TitleLine = styled.div`
  width: 1200px;
  height: 1px;
  background: #d6d6d6;
  margin-bottom: 70px;
`;

export const Radio = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 16px;
    height: 16px;
    border-color: #a7a7a7;
  }

  div {
    color: #333;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const AcceptItem = styled.div`
  padding: 20px 30px;
  border-radius: 5px;
  background: rgba(217, 217, 217, 0.3);

  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
`;

export const AcceptInfo = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

export const SubTitle = styled.div`
  color: #666;
  font-size: 18px;
  font-weight: 600;
`;

export const Input = styled.textarea`
  min-height: 300px;
  padding: 20px 25px;
  border: none;
  border-radius: 5px;
  background: rgba(217, 217, 217, 0.3);
  resize: none;

  color: #333;
  font-size: 16px;
  font-weight: 500;
`;
