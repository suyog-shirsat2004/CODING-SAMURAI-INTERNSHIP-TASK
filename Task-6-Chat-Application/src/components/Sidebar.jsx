import { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ rooms, activeRoom, onSelectRoom, user, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>💬 ChatApp</h2>
      </div>

      <div className="user-info">
        <div className="user-avatar">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} />
          ) : (
            <span>👤</span>
          )}
        </div>
        <div className="user-details">
          <p className="user-name">{user?.displayName || 'Guest'}</p>
          <p className="user-email">{user?.email || 'Anonymous'}</p>
        </div>
        <button className="logout-btn" onClick={onLogout} title="Logout">
          ⏻
        </button>
      </div>

      <div className="rooms-section">
        <h3>Chat Rooms</h3>
        <ul className="room-list">
          {rooms.map(room => (
            <li
              key={room.id}
              className={`room-item ${activeRoom === room.id ? 'active' : ''}`}
              onClick={() => onSelectRoom(room.id)}
            >
              <span className="room-icon">#</span>
              <div className="room-info">
                <span className="room-name">{room.name}</span>
                <span className="room-description">{room.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
