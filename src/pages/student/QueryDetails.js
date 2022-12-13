import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';

import { deepOrange } from '@mui/material/colors';
import AllProposals from './QueryProposals';
import StudentNavbar from './StudentNavbar';
import { CssBaseline } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/system';
// import SubmitProposal from './SubmitProposal';




function QueryDetails() {
    const queryId = useParams().id
    const [queryData, setQueryData] = useState({})
    const [studentData, setStudentData] = useState({})

    const [loading, setLoading] = useState(true)
    const [updProposal, setUpdProposal] = useState(0)

    // const [teacherId, setTeacherId] = useState('')

    // useEffect(() => {
    //     setTeacherId(localStorage.getItem('userId'))

    // }, [])

    useEffect(() => {
        const getData = async () => {
            const qResponse = await axios.post(`http://localhost:3000/proposal/queryProposals`, { queryId })
            const qData = await qResponse.data
            if (qData) {
                setLoading(false)
                console.log(queryData)
            }
            setQueryData(qData)

            const qStudentData = await axios.get(`http://localhost:3000/users/${qData.studentId}`)
            const sData = qStudentData.data
            setStudentData(sData)

        }
        getData()
        console.log(queryData, studentData)
    }, [queryId, updProposal])

    function updateProposal() {
        setUpdProposal(count => count + 1)
    }
    return (
        <div>
            <CssBaseline />
            <StudentNavbar />
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
                <Paper elevation={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <Box>

                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt={studentData.username} sx={{ bgcolor: deepOrange[700] }} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    // <Chip label={studentData.username} variant="outlined" color="primary" />
                                    <Chip avatar={<AlternateEmailSharpIcon />} label={studentData.email} />
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >

                                            {studentData.username}
                                        </Typography>
                                        {`  -  `}
                                        {studentData.description}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </Box>
                    {/* <Divider /> */}

                    <Box
                        sx={{ margin: 3 }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 900 }} gutterBottom>
                            Details
                        </Typography>
                        <Divider />
                        <Typography variant="h5" sx={{ fontWeight: 500, marginTop: 2 }} gutterBottom>
                            {queryData?.queryTitle}
                        </Typography>
                        <Typography variant="p" sx={{}} gutterBottom>
                            {queryData?.queryDescription}
                        </Typography>

                    </Box>
                    <Box sx={{
                        display: 'flex',
                        height: '20%',
                        alignItems: 'center',
                        margin: 2

                    }}
                    >
                        <Paper sx={{ width: '20%', height: '100%', margin: 1 }} elevation={0}>
                            <Box sx={{ width: '100%', height: '100%' }} >
                                <Typography variant='h6' sx={{ fontWeight: 700 }}>{queryData?.offerPrice}{`rs`}</Typography>
                                <Typography>Offering Price</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ width: '20%', height: '100%', margin: 1 }} elevation={0}>
                            <Box sx={{ width: '100%', height: '100%' }} >
                                <Typography variant='h6' sx={{ fontWeight: 700 }}>{queryData?.studyHour}</Typography>
                                <Typography>Study Hour</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ width: '20%', height: '100%', margin: 1 }} elevation={0}>
                            <Box sx={{ width: '100%', height: '100%' }} >
                                <Typography variant='h6' sx={{ fontWeight: 700 }}>{queryData.proposals ? queryData.proposals.length : 0}</Typography>
                                <Typography>Total Proposals</Typography>

                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                {
                    loading && <p>Loading ....</p>
                }
                <Box>
                    <Typography variant='h5' mb={2} sx={{ fontWeight: 700, color: '#e64a19' }} >All Proposals</Typography>
                    {
                        !loading && queryData.proposals?.length <= 0 ?
                            <Stack flexDirection='row'>
                                <ClearIcon color='red' />
                                <Typography>No proposals found</Typography>

                            </Stack>
                            : queryData.proposals?.map((proposal, index) => (
                                <AllProposals
                                    count={index}
                                    key={proposal['_id']}
                                    id={proposal['id']}
                                    teacherId={proposal.teacherId}
                                    isAccepted={proposal.isAccepted}
                                    proposalPrice={proposal.proposalPrice}
                                    proposalDescription={proposal.proposalDescription}
                                />

                            ))
                    }
                </Box>
                {/* <AllProposals /> */}
            </Box>

        </div>
    )
}

export default QueryDetails
