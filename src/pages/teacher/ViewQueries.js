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
import Query from './Query';
import axios from 'axios';
import TeacherNavbar from './TeacherNavbar';
import { useSelector } from 'react-redux'
import Footer from '../Footer';

const theme = createTheme();

export default function ViewQueries() {
    const [allQueries, setAllQueries] = React.useState([])
    const user = useSelector((state) => state)
    console.log(user, 'ToolKit')



    React.useEffect(() => {
        axios.get('http://localhost:3000/query/allQueries').then(response => {
            console.log(response.data)
            setAllQueries(response.data)
        }
        ).catch(err => {
            console.log(err)
        })
    }, [])
    const navItems = ['All Queries', 'My Proposals', 'Logout'];
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
                            All Queries
                        </Typography>

                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                        <List style={{ maxHeight: 600, overflow: 'auto' }} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {allQueries?.map(query => (
                                <Query
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