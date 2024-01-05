import styled from "styled-components";
import React, { useState } from "react";
import ApplyInfo from "../../../../src/components/tripyler/apply/ApplyInfo";
import ApplyForm from "../../../../src/components/tripyler/apply/ApplyForm";
import ApplyBtn from "../../../../src/components/tripyler/apply/ApplyBtn";

export default function FindTripylerApplyPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState("");

  return (
    <Container>
      <PageTitle>함께 동행할 Trip’yler 신청</PageTitle>
      <ApplyInfo />
      <ApplyForm
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        setContent={setContent}
      />
      <ApplyBtn isChecked={isChecked} content={content} />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1000px;
  width: 95%;
  margin: auto;
  margin-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.div`
  width: 100%;
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px solid #fff;
  background: ${(props) => props.theme.colors.main2};
  margin-bottom: 40px;

  color: #fff;
  font-size: 24px;
  font-weight: 600;
`;
