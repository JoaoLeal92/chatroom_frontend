import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiUsers, FiSend } from 'react-icons/fi';

import Toolbar from '../../components/Toolbar';

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

interface RoomProps {
  roomName: string;
}

const ChatRoom: React.FC = () => {
  const { roomName } = useParams<RoomProps>();

  const [activeUsers, setActiveUsers] = useState([
    {
      id: 1,
      nickname: 'Joao',
    },
    {
      id: 2,
      nickname: 'Joao2',
    },
    {
      id: 3,
      nickname: 'Joao3',
    },
    {
      id: 4,
      nickname: 'Joao4',
    },
  ]);
  const [messages, setMessages] = useState([
    {
      user: 'teste@teste.com',
      nickname: 'Joao',
      text: 'Minha mensagem de testes',
    },
    {
      user: 'teste2@teste.com',
      nickname: 'Joao2',
      text: 'Mensagem de testes 2',
    },
    {
      user: 'teste3@teste.com',
      nickname: 'Joao3',
      text: 'Mensagem de testes 3',
    },
    {
      user: 'teste4@teste.com',
      nickname: 'Joao4',
      text: 'Mensagem de testes 4',
    },
  ]);
  const [userMessage, setUserMessage] = useState('');

  const handleUpdateUserMessage = useCallback((event) => {
    setUserMessage(event.target.value);
  }, []);

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
                      {message.text}
                    </p>
                  );
                })}
              </ChatHistory>
              <ChatInput>
                <input
                  value={userMessage}
                  placeholder="Digite aqui sua mensagem"
                  onChange={handleUpdateUserMessage}
                />
                <button type="button">
                  <FiSend size={32} />
                </button>
              </ChatInput>
            </ChatWindow>
            {/* Users in the room */}
            <RoomInfo>
              <InfoTitle>
                <FiUsers size={30} />
                Usuários
              </InfoTitle>
              <UsersList>
                {activeUsers.map((user) => {
                  return (
                    <User key={user.id}>
                      <FiUser />
                      <div>{user.nickname}</div>
                    </User>
                  );
                })}
              </UsersList>
            </RoomInfo>
          </ChatArea>
        </InterfaceArea>
      </Container>
    </>
  );
};

export default ChatRoom;
