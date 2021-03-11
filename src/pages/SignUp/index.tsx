import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  SignUpBox,
  SignUpBoxHeader,
  SignUpBoxContent,
  ErrorMessageContainer,
} from './styles';

import Toolbar from '../../components/Toolbar';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

interface ISignUpProps {
  name: string;
  email: string;
  dateOfBirth: Date;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const signUpFormRef = useRef<FormHandles>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (data: ISignUpProps) => {
      try {
        await api.post('/users', {
          name: data.name,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          password: data.password,
        });

        history.push('/');
      } catch (err) {
        setErrorMessage(
          'Erro ao realizar o cadastro, confira seus dados e tente novamente',
        );
      }
    },
    [history],
  );

  return (
    <>
      <Toolbar />
      <Container>
        <SignUpBox>
          <SignUpBoxHeader>Cadastro de usuário</SignUpBoxHeader>
          <SignUpBoxContent>
            <Form ref={signUpFormRef} onSubmit={handleSubmit}>
              <Input name="name" placeholder="Nome" />
              <Input name="email" placeholder="E-mail" />
              <Input name="dateOfBirth" placeholder="Data de nascimento" />
              <Input name="password" placeholder="Senha" type="password" />
              <Button>Cadastrar</Button>
            </Form>
            {errorMessage && (
              <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
            )}
          </SignUpBoxContent>
        </SignUpBox>
      </Container>
    </>
  );
};

export default SignUp;
