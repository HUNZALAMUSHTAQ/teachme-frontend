import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userActions } from '../store';

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

export default function Signup() {
  const dispatch = useDispatch();

  const [emailIsValid, setEmailIsValid] = useState(true)
  const [usernameIsValid, setUsernameIsValid] = useState(true)
  const [passwordIsValid, setpasswordIsValid] = useState(true)
  const [password2IsValid, setpassword2IsValid] = useState(true)
  const [descriptionIsValid, setDescriptionIsValid] = useState(true)

  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('Something went wrong')

  // const [formIsValid, setFormIsValid] = useState(false)
  const navigate = useNavigate();
  const [password2, setPassword2] = useState('')
  const [signupData, setSignupData] = useState({
    email: '',
    username: '',
    password: '',
    isTeacher: false,
    description: ''

  });

  function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(signupData)

    if (!validateEmail(signupData.email)) {
      setEmailIsValid(false)
      return
    }
    setEmailIsValid(true)
    if (signupData.username.length < 6) {
      setUsernameIsValid(false)
      return
    }
    setUsernameIsValid(true)
    if (signupData.password.length < 8) {
      setpasswordIsValid(false)
      return
    }
    setpasswordIsValid(true)
    if (password2 !== signupData.password) {
      setpassword2IsValid(false)
      return
    }
    setpassword2IsValid(true)
    if (signupData.description < 15) {
      setDescriptionIsValid(false)
      return
    }
    setDescriptionIsValid(true)

    axios.post('http://localhost:3000/users/register', signupData)
      .then(response => {
        console.log(response.status, response.data)
        // localStorage.setItem('userId', response.data['_id'])
        // localStorage.setItem('isTeacher', response.data.isTeacher)

        const userData = {
          userId: response.data['_id'],
          email: response.data.email,
          username: response.data.username,
          description: response.data.description,
          isTeacher: response.data.isTeacher,
        }
        dispatch(userActions.signinUser(userData))
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
        console.log(errorData.message)
        setErrorText(errorData.message[0])
        console.log('---error---')
      })

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
            Sign up
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
                  required
                  onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type='email'
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!usernameIsValid}
                  helperText={!usernameIsValid && "Enter Correct Username must be above 6"}
                  onChange={e => setSignupData({ ...signupData, username: e.target.value })}
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={e => setSignupData({ ...signupData, password: e.target.value })}
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
                <TextField
                  required
                  fullWidth
                  error={!password2IsValid}
                  helperText={!password2IsValid && "Both password donot match with each other "}
                  onChange={e => setPassword2(e.target.value)}
                  value={password2}
                  name="password2"
                  label="Re-Enter Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!descriptionIsValid}
                  helperText={!descriptionIsValid && "Enter Description Above 15 lines "}
                  onChange={e => setSignupData({ ...signupData, description: e.target.value })}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Tell me About Yourself."
                  type="text"
                  id="description"
                  autoComplete="description"
                />

              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} checked={signupData.isTeacher} onChange={e => setSignupData({ ...signupData, isTeacher: e.target.checked })} />}
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/signin'>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}