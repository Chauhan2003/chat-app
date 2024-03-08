import React, { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';
import { AccountContext } from '../../context/AccountProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const LoginDialog = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setAccount } = useContext(AccountContext);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            const result = await axios.post(`http://localhost:8000/api/v1/`, data);
            toast.success(result.data.message);
            setAccount(result.data.user);
            navigate('/feed');
        } catch (err) {
            toast.error(err.response.data.message)
        }
    };

    return (
        <Container
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box p={2} display={'flex'} flexDirection={'column'} width={'400px'} gap={'15px'} border={'1px solid gray'} borderRadius={'4px'}>
                <Typography fontSize={30} textAlign={'center'} fontWeight={600}>
                    Login
                </Typography>
                <TextField
                    id="outlined-required"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    sx={{ padding: '8px 0', fontSize: '18px' }}
                    onClick={handleSubmit}
                >
                    Login
                </Button>
                <Typography>Don't have an account? <Link to='/register'>Register</Link></Typography>
            </Box>
        </Container>
    );
};

export default LoginDialog;
