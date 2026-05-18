import { useEffect, useRef } from 'react';
import '../styles/MessageList.css';

const MessageList = ({ messages, currentUserId, loading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="message-list loading">
        <div className="loading-spinner">Loading messages...</div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="message-list empty">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  let lastDate = '';

  return (
    <div className="message-list">
      {messages.map((message, index) => {
        const isOwn = message.userId === currentUserId;
        const messageDate = formatDate(message.createdAt);
        const showDate = messageDate !== lastDate;
        lastDate = messageDate;

        return (
          <div key={message.id}>
            {showDate && (
              <div className="date-divider">
                <span>{messageDate}</span>
              </div>
            )}
            <div className={`message ${isOwn ? 'own' : 'other'}`}>
              {!isOwn && (
                <div className="message-avatar">
                  {message.userPhoto ? (
                    <img src={message.userPhoto} alt={message.userName} />
                  ) : (
                    <span>{message.userName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              )}
              <div className="message-content">
                {!isOwn && (
                  <span className="message-sender">{message.userName}</span>
                )}
                <p className="message-text">{message.text}</p>
                <span className="message-time">{formatTime(message.createdAt)}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
