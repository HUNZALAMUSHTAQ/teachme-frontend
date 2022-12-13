import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'


import { Link, useNavigate } from "react-router-dom";
const theme = createTheme();

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state)
    const [emailIsValid, setEmailIsValid] = useState(true)
    const [passwordIsValid, setpasswordIsValid] = useState(true)

    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState('Something went wrong')
    console.log(user)




    const [signinData, setSigninData] = useState({
        email: '',
        password: ''

    });

    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowError(false)

        console.log(signinData)

        if (!validateEmail(signinData.email)) {
            setEmailIsValid(false)
            return
        }
        setEmailIsValid(true)
        if (signinData.password.length < 8) {
            setpasswordIsValid(false)
            return
        }
        setpasswordIsValid(true)

        if(signinData.email === 'admin@gmail.com' && signinData.password == '12345678'){
            localStorage.clear()
            navigate('/admin/dashboard')
        }else{
            setShowError(true)
            setErrorText('Wrong Credentials ')
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admin Login
                    </Typography>
                    <Box component='div' sx={{ mt: 3 }}>
                        {showError && <Alert severity="error" onClose={() => setShowError(false)}>{errorText}</Alert>}

                    </Box>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={!emailIsValid}
                                    helperText={!emailIsValid && "Enter Correct Email"}
                                    // onFocus={checkEmailIsValid}
                                    required
                                    onChange={e => setSigninData({ ...signinData, email: e.target.value })}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type='email'
                                    autoComplete="email"
                                // onChange={handleEmailChange}
                                />
                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    // onChange={handlePasswordChange}
                                    onChange={e => setSigninData({ ...signinData, password: e.target.value })}
                                    error={!passwordIsValid}
                                    helperText={!passwordIsValid && "Enter Correct Password must Must be above 6 characters"}
                                    name="password1"
                                    label="Password"
                                    type="password"
                                    id="password1"
                                    autoComplete="new-password"
                                />
                            </Grid>



                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Admin Login
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}