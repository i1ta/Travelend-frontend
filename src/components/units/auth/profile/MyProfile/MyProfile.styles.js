import styled from "@emotion/styled";

export const MyProfileWrapper = styled.div`
  width: 1105px;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
`;

export const Title = styled.h1`
  width: 1000px;
  font-size: 36px;
  color: #c8b6ff;
  margin-bottom: 65px;
`;

// 테이블

export const TableWrapper = styled.div`
  display: inline-block;
  border-radius: 50px;
`;

export const Table = styled.table`
  width: 1000px;
  height: 520px;
  background-color: white;
  margin-bottom: 50px;

  border-collapse: collapse;
  border-radius: 15px;
  border-style: hidden;
  box-shadow: 0 0 0 2px #c8b6ff;
`;

export const Td = styled.td`
  height: 30px;
  width: 250px;
  border: none;
  font-size: 20px;
  color: #666666;
`;

export const Tc = styled(Td)`
  text-align: center;
  color: #c8b6ff;
  border: none;
`;

export const BtnWrapper = styled.div`
  align-items: center;
  text-align: center;
`;

export const Btn = styled.button`
  width: 200px;
  height: 63px;
  border-radius: 50px;
  background-color: #c8b6ff;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;
