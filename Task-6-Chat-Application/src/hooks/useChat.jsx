import { useEffect, useState, useRef } from 'react';

const USE_DEMO = true;

const getMessages = (roomId) => {
  const data = localStorage.getItem(`messages_${roomId}`);
  return data ? JSON.parse(data) : [];
};

const saveMessage = (roomId, message) => {
  const messages = getMessages(roomId);
  messages.push(message);
  localStorage.setItem(`messages_${roomId}`, JSON.stringify(messages));
  window.dispatchEvent(new Event('storage'));
  return messages;
};

export const useMessages = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    const loadMessages = () => {
      const stored = getMessages(roomId);
      setMessages(stored);
      setLoading(false);
    };

    loadMessages();

    intervalRef.current = setInterval(loadMessages, 500);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [roomId]);

  return { messages, loading };
};

export const useSendMessage = (roomId) => {
  const sendMessage = (text, user) => {
    if (!text.trim() || !roomId || !user) return;

    const message = {
      id: Date.now().toString(),
      text: text.trim(),
      userId: user.uid,
      userName: user.displayName || user.uid.slice(0, 8),
      userPhoto: user.photoURL || null,
      createdAt: Date.now()
    };

    saveMessage(roomId, message);
  };

  return sendMessage;
};

export const useRooms = () => {
  const [rooms] = useState([
    { id: 'general', name: 'General', description: 'General discussion' },
    { id: 'random', name: 'Random', description: 'Off-topic chat' },
    { id: 'tech', name: 'Tech Talk', description: 'Technology discussions' }
  ]);

  return { rooms, loading: false };
};
