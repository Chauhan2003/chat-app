import React, { useState } from 'react'
import Header from './Header'
import { Box } from '@mui/material'
import Search from './Search'
import Conversation from './Conversation'

const Menu = () => {
    const [text, setText] = useState('');
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <Header />
            <Search setText={setText} />
            <Conversation text={text} />
        </Box>
    )
}

export default Menu
