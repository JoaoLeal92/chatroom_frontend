import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import '../../assets/enter-room-modal.css';

// import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import useChat from '../../hooks/socket';

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
  CreateRoomForm,
  ChooseNicknameForm,
} from './styles';

const Home: React.FC = () => {
  const createRoomFormRef = useRef<FormHandles>(null);
  const chooseNicknameFormRef = useRef<FormHandles>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { roomsData } = useChat('homePage', 'homePage');
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [nickname, setNickname] = useState('');

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleNicknameChange = useCallback((event) => {
    setNickname(event.target.value);
  }, []);

  const handleClickRoomOnTable = useCallback((room: string) => {
    setRoomName(room);
    setIsModalOpen(true);
  }, []);

  const handleCreateChatroom = useCallback(() => {
    history.push({
      pathname: `/${roomName}`,
      state: {
        nickname,
      },
    });
  }, [roomName, history, nickname]);

  return (
    <>
      <Toolbar />
      <Container>
        {isModalOpen && (
          // Modal for choosing nickname and entering the room
          <Modal
            open={isModalOpen}
            showCloseIcon={false}
            onClose={handleCloseModal}
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
              <ChooseNicknameForm
                ref={chooseNicknameFormRef}
                onSubmit={handleCreateChatroom}
              >
                <Input
                  name="nickname"
                  placeholder="Insira um apelido"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
                <Button type="submit">Entrar na Sala</Button>
              </ChooseNicknameForm>
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
            <CreateRoomForm ref={createRoomFormRef} onSubmit={handleOpenModal}>
              <Input
                name="roomName"
                placeholder="Digite o nome da sala"
                value={roomName}
                onChange={handleRoomNameChange}
              />
              <Button type="submit">Criar Sala</Button>
            </CreateRoomForm>
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
                  {roomsData.length > 0 &&
                    roomsData.map((room) => {
                      return (
                        <tr
                          onClick={() => handleClickRoomOnTable(room.roomName)}
                        >
                          <td>{room.roomName}</td>
                          <td>{room.numberOfUsers}</td>
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
