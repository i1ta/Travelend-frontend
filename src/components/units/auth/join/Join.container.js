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
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  // 기타 state
  const apiPath = "https://api.tripyle.xyz";
  const [isSendCheckNum, setIsSendCheckNum] = useState(false);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [inputCheckNum, setInputCheckNum] = useState("");
  const [authCheckNum, setAuthCheckNum] = useState("");

  // 에러 메세지 state
  const [errorID, setErrorID] = useState(" ");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordCheck, setErrorPasswordCheck] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPhoneCheck, setErrorPhoneCheck] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [errorbirthDate, setErrorBirthDate] = useState("");
  const [errorCheckBox, setErrorCheckBox] = useState("");

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
          console.log(response.data);
          setAuthCheckNum(response.data.data);
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
    if (inputCheckNum !== String(authCheckNum)) {
      setErrorPhoneCheck("인증번호가 잘못되었습니다.");
    } else {
      alert("인증번호가 확인되었습니다.");
      setErrorPhoneCheck("");
    }
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
    if (!username) {
      setErrorID("6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합해서 생성");
      return;
    } else setErrorID("");
    if (!password) {
      setErrorPassword("영문과 숫자를 포함하여 6자 이상 16자 이하로 생성");
      return;
    } else setErrorPassword("");

    if (password !== passwordCheck) {
      setErrorPasswordCheck("비밀번호를 확인해주세요");
      return;
    } else setErrorPasswordCheck("");

    if (!name) {
      setErrorName("이름을 입력해주세요");
      return;
    } else setErrorName("");

    if (phone?.length !== 11 || !/^[0-9]+$/.test(phone)) {
      setErrorPhone("휴대폰 번호를 확인해주세요");
      return;
    } else setErrorPhone("");

    if (!email.includes("@") || !email.includes(".com")) {
      setErrorEmail("이메일을 입력해주세요");
      return;
    } else setErrorEmail("");

    if (!gender) {
      setErrorGender("성별을 체크해주세요");
      return;
    } else setErrorGender("");

    if (!year || !month || !day) {
      setErrorBirthDate("생년월일을 입력해주세요");
      return;
    } else setErrorBirthDate("");

    if (!isChecked1 || !isChecked2 || !isChecked3) {
      setErrorCheckBox("필수항목을 체크해주세요");
      return;
    } else setErrorCheckBox("");

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
        router.push("/auth/signIn");
      })
      .catch((error) => {
        console.error(error);
        // console.log(birthDate, gender, name, password, phone, username);
      });
  };

  // 휴대폰 번호 변수 저장
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  // 휴대폰 인증번호 변수 저장
  const onChangePhoneCheckNum = (event) => {
    setInputCheckNum(event.target.value);
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
    if (checked && isChecked2 && isChecked3 && isChecked4 && isChecked5)
      setIsCheckedAll(true);
  };

  const onChangeCheckbox2 = (event) => {
    const { checked } = event.target;
    setIsChecked2(checked);
    if (!checked) setIsCheckedAll(false);
    if (checked && isChecked1 && isChecked3 && isChecked4 && isChecked5)
      setIsCheckedAll(true);
  };

  const onChangeCheckbox3 = (event) => {
    const { checked } = event.target;
    setIsChecked3(checked);
    if (!checked) setIsCheckedAll(false);
    if (checked && isChecked1 && isChecked2 && isChecked4 && isChecked5)
      setIsCheckedAll(true);
  };

  const onChangeCheckbox4 = (event) => {
    const { checked } = event.target;
    setIsChecked4(checked);
    if (!checked) setIsCheckedAll(false);
    if (checked && isChecked1 && isChecked2 && isChecked3 && isChecked5)
      setIsCheckedAll(true);
  };

  const onChangeCheckbox5 = (event) => {
    const { checked } = event.target;
    setIsChecked5(checked);
    if (!checked) setIsCheckedAll(false);
    if (checked && isChecked1 && isChecked2 && isChecked3 && isChecked4)
      setIsCheckedAll(true);
  };

  const onChangeCheckboxAll = (event) => {
    const { checked } = event.target;
    setIsCheckedAll(checked);
    if (checked) {
      setIsChecked1(true);
      setIsChecked2(true);
      setIsChecked3(true);
      setIsChecked4(true);
      setIsChecked5(true);
    } else {
      setIsChecked1(false);
      setIsChecked2(false);
      setIsChecked3(false);
      setIsChecked4(false);
      setIsChecked5(false);
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
            <S.Input placeholder={"Name"} {...register("name")}></S.Input>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error>{errorName}</S.Error>

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
                <S.Input onChange={onChangePhoneCheckNum}></S.Input>
                <S.CheckBtn type="button" onClick={onClickAuthNumCheckBtn}>
                  확인
                </S.CheckBtn>
              </S.InputWrapper>
              <S.Error>{errorPhoneCheck}</S.Error>
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
                value={"m"}
                onChange={onChangeGender}
              ></S.RadioBtn>
              <S.SpanLabel style={{ marginRight: "137px" }}>남자</S.SpanLabel>
              <S.RadioBtn
                type="radio"
                name="gender"
                value={"w"}
                onChange={onChangeGender}
              ></S.RadioBtn>
              <S.SpanLabel>여자</S.SpanLabel>
            </S.GenderWrapper>
            <S.BlankBtn></S.BlankBtn>
          </S.InputWrapper>
          <S.Error>{errorGender}</S.Error>

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
          <S.Error>{errorbirthDate}</S.Error>

          <S.AcceptTitleWrapper>
            <S.Line></S.Line>
            <S.AcceptTitle>이용약관 동의</S.AcceptTitle>
            <S.Line></S.Line>
          </S.AcceptTitleWrapper>

          <S.Error>{errorCheckBox}</S.Error>
          <S.AcceptWrapper>
            <S.CheckBox
              type="checkbox"
              checked={isCheckedAll}
              onChange={onChangeCheckboxAll}
            ></S.CheckBox>
            <S.AcceptLabel style={{ fontWeight: "800", fontSize: "20px" }}>
              전체 동의
            </S.AcceptLabel>
          </S.AcceptWrapper>
          <S.AcceptWrapper>
            <S.CheckBox
              type="checkbox"
              checked={isChecked1}
              onChange={onChangeCheckbox1}
            ></S.CheckBox>
            <S.AcceptLabel>트리플리 이용약관 동의 (필수)</S.AcceptLabel>
          </S.AcceptWrapper>
          <S.AcceptWrapper>
            <S.CheckBox
              type="checkbox"
              checked={isChecked2}
              onChange={onChangeCheckbox2}
            ></S.CheckBox>
            <S.AcceptLabel>전자 금융거래 이용약관 동의 (필수)</S.AcceptLabel>
          </S.AcceptWrapper>
          <S.AcceptWrapper>
            <S.CheckBox
              type="checkbox"
              checked={isChecked3}
              onChange={onChangeCheckbox3}
            ></S.CheckBox>
            <S.AcceptLabel>개인정보 수집이용 동의 (필수)</S.AcceptLabel>
          </S.AcceptWrapper>
          <S.AcceptWrapper>
            <S.CheckBox
              type="checkbox"
              checked={isChecked4}
              onChange={onChangeCheckbox4}
            ></S.CheckBox>
            <S.AcceptLabel>개인정보 제3자 제공 동의 (선택)</S.AcceptLabel>
          </S.AcceptWrapper>
          <S.AcceptWrapper>
            <S.CheckBox
              type="checkbox"
              checked={isChecked5}
              onChange={onChangeCheckbox5}
            ></S.CheckBox>
            <S.AcceptLabel>마케팅 정보메일, SMS 수신 동의 (선택)</S.AcceptLabel>
          </S.AcceptWrapper>

          <S.EnrollBtn onClick={onClickEnrollBtn}>회원가입</S.EnrollBtn>
        </S.Page>
      </form>
    </>
  );
}
