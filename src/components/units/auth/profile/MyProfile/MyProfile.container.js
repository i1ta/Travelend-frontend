import * as S from './MyProfile.styles'

export default function MyProfile() {
  return (
    <>
      <S.MyProfileWrapper>
        <S.Title>My Profile</S.Title>
        <S.TableWrapper>
          <S.Table>
            <tr>
              <S.Tc>이름</S.Tc>
              <S.Td>홍길동</S.Td>
              <S.Tc>거주지</S.Tc>
              <S.Td>서울</S.Td>
            </tr>
            <tr>
              <S.Tc>나이</S.Tc>
              <S.Td>30세</S.Td>
              <S.Tc>선호 인원수</S.Tc>
              <S.Td>2명</S.Td>
            </tr>
            <tr>
              <S.Tc>이메일</S.Tc>
              <S.Td>honggildong@example.com</S.Td>
              <S.Tc>MBTI</S.Tc>
              <S.Td>ENFJ</S.Td>
            </tr>
            <tr>
              <S.Tc>연락처</S.Tc>
              <S.Td>010-1234-5678</S.Td>
              <S.Tc>여행 스타일</S.Tc>
              <S.Td>관광지</S.Td>
            </tr>
          </S.Table>
        </S.TableWrapper>

        <S.BtnWrapper>
          <S.Btn>프로필 수정</S.Btn>
        </S.BtnWrapper>
      </S.MyProfileWrapper>
    </>
  );
}
