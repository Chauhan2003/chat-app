import React, { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { AccountContext } from '../../context/AccountProvider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const RegisterDialog = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setAccount } = useContext(AccountContext);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleNameChange = (event) => setName(event.target.value);
    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event) => setCPassword(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        try {
            const result = await axios.post(`http://localhost:8000/api/v1/register`, data);
            toast.success(result.data.message);
            navigate('/');
        } catch (err) {
            toast.error(err.response.data.message)
        }
    };

    return (
        <Container sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box p={2} display={'flex'} flexDirection={'column'} width={'400px'} gap={'15px'} border={'1px solid gray'} borderRadius={'4px'}>
                <Typography fontSize={30} textAlign={'center'} fontWeight={600}>Register</Typography>
                <TextField
                    id="outlined-required"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                />
                <TextField
                    id="outlined-required"
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    id="outlined-required"
                    label="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
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
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={cpassword}
                        onChange={handleConfirmPasswordChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                </FormControl>
                <Button variant='contained' sx={{ padding: '8px 0', fontSize: '18px' }} onClick={handleSubmit}>
                    Register
                </Button>
                <Typography>Already have an account? <Link to='/'>Login</Link></Typography>
            </Box>
        </Container>
    )
}

export default RegisterDialog;
