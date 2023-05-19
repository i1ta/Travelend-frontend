import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { LoginState } from '@/States/LoginState';

import axios from 'axios';
import styled from '@emotion/styled'

function LoginForm() {
  const { register, handleSubmit } = useForm({mode: "onChange"});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({
    password: '',
    username: '',
  })

  // 로그인 상태 설정
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const onSubmit = async (data) => {
    try {
      setState(data);
      setIsSubmitting(true);
      if (username == "") { alert('아이디를 입력해주세요.');}
      else if (password == "") { alert('비밀번호를 입력해주세요.') }
      else {
        const requestData = {
          "password": data.password,
          "username": data.username
        }
        console.log(requestData);
        const response = await axios.post(
          'https://api.tripyle.xyz/user/login',
          requestData,
          {"Content-Type": "application/json; charset=utf-8"}
        );
        console.log(response);
        if (response.data.accessToken) {
          localStorage.setItem('login-token', response.data.accessToken);
          setIsLoggedIn(true);
          console.log(isLoggedIn);
          alert('로그인 성공');
          window.location.href = '/';
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert('존재하지 않는 회원정보입니다.');
      }
      console.log(error);
    }
  };

  return (
    <>
      <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="username"
          type='text'
          placeholder='ID'
          required
          {...register('username', {required: true})}
        />
        <Input
          id="password"
          type='password'
          placeholder='PASSWORD'
          required
          {...register('password', {required: true})}
          />
        <CheckboxContainer>
          <CheckboxInput
            type='checkbox'
            id="loginChk"
          />
          <Label htmlFor="loginChk">Remember me</Label>
        </CheckboxContainer>
        <Button type='submit' disabled={isSubmitting}>
          Sign In
        </Button>
        </Form>
        </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: center;
  
`

const Title = styled.h2`
  padding: 5px 7px;
  border-bottom: 3px solid black;
  letter-spacing: -1px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  margin: 1rem 0;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #D6D5D5;

  font-size: 12px;

  padding: 15px 20px;
  margin: 0.6rem;
  width: 300px;
  height: 20px;

  &: focus{
    outline: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const CheckboxInput = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: 2.5px solid #D6D5D5;
  appearance: none;
  cursor: pointer;
  transition: background 0.2s;

  &: checked{
    background: #D6D5D5;
    border: none;
    content:'✔';
  }
`

const Label = styled.label`
  color: #666666;
  font-size: 14px;
  letter-spacing: -0.7px;

  cursor: pointer;
`;

const Button = styled.button`
  border-radius: 100px;
  border: none;
  background-color: #C8B6FF;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;

  padding: 15px 20px;
  margin: 20px;

  width: 340px;
  height: 55px;

  cursor: pointer;
`

export default LoginForm;