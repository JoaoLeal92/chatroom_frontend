import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 25%;
  height: 45%;
  background-color: #d44332;

  border-radius: 10px;

  form {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
  }
`;

export const SignUpBoxHeader = styled.div`
  height: 15%;
  width: 100%;

  background-color: #a62c1c;
  color: #dedede;

  border-radius: 10px 10px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  font-weight: bold;
`;

export const SignUpBoxContent = styled.div`
  height: 90%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    margin: 8px;
  }
`;

export const ErrorMessageContainer = styled.p`
  color: #dedede;
  font-size: 20px;

  margin-top: 8px;
  text-align: center;
`;
