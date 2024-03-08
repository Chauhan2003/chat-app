import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { AccountContext } from '../../context/AccountProvider';
import { formatDate } from '../../utils/common';

const SingleMessage = ({ mess }) => {
    const { account } = useContext(AccountContext);

    const commonBoxStyle = {
        background: '#ededed',
        maxWidth: '350px',
        padding: '5px',
        width: 'fit-content',
        display: 'flex',
        borderRadius: '4px',
        wordBreak: 'break-word',
    };

    return (
        <Box sx={account._id === mess.senderId ? { ...commonBoxStyle, marginLeft: 'auto' } : commonBoxStyle}>
            <Typography sx={{ fontSize: '15px', padding: '0 20px 0 5px' }}>{mess.text}</Typography>
            <Typography sx={{ fontSize: '10px', color: 'gray', marginTop: '6px', wordBreak: 'keep-all', marginTop: 'auto' }}>
                {formatDate(mess.createdAt)}
            </Typography>
        </Box>
    );
};

export default SingleMessage;
