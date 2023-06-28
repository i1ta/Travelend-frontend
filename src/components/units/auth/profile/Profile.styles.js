import styled from '@emotion/styled';

export const Container = styled.div`
    margin-top: 0.5vh;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #F7F7F7;
`;


export const MainWrapper = styled.div`
    height: 100%;
    width: 1000px;
    align-items: center;
    justify-content: center;
    margin-left: 80px;
    margin-top: 120px;
`;

export const Title = styled.h1`
    font-size: 36px;
    color: #C8B6FF;
`

// 테이블

export const TableWrapper = styled.div`
    display: inline-block;
    border-radius: 50px;
`;

export const Table = styled.table`
    width: 1000px;
    height: 520px;

    background-color: white;
    margin-top: 100px;
    border-collapse: collapse;
    border-radius: 15px;
    border-style: hidden;
    box-shadow: 0 0 0 2px #C8B6FF;
`;

export const Td = styled.td`
    height: 30px;
    width: 250px;
    border: none;
    font-size: 20px;
    color: #666666;
`;

export const StyleTd = styled(Td)`
    background: #90E0EF;
    width: 77px;
    height: 30px;
    border-radius: 20px;
    color: white;
    margin: 100px 100px;
`

export const Tc = styled(Td)`
    text-align: center;
    color: #C8B6FF;
    border: none;
`;

export const StyleBox = styled.div`
    
`;

export const BtnWrapper = styled.div`
    align-items: center;
    text-align: center;
    margin: 20px 0;
`;

export const Btn = styled.button`
    border-radius: 50px;
    background-color: #C8B6FF;
    padding: 15px 50px;
    border: none;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
`;