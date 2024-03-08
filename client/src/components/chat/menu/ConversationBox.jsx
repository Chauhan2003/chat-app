import { Box, Avatar, Typography, Chip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AccountContext } from '../../../context/AccountProvider';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/common';

const ConversationBox = ({ user }) => {
    const [message, setMessage] = useState({});
    const { setPerson, account, newMessageFlag } = useContext(AccountContext);

    useEffect(() => {
        const getConversationDetails = async () => {
            try {
                const result = await axios.post(`http://localhost:8000/api/v2/feed/getconversation`, { senderId: account._id, recieverId: user._id })
                // console.log(result.data.conversation);
                setMessage({
                    text: result.data.conversation?.message,
                    timestamp: result.data.conversation?.updatedAt
                })
            } catch (err) {
                toast.error(err)
            }
        }
        getConversationDetails();
    }, [newMessageFlag])

    const handleSetUser = async () => {
        try {
            const senderId = account._id;
            const recieverId = user._id;
            const result = await axios.post(`http://localhost:8000/api/v2/feed/user`, { senderId, recieverId });
            // console.log(result.data);
            setPerson(user);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '7px 18px',
                border: 1,
                borderColor: 'divider',
                '&:hover': {
                    backgroundColor: 'action.hover',
                }

            }}
            onClick={handleSetUser}
        >
            <Avatar sx={{ width: '47px', height: '47px', border: '1px solid lightgray' }} src={user.avatar} />
            <Box sx={{ marginLeft: 1.5, flexGrow: 1 }}>
                <Typography fontSize={18}>{user.name}</Typography>
                <Typography fontSize={13} color="text.secondary">
                    {
                        message?.text?.includes('localhost') ? 'media' : message.text
                    }
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                    {
                        message?.text && formatDate(message?.timestamp)
                    }
                </Typography>
            </Box>
        </Box >
    )
}

export default ConversationBox
