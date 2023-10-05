import styled from "styled-components";

export const Container = styled.div`
  width: 1200px;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const ContentTable = styled.table`
  width: 100%;
  margin-bottom: 100px;

  color: var(--text-text-02, #555);
  text-align: center;
  font-family: Noto Sans CJK KR;
  font-size: 1rem;
`;

export const ContentHeader = styled.th`
  padding: 0.8rem 0;

  border-bottom: 2px solid var(--gray-gray-70, #dfdfdf);
  background: var(--ui-surface-01, #f6f6f6);
  font-weight: 700;
`;

export const TableCell = styled.td`
  padding: 1.2rem 0;
  color: var(--text-text-01, #242424);
  border-bottom: 2px solid var(--gray-gray-70, #dfdfdf);
`;
