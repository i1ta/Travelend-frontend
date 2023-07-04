import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
`;

// 사이드 바

export const SideBar = styled.section`
  width: 335px;
  height: 100%;
  min-height: 1200px;
  background-color: white;
  box-shadow: 2px 0px 8px #999999;
  z-index: 50;
  padding: 40px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileImage = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background-color: #e6e6e6;

  display: flex;           
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const defaultProfile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const profileFileBtn = styled.label`
background-color: #c8b6ff;
width: 200px;
height: 50px;
margin-top: 10px;
font-size: 20px;
line-height: 50px;
text-align: center;
cursor: pointer;
`

export const profileBtn = styled.button`
background-color: #c8b6ff;
width: 200px;
height: 50px;
margin-top: 10px;
font-size: 20px;
`

export const Name = styled.div`
  margin: 30px 0;
  color: #666666;
  font-size: 24px;
  font-weight: 700;
`;

export const Point = styled.div`
  margin-bottom: 40px;
  color: #666666;
  font-size: 18px;
  font-weight: 700;
`;

export const CategoryWrapper = styled.div`
  border-top: 1px solid #c8b6ff;
  flex: 1;
  padding: 40px 0px;

  display: flex;
  flex-direction: column;
`;

export const Category = styled.button`
  width: 280px;
  height: 70px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 64px;

  background-color: ${(props) =>
    props.selectedCategory == props.id ? "#C8B6FF" : "#ffffff"};
  color: ${(props) =>
    props.selectedCategory == props.id ? "#ffffff" : "#666666"};
`;

export const LogoutWrapper = styled.button`
  display: flex;
  align-items: center;
`;

export const LogoutImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

export const LogoutTxt = styled.div`
  font-size: 20px;
  color: #999999;
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
