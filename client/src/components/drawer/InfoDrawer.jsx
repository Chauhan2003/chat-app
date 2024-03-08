import { Box, Drawer, IconButton, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from './Profile';

const drawerStyle = {
    width: '430px',
    height: '100%',
    boxShadow: 'none'
}

const InfoDrawer = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ededed', padding: '40px 10px 10px 10px' }}>
                <IconButton onClick={handleClose}>
                    <ArrowBackIcon sx={{ color: 'black' }} />
                </IconButton>
                <Typography sx={{ fontSize: '25px', userSelect: 'none', fontWeight: '600' }}>Profile</Typography>
            </Box>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Profile />
            </Box>
        </Drawer>
    )
}

export default InfoDrawer
