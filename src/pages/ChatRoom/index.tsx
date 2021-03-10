import React, { useState, useCallback } from 'react';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import { FiUser, FiUsers, FiSend } from 'react-icons/fi';

import Toolbar from '../../components/Toolbar';

import useChat from '../../hooks/socket';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  InterfaceArea,
  ChatHeader,
  ChatArea,
  ChatWindow,
  ChatHistory,
  ChatInput,
  RoomInfo,
  InfoTitle,
  UsersList,
  User,
} from './styles';
import Button from '../../components/Button';

interface RoomProps {
  roomName: string;
}

const ChatRoom: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { state } = useLocation<any>();

  const { roomName } = useParams<RoomProps>();
  const { messages, sendMessage, leaveRoom, activeUsers } = useChat(
    roomName,
    state.nickname,
  );

  // const [activeUsers, setActiveUsers] = useState([
  //   {
  //     id: 1,
  //     nickname: 'Joao',
  //   },
  //   {
  //     id: 2,
  //     nickname: 'Joao2',
  //   },
  //   {
  //     id: 3,
  //     nickname: 'Joao3',
  //   },
  //   {
  //     id: 4,
  //     nickname: 'Joao4',
  //   },
  // ]);
  const [userMessage, setUserMessage] = useState('');

  const handleUpdateUserMessage = useCallback((event) => {
    setUserMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (userMessage) {
      sendMessage(userMessage, state.nickname);
      setUserMessage('');
    }
  }, [userMessage, sendMessage, state.nickname]);

  const handleLeaveRoom = useCallback(() => {
    leaveRoom(state.nickname);
    history.push('/');
  }, [state.nickname, history, leaveRoom]);

  return (
    <>
      <Toolbar />
      <Container>
        <InterfaceArea>
          <ChatHeader>Bem-vindo à sala {roomName}</ChatHeader>
          <ChatArea>
            {/* Area where the chat itself is located */}
            <ChatWindow>
              <ChatHistory>
                {messages.map((message) => {
                  return (
                    <p>
                      <span className="nickname">{message.nickname}</span>:{' '}
                      {message.body}
                    </p>
                  );
                })}
              </ChatHistory>
              <ChatInput>
                {!user ? (
                  <>
                    <div>
                      Faça seu login <Link to="/signin">aqui</Link> para poder
                      interagir na sala
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      value={userMessage}
                      placeholder="Digite aqui sua mensagem"
                      onChange={handleUpdateUserMessage}
                    />
                    <button type="button" onClick={handleSendMessage}>
                      <FiSend size={32} />
                    </button>
                  </>
                )}
              </ChatInput>
            </ChatWindow>
            {/* Users in the room */}
            <RoomInfo>
              <InfoTitle>
                <FiUsers size={30} />
                Usuários
              </InfoTitle>
              <UsersList>
                {activeUsers.map((activeUser) => {
                  return (
                    <User>
                      <FiUser />
                      <div>{activeUser}</div>
                    </User>
                  );
                })}
              </UsersList>
              <Button type="button" onClick={handleLeaveRoom}>
                Sair da Sala
              </Button>
            </RoomInfo>
          </ChatArea>
        </InterfaceArea>
      </Container>
    </>
  );
};

export default ChatRoom;
