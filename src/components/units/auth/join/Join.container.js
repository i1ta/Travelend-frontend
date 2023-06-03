import { useState } from "react";
import * as S from "./Join.styles";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Join() {
  // 라이브러리 변수
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // 체크박스 state
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  // 기타 state
  const apiPath = "https://api.tripyle.xyz";
  const [isSendCheckNum, setIsSendCheckNum] = useState(false);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  // 에러 메세지 state
  const [errorID, setErrorID] = useState(" ");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordCheck, setErrorPasswordCheck] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  // const handleInputFocus = (event) => {
  //   event.target.placeholder = "";
  // };

  // const handleInputBlur = (event) => {
  //   event.target.placeholder = "ID";
  // };

  // 중복확인 버튼
  const onClickIDCheckBtn = () => {
    alert("중복확인 api 만들어줭");
  };

  // 인증번호 발송 버튼
  const onClcickAuthNumBtn = () => {
    if (phone?.length !== 11 || !/^[0-9]+$/.test(phone)) {
      setErrorPhone("휴대폰 번호를 확인해주세요");
      return;
    } else {
      // 문자 전송 api
      axios
        .post(apiPath + "/user/authentication-code/send", {
          phone,
        })
        .then((response) => {
          console.log(response);
          setErrorPhone("");
          setIsSendCheckNum(true);
          alert("인증번호가 전송되었습니다.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 인증확인 버튼
  const onClickAuthNumCheckBtn = () => {
    alert("확인되었습니다.");
  };

  // 회원가입 등록 버튼
  const onClickEnrollBtn = async (data) => {
    const {
      name,
      password,
      passwordCheck,
      phone,
      username,
      email,
      year,
      month,
      day,
    } = data;
    const birthDate = `${year}-${month}-${day}`;

    // 입력값 검증
    if (!password) {
      setErrorPassword("영문과 숫자를 포함하여 6자 이상 16자 이하로 생성");
      return;
    } else setErrorPassword("");

    if (password !== passwordCheck) {
      setErrorPasswordCheck("비밀번호를 확인해주세요");
      return;
    } else setErrorPasswordCheck("");

    if (phone?.length !== 11 || !/^[0-9]+$/.test(phone)) {
      setErrorPhone("휴대폰 번호를 확인해주세요");
      return;
    } else setErrorPhone("");

    if (!email.includes("@") || !email.includes(".com")) {
      setErrorEmail("이메일을 확인해주세요");
      return;
    } else setErrorEmail("");

    // signup api 요청
    await axios
      .post(apiPath + "/user/signup", {
        // birthDate,
        // email,
        gender,
        name,
        password,
        phone,
        username,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
        console.log(birthDate, gender, name, password, phone, username);
      });
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  // 성별 선택된 값 변수 저장
  const onChangeGender = (event) => {
    setGender(event.target.value);
  };

  // 체크박스 설정
  const onChangeCheckbox1 = (event) => {
    const { checked } = event.target;
    setIsChecked1(checked);
    if (!checked) setIsCheckedAll(false);
    if (checked && isChecked2) setIsCheckedAll(true);
  };

  const onChangeCheckbox2 = (event) => {
    const { checked } = event.target;
    setIsChecked2(checked);
    if (!checked) setIsCheckedAll(false);
    if (checked && isChecked1) setIsCheckedAll(true);
  };

  const onChangeCheckboxAll = (event) => {
    const { checked } = event.target;
    setIsCheckedAll(checked);
    if (checked) {
      setIsChecked1(true);
      setIsChecked2(true);
    } else {
      setIsChecked1(false);
      setIsChecked2(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClickEnrollBtn)}>
        <S.Page>
          <S.Title>회원가입</S.Title>
          <S.TitleLine></S.TitleLine>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>아이디</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.Input placeholder={"ID"} {...register("username")}></S.Input>
            <S.CheckBtn type="button" onClick={onClickIDCheckBtn}>
              중복확인
            </S.CheckBtn>
          </S.InputWrapper>
          <S.Error>{errorID}</S.Error>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>비밀번호</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.Input
              type="password"
              placeholder={"Password"}
              {...register("password")}
            ></S.Input>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error>{errorPassword}</S.Error>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>비밀번호 확인</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.Input
              type="password"
              placeholder={"Password"}
              {...register("passwordCheck")}
            ></S.Input>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error>{errorPasswordCheck}</S.Error>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>이름</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.Input placeholder={"Username"} {...register("name")}></S.Input>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error></S.Error>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>휴대폰</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.Input
              placeholder={"Phone"}
              {...register("phone")}
              onChange={onChangePhone}
            ></S.Input>
            <S.CheckBtn
              type="button"
              onClick={onClcickAuthNumBtn}
              style={{
                borderColor: isSendCheckNum ? "#D6D5D5" : "",
                color: isSendCheckNum ? "#D6D5D5" : "",
                cursor: isSendCheckNum ? "default" : "",
              }}
              disabled={isSendCheckNum}
            >
              인증받기
            </S.CheckBtn>
          </S.InputWrapper>
          <S.Error>{errorPhone}</S.Error>

          {isSendCheckNum && (
            <>
              <S.InputWrapper>
                <S.BlankLabel></S.BlankLabel>
                <S.Input></S.Input>
                <S.CheckBtn type="button" onClick={onClickAuthNumCheckBtn}>
                  확인
                </S.CheckBtn>
              </S.InputWrapper>
              <S.Error></S.Error>
            </>
          )}

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>이메일</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.Input placeholder={"Email"} {...register("email")}></S.Input>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error>{errorEmail}</S.Error>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>성별</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.GenderWrapper>
              <S.RadioBtn
                type="radio"
                name="gender"
                value={"M"}
                onChange={onChangeGender}
              ></S.RadioBtn>
              <S.SpanLabel style={{ marginRight: "137px" }}>남자</S.SpanLabel>
              <S.RadioBtn
                type="radio"
                name="gender"
                value={"W"}
                onChange={onChangeGender}
              ></S.RadioBtn>
              <S.SpanLabel>여자</S.SpanLabel>
            </S.GenderWrapper>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error></S.Error>

          <S.InputWrapper>
            <S.Label>
              <S.LabelTxt>생년월일</S.LabelTxt>
              <S.LabelStar>*</S.LabelStar>
            </S.Label>
            <S.BirthDateWrapper>
              <S.BirthDateInput
                placeholder={"YYYY"}
                maxLength={4}
                inputmode="numeric"
                pattern="[0-9]*"
                {...register("year")}
              ></S.BirthDateInput>
              <S.BirthDateSlash>/</S.BirthDateSlash>
              <S.BirthDateInput
                placeholder={"MM"}
                maxLength={2}
                inputmode="numeric"
                {...register("month")}
              ></S.BirthDateInput>
              <S.BirthDateSlash>/</S.BirthDateSlash>
              <S.BirthDateInput
                placeholder={"DD"}
                maxLength={2}
                inputmode="numeric"
                {...register("day")}
              ></S.BirthDateInput>
            </S.BirthDateWrapper>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>

          <S.AcceptTitleWrapper>
            <S.Line></S.Line>
            <S.AcceptTitle>이용약관 동의</S.AcceptTitle>
            <S.Line></S.Line>
          </S.AcceptTitleWrapper>

          <S.AcceptLabel>
            <S.Label style={{ width: "250px" }}>
              아래 내용에 모두 동의합니다
            </S.Label>
            <S.CheckBox
              type="checkbox"
              checked={isCheckedAll}
              onChange={onChangeCheckboxAll}
            ></S.CheckBox>
          </S.AcceptLabel>

          <S.AcceptWrapper>
            <S.AcceptLabel>
              <S.Label style={{ width: "200px" }}>
                개인정보 이용약관 동의
              </S.Label>
              <S.CheckBox
                type="checkbox"
                checked={isChecked1}
                onChange={onChangeCheckbox1}
              ></S.CheckBox>
            </S.AcceptLabel>
            <S.AcceptContents>블라블라</S.AcceptContents>
            <S.AcceptLabel>
              <S.Label>마케팅 정보 수신 동의</S.Label>
              <S.CheckBox
                type="checkbox"
                checked={isChecked2}
                onChange={onChangeCheckbox2}
              ></S.CheckBox>
            </S.AcceptLabel>
            <S.AcceptContents>블라블라</S.AcceptContents>
          </S.AcceptWrapper>
          <S.EnrollBtn onClick={onClickEnrollBtn}>회원가입</S.EnrollBtn>
        </S.Page>
      </form>
    </>
  );
}
