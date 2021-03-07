import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import '../../assets/enter-room-modal.css';

import Toolbar from '../../components/Toolbar';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  CreateRoomsForm,
  ChatRoomsArea,
  ChatRoomsDescription,
  ChatRoomAreaHeader,
  ChatRoomsList,
  CustomStickyTable,
  EnterRoomModalContent,
  EnterRoomModalHeader,
} from './styles';

interface chatRoomsData {
  id: number;
  roomName: string;
  activeUsers: number;
}

const Home: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<chatRoomsData[]>([
    {
      id: 1,
      roomName: 'Sala 1',
      activeUsers: 2,
    },
    {
      id: 2,
      roomName: 'Sala 2',
      activeUsers: 5,
    },
    {
      id: 3,
      roomName: 'Sala 3',
      activeUsers: 12,
    },
    {
      id: 4,
      roomName: 'Sala 4',
      activeUsers: 22,
    },
    {
      id: 5,
      roomName: 'Sala 1',
      activeUsers: 2,
    },
    {
      id: 6,
      roomName: 'Sala 2',
      activeUsers: 5,
    },
    {
      id: 7,
      roomName: 'Sala 3',
      activeUsers: 12,
    },
    {
      id: 8,
      roomName: 'Sala 4',
      activeUsers: 22,
    },
    {
      id: 9,
      roomName: 'Sala 1',
      activeUsers: 2,
    },
    {
      id: 10,
      roomName: 'Sala 2',
      activeUsers: 5,
    },
    {
      id: 11,
      roomName: 'Sala 3',
      activeUsers: 12,
    },
    {
      id: 12,
      roomName: 'Sala 4',
      activeUsers: 22,
    },
    {
      id: 13,
      roomName: 'Sala 1',
      activeUsers: 2,
    },
    {
      id: 14,
      roomName: 'Sala 2',
      activeUsers: 5,
    },
    {
      id: 15,
      roomName: 'Sala 3',
      activeUsers: 12,
    },
    {
      id: 16,
      roomName: 'Sala 4',
      activeUsers: 22,
    },
    {
      id: 17,
      roomName: 'Sala 1',
      activeUsers: 2,
    },
    {
      id: 18,
      roomName: 'Sala 2',
      activeUsers: 5,
    },
    {
      id: 19,
      roomName: 'Sala 3',
      activeUsers: 12,
    },
    {
      id: 20,
      roomName: 'Sala 4',
      activeUsers: 22,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = React.useState('');
  const [nickname, setNickname] = React.useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  const onOpenModal = useCallback(() => setIsModalOpen(true), []);
  const onCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleNicknameChange = useCallback((event) => {
    setNickname(event.target.value);
  }, []);

  useEffect(() => {
    console.log('abriu modal');
    console.log(roomName);
  }, [isModalOpen, roomName]);

  return (
    <>
      <Toolbar />
      <Container>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            showCloseIcon={false}
            onClose={onCloseModal}
            center
            classNames={{
              modal: 'enterRoomModal',
            }}
            container={containerRef.current as Element}
          >
            <EnterRoomModalHeader>
              Insira um apelido abaixo para entrar na sala!
            </EnterRoomModalHeader>
            <EnterRoomModalContent>
              <Input
                placeholder="Insira um apelido"
                value={nickname}
                onChange={handleNicknameChange}
              />
              <Button>Entrar na Sala</Button>
            </EnterRoomModalContent>
          </Modal>
        )}
        <ChatRoomsArea>
          <ChatRoomAreaHeader>Bem vindo ao ChatPlan!</ChatRoomAreaHeader>
          <ChatRoomsDescription>
            Selecione na lista abaixo uma sala para participar, ou insira um
            nome e crie uma nova sala!
          </ChatRoomsDescription>
          <CreateRoomsForm>
            <Input
              placeholder="Digite o nome da sala"
              value={roomName}
              onChange={handleRoomNameChange}
            />
            <Button>Criar Sala</Button>
          </CreateRoomsForm>
          <ChatRoomsList>
            <CustomStickyTable height={480}>
              <table>
                <thead>
                  <tr>
                    <th>Nome da Sala</th>
                    <th>Participantes ativos</th>
                  </tr>
                </thead>
                <tbody>
                  {chatRooms.length > 0 &&
                    chatRooms.map((room) => {
                      return (
                        <tr key={room.id} onClick={onOpenModal}>
                          <td>{room.roomName}</td>
                          <td>{room.activeUsers}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </CustomStickyTable>
          </ChatRoomsList>
        </ChatRoomsArea>
      </Container>
    </>
  );
};

export default Home;
