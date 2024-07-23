import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem } from '@mui/material';

const ChatWindow = ({ userId, chatPartnerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/messages/messages/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:8080/api/messages/send', {
        senderId: userId,
        receiverId: chatPartnerId,
        content: newMessage,
        read: false
      });
      setNewMessage('');
      // Optionally fetch updated messages
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <List>
        {messages.map(message => (
          <ListItem key={message.id}>
            {message.content}
          </ListItem>
        ))}
      </List>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
};

export default ChatWindow;
