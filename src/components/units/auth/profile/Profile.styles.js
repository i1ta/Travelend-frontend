import styled from "@emotion/styled";

export const Container = styled.div`
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
`;

// 사이드 바

export const SideBar = styled.section`
  height: 100%;
  width: 335px;
  background-color: white;
  box-shadow: 2px 0px 8px #999999;
  z-index: 50;
  padding: 40px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.div`
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c8b6ff;
  border-radius: 15px;

  font-size: 20px;
`;

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
