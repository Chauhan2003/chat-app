import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import ConversationBox from './ConversationBox';
import { AccountContext } from '../../../context/AccountProvider';

const Conversation = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(`http://localhost:8000/api/v1/feed`, account);
        let filteredData = result.data.friends
          .filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
          .reduce((uniqueUsers, user) => {
            // Check if the user ID is already in the uniqueUsers array
            if (!uniqueUsers.some(existingUser => existingUser._id === user._id)) {
              uniqueUsers.push(user);
            }
            return uniqueUsers;
          }, []);

        setUsers(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [text, account]);

  useEffect(() => {
    socket.current.emit('addUsers', account);
    socket.current.on('getUsers', users => {
      setActiveUsers(users);
    });
  }, [account])

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      overflowY: 'auto'
    }}>
      {
        users.map((user) => (
          <ConversationBox key={user._id} user={user} />
        ))
      }
    </Box>
  );
};

export default Conversation;