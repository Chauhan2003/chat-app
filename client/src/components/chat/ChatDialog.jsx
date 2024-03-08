import { Box } from '@mui/material'
import React, { useContext } from 'react'
import Menu from './menu/Menu'
import EmptyChat from './EmptyChat'
import ChatBox from './ChatBox'
import { AccountContext } from '../../context/AccountProvider'

const ChatDialog = () => {
  const { person } = useContext(AccountContext);
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* Left Area */}
      <Box sx={{ minWidth: '430px', height: '100%' }}>
        <Menu />
      </Box>
      {/* Right Area */}
      <Box sx={{ width: '100%', minWidth: '340px', height: '100%', borderLeft: '1px solid gray' }}>
        {
          person ? <ChatBox /> : <EmptyChat />
        }
      </Box>
    </Box>
  )
}

export default ChatDialog
