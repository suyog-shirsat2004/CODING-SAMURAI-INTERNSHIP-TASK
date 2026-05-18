import { useEffect, useState, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const useMessages = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching messages:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, [roomId]);

  return { messages, loading };
};

export const useSendMessage = (roomId) => {
  const sendMessage = async (text, user) => {
    if (!text.trim() || !roomId || !user) return;

    const messagesRef = collection(db, 'rooms', roomId, 'messages');

    await addDoc(messagesRef, {
      text: text.trim(),
      userId: user.uid,
      userName: user.displayName || user.uid.slice(0, 8),
      userPhoto: user.photoURL || null,
      createdAt: serverTimestamp()
    });
  };

  return sendMessage;
};

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const roomsRef = collection(db, 'rooms');
    const q = query(roomsRef, orderBy('updatedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (roomsData.length === 0) {
        setRooms([
          { id: 'general', name: 'General', description: 'General discussion', updatedAt: new Date() },
          { id: 'random', name: 'Random', description: 'Off-topic chat', updatedAt: new Date() },
          { id: 'tech', name: 'Tech Talk', description: 'Technology discussions', updatedAt: new Date() }
        ]);
      } else {
        setRooms(roomsData);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching rooms:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { rooms, loading };
};
