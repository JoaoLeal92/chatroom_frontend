import { useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3333';

interface Message {
  body: string;
  senderId: string;
  nickname: string;
}

interface RoomInfo {
  roomName: string;
  numberOfUsers: number;
}

interface UseChatReturn {
  messages: Message[];
  // newUserMessage: undefined | Message;
  sendMessage(messageBody: string, nickname: string): void;
  leaveRoom(nickname: string): void;
  activeUsers: string[];
  roomsData: RoomInfo[];
}

const useChat = (roomId: string, username: string): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]); // Sent and received messages
  const [activeUsers, setActiveUsers] = useState<string[]>([]); // Users in room
  const [roomsData, setRoomsData] = useState<RoomInfo[]>([]); // Info on every room available

  const socketRef = useRef<typeof Socket>();

  // Get list of current users in chatroom
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, username },
    });

    socketRef.current?.on('usersInRoom', (currentActiveUsers: string[]) => {
      setActiveUsers(currentActiveUsers);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, username]);

  // Get message history
  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, username },
    });

    socketRef.current?.on(
      'previoustMessages',
      (serverMessageHistory: Message[]) => {
        setMessages(serverMessageHistory);
      },
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, username]);

  // Get new messages when fired
  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, username },
    });

    // Listens for incoming messages
    socketRef.current.on('newChatMessage', (message: Message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current?.id,
      };
      console.log(message);
      setMessages((currentMessages) => [...currentMessages, incomingMessage]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, messages, username]);

  // Gets rooms information for display on home page
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (username === 'homePage' && roomId === 'homePage') {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId, username },
      });

      socketRef.current.on('roomsInfo', (rooms: RoomInfo[]) => {
        setRoomsData(rooms);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [roomId, messages, username]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: string, nickname: string) => {
    if (socketRef.current) {
      socketRef.current.emit('sendMessage', {
        nickname,
        body: messageBody,
        senderId: socketRef.current.id,
      });
    }
  };

  // Leave chatroom
  const leaveRoom = (nickname: string) => {
    if (socketRef.current) {
      socketRef.current.emit('leaveRoom', {
        nickname,
      });
    }
  };

  return { messages, sendMessage, leaveRoom, activeUsers, roomsData };
};

export default useChat;
