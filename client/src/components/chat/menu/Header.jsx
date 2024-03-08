import { Avatar, Box, IconButton } from '@mui/material'
import React, { useContext, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';
import { AccountContext } from '../../../context/AccountProvider';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';

const Header = () => {
    const { account } = useContext(AccountContext);
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }
    return (
        <>
            <Box sx={{
                width: '100%',
                minHeight: '50px',
                background: '#ededed',
                display: 'flex',
                paddingInline: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid lightgray'
            }}>
                <Avatar src={account.avatar} onClick={toggleDrawer} />
                <Box>
                    <IconButton>
                        <MessageIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <HeaderMenu />
                </Box>
            </Box >
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        </>
    )
}

export default Header
