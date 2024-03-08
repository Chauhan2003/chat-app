import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';

const HeaderMenu = () => {
    const [open, SetOpen] = useState(false);
    const handleClick = (e) => {
        SetOpen(e.currentTarget);
    };
    const handleClose = () => {
        SetOpen(false);
    };
    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                getContentAnchorE1={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={handleClose}>New Group</MenuItem>
                <MenuItem onClick={handleClose}>Setting</MenuItem>
            </Menu>
        </>
    )
}

export default HeaderMenu
