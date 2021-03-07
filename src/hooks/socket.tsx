import { useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3333';

interface Message {
  body: string;
  userId: string;
  nickname: string;
}

interface UseChatReturn {
  messages: Message[];
  sendMessage(messageBody: string, nickname: string): void;
  // initialMessage: string;
}

const useChat = (roomId: string): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]); // Sent and received messages
  // const [initialMessage, setInitialMessage] = useState<string>('');
  const socketRef = useRef<typeof Socket>();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
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
  }, [roomId]);

  useEffect(() => {
    const messageHistory: Message[] = [];
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on('newChatMessage', (message: any) => {
      if (socketRef.current) {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketRef.current.id,
        };
        setMessages((currentMessages) => [...currentMessages, incomingMessage]);
      }
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId, messages]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: string, nickname: string) => {
    if (socketRef.current) {
      socketRef.current.emit('newChatMessage', {
        nickname,
        body: messageBody,
        senderId: socketRef.current.id,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChat;
