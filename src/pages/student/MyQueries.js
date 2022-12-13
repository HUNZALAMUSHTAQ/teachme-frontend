

import List from '@mui/material/List';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import StudentQuery from './StudentQuery';
import StudentNavbar from './StudentNavbar';
import { useSelector } from 'react-redux';
import Footer from '../Footer';



const theme = createTheme();

export default function MyQueries() {
    const [allQueries, setAllQueries] = React.useState([])
    // const user = useSelector((state) => state)


    React.useEffect(() => {
        const studentId = localStorage.getItem('userId')
        // const studentId = user.userId
        axios.post('http://localhost:3000/query/studentQueries', {studentId} ).then(response => {
            console.log(response.data)
            setAllQueries(response.data)
        }
        ).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StudentNavbar />
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
                       My Queries 
                        </Typography>

                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                        <List style={{ maxHeight: 600, overflow: 'auto' }} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {allQueries?.map(query => (
                                <StudentQuery
                                    key={query['_id']}
                                    queryTitle={query.queryTitle}
                                    queryDescription={query.queryDescription}
                                    offerPrice={query.offerPrice}
                                    studentId={query.studentId}
                                    id={query['_id']}
                                    studyHour={query.studyHour}
                                    proposals={query.proposals}


                                />
                            ))}
                        </List>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </ThemeProvider>
    );
}