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
import { userActions } from '../store';
import { Stack } from '@mui/system';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const theme = createTheme();

export default function Signin() {
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
        password: '',
        isTeacher: false

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



        axios.post('http://localhost:3000/users/login', signinData)
            .then(response => {
                console.log(response.status, response.data)
                // localStorage.setItem('userId', response.data.id)
                // localStorage.setItem('isTeacher', response.data.isTeacher)
                // localStorage.setItem('username', response.data.username)
                // localStorage.setItem('description', response.data.description)
                // localStorage.setItem('email', response.data.email)


                const userData = {
                    userId: response.data.id,
                    email: response.data.email,
                    username: response.data.username,
                    description: response.data.description,
                    isTeacher: response.data.isTeacher,
                }
                dispatch(userActions.signinUser(userData))
                console.log(user)
                if (response.data.isTeacher) {
                    navigate('/teacher/view-queries')
                } else {
                    navigate('/student/view-queries')
                }
            })
            .catch(error => {
                const errorData = error.response.data
                if (errorData.statusCode == 404) {
                    setShowError(true)
                    setErrorText('No user found')
                }
                setShowError(true)
                setErrorText(errorData.message)
                console.log('---error---')
            })
        // setTimeout(()=> setShowError(false), 3000)

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
                        Sign In
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


                            <Grid item xs={12}>
                                {/* <FormControlLabel
                                    control={<Checkbox checked={signinData.isTeacher} onChange={e => setSigninData({ ...signinData, isTeacher: e.target.checked })} color="primary" />}
                                    label="Are you a teacher ?"
                                /> */}
                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 1 }} checked={signinData.isTeacher} onChange={e => setSigninData({ ...signinData, isTeacher: e.target.checked })} />}
                                    label="are you a teacher?"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container flexDirection='column' alignItems='flex-end' justifyContent="flex-end">
                            <Grid item>
                                <Stack>
                                    <Link to='/signup'>Not have an Account? Signup</Link>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack>
                                    <Link to='/admin/login'>are u a admin? </Link>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider >
    );
}