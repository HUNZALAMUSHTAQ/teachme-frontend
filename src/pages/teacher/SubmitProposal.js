import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import axios from 'axios';

function SubmitProposal({queryId, teacherId, updateProposal}) {
    const [proposalDescriptionIsValid, setproposalDescriptionIsValid] = useState(true)
    const [proposalPriceIsValid, setProposalPriceIsValid] = useState(true)


    const [proposalDescription, setproposalDescription] = useState("")
    const [proposalPrice, setProposalPrice] = useState(0)
    const [disableButton, setDisableButton] = useState(false)

    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState('Something went wrong')


    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowError(false)


        if (proposalDescription < 15) {
            setproposalDescriptionIsValid(false)
            return
        }
        setproposalDescriptionIsValid(true)
        if (typeof (proposalPrice) === Number) {
            setProposalPriceIsValid(false)
            return
        }
        setProposalPriceIsValid(true)

        const price = Number(proposalPrice)
        const submitProposalData = {
            proposalDescription,
            proposalPrice: price, 
            teacherId,
            queryId
        }

        axios.post('http://localhost:3000/proposal', submitProposalData)
            .then(response => {
                console.log(response.status, response.data)
                updateProposal()
                if(response.status === 201){
                    setproposalDescription('')
                    setProposalPrice(0)
                    setDisableButton(true)
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
    }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 4,
                        width: '100%',
                        height: '60vh',
                    },
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} >

                    <Paper elevation={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box component='div' width={'100%'} >
                            {showError && <Alert severity="error" onClose={() => setShowError(false)}>{errorText}</Alert>}
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 3, marginLeft: 3, justifyContent: 'center', color: '#ee2121' }}>
                            Submit Proposal to the Query
                        </Typography>
                        <FormControl sx={{ m: 4 }} >
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                // error={!proposalPriceIsValid} helperText={!proposalPriceIsValid && "Enter Correct Amount"}


                                id="outlined-adornment-amount"
                                value={proposalPrice}
                                onChange={(e) => setProposalPrice(e.target.value)}
                                startAdornment={<InputAdornment position="start">Rs</InputAdornment>}
                                label="Amount"
                            />
                            {!proposalPriceIsValid && (
                                <FormHelperText error id="accountId-error">
                                    Enter Correct Amount 
                                </FormHelperText>
                            )}
                            <TextField

                                sx={{ marginTop: 3 }}
                                id="outlined-multiline-static"
                                label="Proposal Description"
                                value={proposalDescription}
                                onChange={(e) => setproposalDescription(e.target.value)}
                                multiline
                                rows={4}
                                error={!proposalDescriptionIsValid}
                                helperText={!proposalDescriptionIsValid && "Proposal Must be greater than 15 "}
                            // defaultValue="Default Value"
                            />
                            <Stack direction="row-reverse" spacing={2}>
                                <Button  disabled={disableButton} variant="contained" sx={{ marginTop: 1 }}    type="submit" endIcon={<SendIcon />}>
                                    Send
                                </Button>
                            </Stack>
                        </FormControl>
                    </Paper>
                </Box>

            </Box>
        </>
    )
}

export default SubmitProposal
