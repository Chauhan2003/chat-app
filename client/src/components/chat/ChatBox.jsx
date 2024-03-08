import React, { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import axios from 'axios'
import { AccountContext } from '../../context/AccountProvider'

const ChatBox = () => {
    const { person, account } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            const result = await axios.post(`http://localhost:8000/api/v2/feed/getconversation`, { senderId: account._id, recieverId: person._id });
            // console.log(result.data.conversation);
            setConversation(result.data.conversation);
        }
        getConversationDetails();
    }, [person._id]);
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        }}>
            <ChatHeader person={person} />
            <Messages person={person} account={account} conversation={conversation} />
        </Box>
    )
}

export default ChatBox
