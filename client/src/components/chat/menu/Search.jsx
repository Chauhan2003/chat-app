import { Box, InputBase } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ setText }) => {
    return (
        <Box sx={{ width: '100%', minHeight: '50px', borderBottom: '1px solid lightgray', paddingInline: '10px', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', padding: '3px 0', display: 'flex', alignItems: 'center', overflow: 'hidden', borderRadius: '10px', background: '#ededed' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 20px 0 15px' }}>
                        <SearchIcon />
                    </Box>
                    <InputBase placeholder='Search or start new chat' sx={{ width: '100%', paddingRight: '15px' }} onChange={(e) => setText(e.target.value)} />
                </Box>
            </Box>
        </Box>
    )
}

export default Search
