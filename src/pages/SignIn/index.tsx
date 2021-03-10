import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  SignUpBox,
  SignUpBoxHeader,
  SignUpBoxContent,
} from './styles';

import Toolbar from '../../components/Toolbar';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface ISignUpProps {
  name: string;
  email: string;
  dateOfBirth: Date;
  password: string;
}

const SignUp: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const signUpFormRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ISignUpProps) => {
      try {
        await signIn({ email: data.email, password: data.password });

        history.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [history, signIn],
  );

  return (
    <>
      <Toolbar />
      <Container>
        <SignUpBox>
          <SignUpBoxHeader>Login de usuário</SignUpBoxHeader>
          <SignUpBoxContent>
            <Form ref={signUpFormRef} onSubmit={handleSubmit}>
              <Input name="email" placeholder="E-mail" type="email" />
              <Input name="password" placeholder="Senha" type="password" />
              <Button>Login</Button>
            </Form>
          </SignUpBoxContent>
        </SignUpBox>
      </Container>
    </>
  );
};

export default SignUp;
