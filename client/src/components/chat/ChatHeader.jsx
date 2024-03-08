import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AccountContext } from '../../context/AccountProvider';

const ChatHeader = ({ person }) => {
    const { activeUsers } = useContext(AccountContext);
    return (
        <Box sx={{
            minHeight: '50px',
            background: '#ededed',
            display: 'flex',
            paddingInline: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid lightgray'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px'
            }}>
                <Avatar src={person.avatar} />
                <Box>
                    <Typography>{person.name}</Typography>
                    <Typography fontSize={12}>{activeUsers?.find(user => user._id === person._id) ? 'Online' : 'Offline'}</Typography>
                </Box>
            </Box>
            <IconButton>
                <MoreVertIcon sx={{ color: 'black' }} />
            </IconButton>
        </Box >
    )
}

export default ChatHeader
