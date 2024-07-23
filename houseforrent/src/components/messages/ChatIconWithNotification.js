import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Badge } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const ChatIconWithNotification = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/messages/unread-count/${userId}`);
        setUnreadCount(response.data);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();

    // Polling for new messages (you can replace this with WebSocket for real-time updates)
    const interval = setInterval(fetchUnreadCount, 5000);

    return () => clearInterval(interval);
  }, [userId, isChatOpen]);

  const handleChatIconClick = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      // Mark all messages as read
      axios.post(`http://localhost:8080/api/messages/read/${userId}`);
    }
  };

  return (
    <IconButton onClick={handleChatIconClick}>
      <Badge badgeContent={unreadCount} color="error">
        <ChatIcon />
      </Badge>
    </IconButton>
  );
};

export default ChatIconWithNotification;
