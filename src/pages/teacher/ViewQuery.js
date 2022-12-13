import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import CssBaseline from '@mui/material/CssBaseline';

import { deepOrange } from '@mui/material/colors';
import SubmitProposal from './SubmitProposal';
import TeacherNavbar from './TeacherNavbar';




function ViewQuery() {
    const queryId = useParams().id
    const [queryData, setQueryData] = useState({})
    const [studentData, setStudentData] = useState({})

    const [loading, setLoading] = useState(true)
    const [updProposal, setUpdProposal] = useState(0)

    const [teacherId, setTeacherId] = useState('')

    useEffect(() => {
        setTeacherId(localStorage.getItem('userId'))

    }, [])

    useEffect(() => {
        const getData = async () => {
            const qResponse = await axios.get(`http://localhost:3000/query/${queryId}`)
            const qData = qResponse.data
            setQueryData(qData)

            const qStudentData = await axios.get(`http://localhost:3000/users/${qData.studentId}`)
            const sData = qStudentData.data
            setStudentData(sData)
            if (sData) {
                setLoading(false)
            }
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
            <TeacherNavbar />
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
                        {/* <Box>{queryData?.studyHour}</Box>
                        <Box>{queryData.proposals ? queryData.proposals.length : 0}</Box> */}

                    </Box>
                </Paper>

                <SubmitProposal queryId={queryId} updateProposal={updateProposal} teacherId={teacherId} />
            </Box>

        </div>
    )
}

export default ViewQuery
