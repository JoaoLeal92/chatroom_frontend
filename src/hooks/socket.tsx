import { useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:3333';

interface Message {
  body: string;
  userId: string;
  // text: string;
}

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]); // Sent and received messages
  const socketRef = useRef<typeof Socket>();

  useEffect(() => {
    console.log(messages);
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
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
  const sendMessage = (messageBody: string) => {
    console.log(messageBody);
    if (socketRef.current) {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        body: messageBody,
        senderId: socketRef.current.id,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChat;
