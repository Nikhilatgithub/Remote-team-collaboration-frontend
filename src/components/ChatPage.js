import React, { useState } from 'react';
import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample user list
  const users = ['Alice', 'Bob', 'Charlie', 'David'];

  const handleSendMessage = () => {
    if (currentMessage.trim() !== '' && selectedUser) {
      setMessages([...messages, { text: currentMessage, sender: 'You', time: new Date().toLocaleTimeString(), user: selectedUser }]);
      setCurrentMessage('');
    }
  };

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]); // Reset messages when a new user is selected
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', padding: 2 }}>
      {/* User List (Left Side) */}
      <Grid item xs={3}>
        <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Users</Typography>
          <List>
            {users.map((user, index) => (
              <ListItem key={index} button onClick={() => handleUserSelect(user)} selected={selectedUser === user}>
                <ListItemAvatar>
                  <Avatar>{user.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Chat Box (Right Side) */}
      <Grid item xs={9}>
        <Paper elevation={3} sx={{ padding: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {selectedUser ? `Chat with ${selectedUser}` : 'Select a user to start chatting'}
          </Typography>

          <Paper elevation={3} sx={{ flexGrow: 1, padding: 2, overflowY: 'auto', marginBottom: 2 }}>
            <List>
              {messages
                .filter(message => message.user === selectedUser)
                .map((message, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{message.sender.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${message.sender} - ${message.time}`}
                      secondary={message.text}
                    />
                  </ListItem>
                ))}
            </List>
          </Paper>

          {/* Message Input */}
          <Grid container sx={{ marginTop: 'auto' }}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={currentMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!selectedUser}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSendMessage}
                endIcon={<SendIcon />}
                disabled={!selectedUser}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatPage;
