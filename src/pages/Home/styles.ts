import styled from 'styled-components';
import StickyTable from 'react-sticky-table-thead';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const CreateRoomsForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ChatRoomsArea = styled.div`
  width: 40%;
  height: 70%;

  background: #d44332;

  border-radius: 10px;

  button {
    margin-left: 10px;
  }
`;

export const ChatRoomsDescription = styled.div`
  color: #dedede;
  font-size: 20px;

  text-align: center;

  padding: 0 8px;
  margin: 16px 0;
`;

export const ChatRoomAreaHeader = styled.div`
  height: 10%;
  color: #fff;

  background-color: #a62c1c;
  border-radius: 10px 10px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  font-weight: bold;

  margin-bottom: 16px;
`;

export const ChatRoomsList = styled.div`
  padding: 10px;
  border-radius: 10px;

  table {
    width: 100%;
    background-color: #dedede;
    border-radius: 10px;
    border-collapse: collapse;

    text-align: center;

    th {
      font-size: 22px;
      background-color: #ababab;
      padding: 8px 0;
    }

    td {
      padding: 6px;
      border: none;
      font-size: 20px;
    }

    tr:hover {
      background-color: #ababab;
    }
  }
`;

export const CustomStickyTable = styled(StickyTable)`
  height: 470px;
  border-radius: 10px;
`;

export const EnterRoomModalContent = styled.div`
  width: 550px;
  height: 200px;

  background: #6519d6;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 12px;
  }
`;

export const EnterRoomModalHeader = styled.h2`
  width: 100%;
  height: 50px;

  background-color: #8849e2;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: #dedede;
  font-weight: bold;
`;
