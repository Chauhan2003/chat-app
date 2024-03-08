import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';

const Profile = () => {
    const [editProfile, setEditProfile] = useState(false);
    const { account } = useContext(AccountContext);
    const handleEditProfile = () => {
        setEditProfile(true);
    }
    const handleUpdateProfile = () => {
        // Axios request for updating profile data
        setEditProfile(false);
    }
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            {!editProfile ? (
                <>
                    <Box sx={{ width: '150px', height: '150px', margin: '20px 0 10px 0', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <Avatar src={account.avatar} sx={{ width: '100%', height: '100%' }} alt='profile' />
                    </Box>
                    <Box sx={{ width: '100%', padding: '12px 20px 2px 20px' }}>
                        <Typography sx={{ fontSize: '13px', userSelect: 'none' }}>Name:</Typography>
                        <Typography sx={{ width: '100%', marginTop: '5px', paddingBottom: '5px', borderBottom: '1px solid lightgray' }}>{account.name}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', padding: '12px 20px 2px 20px' }}>
                        <Typography sx={{ fontSize: '13px', userSelect: 'none' }}>About:</Typography>
                        <Typography sx={{ width: '100%', marginTop: '5px', paddingBottom: '5px', borderBottom: '1px solid lightgray' }}>Hy, I am back</Typography>
                    </Box>
                    <Box sx={{ width: '100%', padding: '12px 20px 2px 20px' }}>
                        <Typography sx={{ fontSize: '13px', userSelect: 'none' }}>Phone:</Typography>
                        <Typography sx={{ width: '100%', marginTop: '5px', paddingBottom: '5px', borderBottom: '1px solid lightgray' }}>{account.phone}</Typography>
                    </Box>
                    <Button sx={{ marginTop: '10px', color: 'black' }} onClick={handleEditProfile}>
                        Edit profile
                    </Button>
                </>
            ) : (
                <>
                    <IconButton sx={{ width: '165px', height: '165px', margin: '10px 0 10px 0', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <Avatar src={account.avatar} sx={{ width: '100%', height: '100%' }} alt='profile' />
                    </IconButton>
                    <Box sx={{ width: '100%', padding: '20px 20px 2px 20px' }}>
                        <TextField
                            label="Name"
                            defaultValue={account.name}
                            size="small"
                            variant="standard"
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%', padding: '20px 20px 2px 20px' }}>
                        <TextField
                            label="About"
                            defaultValue="Hy, I am back"
                            size="small"
                            variant="standard"
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Box>
                    <Box sx={{ width: '100%', padding: '20px 20px 2px 20px' }}>
                        <TextField
                            label="Phone"
                            defaultValue={account.phone}
                            size="small"
                            variant="standard"
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Box>
                    <Button sx={{ marginTop: '10px', color: 'black' }} onClick={handleUpdateProfile}>
                        Update Profile
                    </Button>
                </>
            )}
        </Box>
    );
}

export default Profile;