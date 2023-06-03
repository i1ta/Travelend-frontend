import { useState } from "react";
import * as S from "./Join.styles";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const [errorEmail, setErrorEmail] = useState("");

    const [gender, setGender] = useState("");

    const onSubmitForm  = async (data) => {
      console.log("회원가입 버튼 눌렀음");
  
      // if (!email.includes("@") || !email.includes(".com")) {
      //   setErrorEmail("이메일을 확인해주세요");
      //   return;
      // } else setErrorEmail("");
  
      // signup api 요청
      try {
        console.log(data);
        const {
          name,
          email,
          year, 
          month,
          day
        } = data;
        const birthDate = `${year}-${month}-${day}`;
      const requestData = {
        "birthDate": birthDate,
        "email": email,
        "gender": gender,
        "name": name
      }
      
      axios.defaults.headers.common["x-auth-token"] = window.localStorage.getItem("login-token");
      const response = await axios
        .post("https://api.tripyle.xyz/user/signup/kakao", 
        requestData,
        {"content-type": "application/json"})
        console.log(response)
        if(response.status === 200){
          router.push('/main');
        }
    }
      catch (error) {
        console.log(error);
        alert("이미 존재하는 회원입니다.");
      }
    };

  
    // 성별 선택된 값 변수 저장
    const onChangeGender = (event) => {
      setGender(event.target.value);
    };

    return(
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <S.Page>
          <S.Title>카카오 회원가입</S.Title>
          <S.TitleLine kakao></S.TitleLine>

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
          <S.Error></S.Error>

          <S.EnrollBtn>회원가입</S.EnrollBtn>
        </S.Page>
        </form>
        </>
    );
}
