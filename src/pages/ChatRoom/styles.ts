import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const InterfaceArea = styled.div`
  width: 80%;
  height: 80%;

  border-radius: 10px;
`;

export const ChatHeader = styled.h2`
  width: 100%;
  height: 5%;

  color: #fff;
  background-color: #a62c1c;

  font-size: 24px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px 10px 0 0;
`;

export const ChatArea = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  border-radius: 0 0 0 10px;
  border: 1px solid black;
`;

export const ChatWindow = styled.div`
  width: 80%;
  height: 100%;

  border-radius: 0 0 0 10px;
`;

export const ChatHistory = styled.div`
  width: 100%;
  height: 94%;

  border-bottom: 1px solid black;

  padding: 24px;

  overflow-y: scroll;
  overflow-wrap: break-word;

  p {
    font-size: 20px;
    margin-top: 20px;

    .nickname {
      font-weight: bold;
    }
  }
`;

export const ChatInput = styled.div`
  width: 100%;
  height: 5%;

  display: flex;
  align-items: center;
  margin-top: 5px;

  input {
    width: 100%;
    background: transparent;
    border: 0;
    margin-left: 10px;
  }

  button {
    height: 48px;
    width: 48px;

    border: 0;
    /* background-color: #d44332; */
    background: transparent;
  }

  div {
    margin-left: 10px;
  }
`;

export const RoomInfo = styled.div`
  width: 20%;

  background-color: #d44332;
  color: #dedede;

  font-size: 24px;
  font-weight: bold;

  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    /* width: 100%; */
    position: absolute;
    bottom: 7%;
  }
`;

export const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }
`;

export const UsersList = styled.ul`
  list-style-type: none;
  margin-top: 24px;
`;

export const User = styled.li`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 8px;

  display: flex;
  margin: 8px;

  svg {
    margin-right: 8px;
  }
`;
