import React, { useContext } from 'react'
import ChatDialog from './chat/ChatDialog';
import { Box } from '@mui/material';

const Messenger = () => {
  return (
    <Box sx={{ position: 'fixed', width: '100%', height: '100vh', top: '0' }}>
      <ChatDialog />
    </Box>
  )
}

export default Messenger
