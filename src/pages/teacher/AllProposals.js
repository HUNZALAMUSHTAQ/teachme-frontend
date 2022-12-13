

import List from '@mui/material/List';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Proposal from './Proposal';
import TeacherNavbar from './TeacherNavbar';
import { useSelector } from 'react-redux';
import Footer from '../Footer';



const theme = createTheme();

export default function AllProposals() {
    const [allProposals, setAllProposals] = React.useState([])
    const [teacherId, setSetTeacherId] = React.useState('')
    const user = useSelector((state) => state)

    React.useEffect(() => {
        setSetTeacherId(localStorage.getItem('userId'))
        const id = localStorage.getItem('userId')
        console.log(id)
        axios.post('http://localhost:3000/proposal/teacherProposals', { teacherId: user.userId }).then(response => {
            setAllProposals(response.data)
        }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TeacherNavbar />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Your Proposals
                        </Typography>

                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                        <List style={{ maxHeight: 600, overflow: 'auto' }} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {allProposals.map(proposal => (
                                <Proposal key={proposal['_id']} proposal={proposal} />
                            ))}
                        </List>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}

            <Footer />            {/* End footer */}
        </ThemeProvider>
    );
}