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

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import PublishIcon from '@mui/icons-material/Publish';
import StudentNavbar from './StudentNavbar';

const theme = createTheme();

export default function SubmitQuery() {

    const [queryTitleIsValid, setQueryTitleIsValid] = useState(true)
    const [amountIsValid, setAmountIsValid] = useState(true)
    const [studyHourIsValid, setStudyHourIsValid] = useState(true)
    const [descriptionIsValid, setDescriptionIsValid] = useState(true)
    const [disabled, setDisabled] = useState(false)

    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState('Something went wrong')

    const navigate = useNavigate();
    const [queryTitle, setQueryTitle] = useState('')
    const [queryDescription, setQueryDescription] = useState('')
    const [offerPrice, setOfferPrice] = useState(0)
    const [studyHour, setStudyHour] = useState(0)



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (queryTitle.length < 10) {
            setQueryTitleIsValid(false)
            return
        }
        setQueryTitleIsValid(true)
        console.log(queryDescription.split(''))
        if (queryDescription.split('').length < 15) {
            setDescriptionIsValid(false)
            return
        }
        setDescriptionIsValid(true)
        if (offerPrice < 0) {
            setAmountIsValid(false)
            return
        }
        setAmountIsValid(true)
        if (studyHour < 0) {
            setStudyHourIsValid(false)
            return
        }
        setStudyHourIsValid(true)

        const userId = localStorage.getItem('userId')

        const queryData = {
            studentId: userId,
            queryTitle,
            queryDescription,
            offerPrice: Number(offerPrice),
            studyHour: Number(studyHour)
        }
        axios.post('http://localhost:3000/query', queryData)
            .then(response => {
                console.log(response.status, response.data)
                if (response.status == 201) {
                    setDisabled(true)
                    navigate('/student/view-queries')
                }
            })
            .catch(error => {
                const errorData = error.response.data
                setShowError(true)
                console.log(errorData.message)
                setErrorText(errorData.message[0])
                console.log('---error---')
            })

    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StudentNavbar />
            <Container component="main" maxWidth="xs">

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PublishIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Submit Query
                    </Typography>
                    <Box component='div' sx={{ mt: 3 }}>
                        {showError && <Alert severity="error" onClose={() => setShowError(false)}>{errorText}</Alert>}
                    </Box>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <TextField
                                    error={!queryTitleIsValid}
                                    helperText={!queryTitleIsValid && "Enter Correct must be greater than 15 chracters "}
                                    required
                                    onChange={e => setQueryTitle(e.target.value)}
                                    fullWidth
                                    id="queryTitle"
                                    label="Query Title"
                                    name="queryTitle"
                                    type='text'
                                    autoComplete="title"
                                // onChange={handleEmailChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={!descriptionIsValid}
                                    helperText={!descriptionIsValid && "Enter Description Above 15 words "}
                                    // onChange={handleDescriptionChange}
                                    onChange={e => setQueryDescription(e.target.value)}

                                    required
                                    fullWidth
                                    id="outlined-multiline-flexible"
                                    label="Query Description"
                                    multiline
                                    rows={4}
                                    name="description"
                                    type="text"
                                    autoComplete="description"
                                />

                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={!amountIsValid}
                                    helperText={!amountIsValid && "Enter Correct Amount Must be Integer "}
                                    required
                                    onChange={e => setOfferPrice(e.target.value)}
                                    fullWidth
                                    id="amount"
                                    label="Query Amount"
                                    name="amount"
                                    type='number'
                                    autoComplete="amount"
                                // onChange={handleEmailChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={!studyHourIsValid}
                                    helperText={!studyHourIsValid && "Enter Correct Study Must be Integer "}
                                    required
                                    onChange={e => setStudyHour(e.target.value)}
                                    fullWidth
                                    id="studyHour"
                                    label="Study Hours"
                                    name="studyHour"
                                    type='number'
                                    autoComplete="studyHour"
                                // onChange={handleEmailChange}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            disabled={disabled}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit Query
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/student/view-queries'>Go Back to Your Queries</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}