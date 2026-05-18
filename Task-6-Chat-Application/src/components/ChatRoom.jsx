import { useAuth } from '../hooks/useAuth.jsx';
import { useMessages, useSendMessage } from '../hooks/useChat.jsx';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../styles/ChatRoom.css';

const ChatRoom = ({ roomId, roomName }) => {
  const { user } = useAuth();
  const { messages, loading } = useMessages(roomId);
  const sendMessage = useSendMessage(roomId);

  const handleSendMessage = (text) => {
    sendMessage(text, user);
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>
          <span className="room-hash">#</span>
          {roomName}
        </h2>
        <p className="online-count">
          <span className="online-dot"></span>
          Real-time chat
        </p>
      </div>

      <MessageList
        messages={messages}
        currentUserId={user?.uid}
        loading={loading}
      />

      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={!user}
      />
    </div>
  );
};

export default ChatRoom;
