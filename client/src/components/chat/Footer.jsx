import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
import { toast } from 'react-toastify';

const Footer = ({ setValue, sendText, value, file, setFile }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '50px',
                background: '#ededed',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingInline: '5px',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    marginInline: '10px',
                    height: '100%',
                }}
            >
                <input
                    style={{
                        width: '100%',
                        height: '100%',
                        outline: 'none',
                        border: 'none',
                        fontSize: '17px',
                        background: 'transparent',
                    }}
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                    value={value}
                />
            </Box>
        </Box>
    );
};

export default Footer;
