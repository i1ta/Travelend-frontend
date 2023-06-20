import styled from '@emotion/styled';

export const Container = styled.div`
    margin-top: 0.5vh;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #F7F7F7;
`;

// 사이드 바

export const Section = styled.section`
    float: left;
    height: 100%;
    width: 335px;
    min-width: 355px;
    background-color: white;
    text-align: center;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Image = styled.div`
    padding: 100px 100px;
    margin: 30px 30px;
    border: 2px solid #C8B6FF;
    border-radius: 15px;
`;

export const Name = styled.div`
    margin: 30px 0;
    color: #666666;
    font-size: 24px;
    font-weight: 700;
`;

export const Point = styled.div`
margin: 40px 0;
color: #666666;
font-size: 18px;
font-weight: 700;
`;

export const CategoryWrapper = styled.div`
    padding: 20px;
    margin: 0 30px;
    border-top: 1px solid #C8B6FF;
`;

export const Category = styled.div`
    padding: 20px;
    margin: 20px 0;
    font-size: 20px;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;

    background-color: ${(props) => (props.selected ? '#C8B6FF' : '#ffffff')};
    color: ${(props) => (props.selected ? '#ffffff' : '#666666')};
`;

export const Logout = styled.div`
    margin: 30px 0;
    font-size: 20px;
    color: #999999;
    cursor: pointer;
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

export const Tc = styled(Td)`
    text-align: center;
    color: #C8B6FF;
    border: none;
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