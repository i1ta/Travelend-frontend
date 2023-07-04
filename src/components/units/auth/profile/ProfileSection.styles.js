import styled from '@emotion/styled';

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

export const Link = styled.a`
    color: ${(props) => (props.selected ? '#ffffff' : '#666666')};
`;

export const Logout = styled.div`
    margin: 30px 0;
    font-size: 20px;
    color: #999999;
    cursor: pointer;
`;