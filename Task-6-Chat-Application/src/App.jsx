import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { useRooms } from './hooks/useChat.jsx';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';
import './styles/App.css';

const ChatApp = () => {
  const { user, logout } = useAuth();
  const { rooms, loading: roomsLoading } = useRooms();
  const [activeRoom, setActiveRoom] = useState('general');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <Login />;
  }

  const currentRoom = rooms.find(r => r.id === activeRoom);

  return (
    <div className="chat-app">
      <Sidebar
        rooms={rooms}
        activeRoom={activeRoom}
        onSelectRoom={setActiveRoom}
        user={user}
        onLogout={handleLogout}
      />
      <ChatRoom
        roomId={activeRoom}
        roomName={currentRoom?.name || 'Chat'}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ChatApp />
    </AuthProvider>
  );
}

export default App;
