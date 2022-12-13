

import List from '@mui/material/List';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Footer from '../Footer';
import User from './User';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




const theme = createTheme();

export default function AdminDashboard() {
    const [allUsers, setAllUsers] = React.useState([])
    const navigate = useNavigate();

    const adminLogoutHandler = () => {
        localStorage.clear()
        navigate('/signin')
    }
    React.useEffect(() => {
        // const studentId = user.userId
        axios.get('http://localhost:3000/users/all-users').then(response => {
            console.log(response.data)
            setAllUsers(response.data)
        }
        ).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                            All Users
                        </Typography>
                        <Button onClick={adminLogoutHandler} >Logout</Button>

                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                        <List style={{ maxHeight: 600, overflow: 'auto' }} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {allUsers?.map(user => (
                                <User key={user['_id']} user={user} />
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