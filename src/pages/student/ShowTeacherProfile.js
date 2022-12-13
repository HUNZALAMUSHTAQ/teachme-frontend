import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/system';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StudentNavbar from './StudentNavbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const theme = createTheme();

export default function ShowTeacherProfile() {
    const [user, setUser] = React.useState({})
    let { id } = useParams();
    React.useState(() => {
        axios.get(`http://localhost:3000/users/${id}`).then(
            response => {
                setUser(response.data)
                console.log(response.data)
            }
        ).catch(error => {
            console.log(error)
        })
    }, [])
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

                    <Box component="form" noValidate sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Stack flex={true} flexDirection='column' alignItems='center' >
                                            <Avatar sx={{ m: 1, bgcolor: (user.isTeacher) ? 'blue' : 'pink' }}>
                                                {user.isTeacher ?
                                                    <AdminPanelSettingsIcon /> :
                                                    <AccountCircleIcon />
                                                }
                                            </Avatar>
                                            <Typography mb={5} component="h1" variant="h5">
                                                User Profile
                                            </Typography>
                                        </Stack>
                                        <Typography sx={{ fontSize: 14, marginBottom: 0, paddingBottom: 0 }} color="text.secondary" gutterBottom>
                                            Email
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {user.email}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, marginBottom: 0, paddingBottom: 0 }} color="text.secondary" gutterBottom>
                                            Username
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {user.username}
                                        </Typography>

                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Description
                                        </Typography>
                                        <Typography variant="body2">
                                            {user.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Proffessor</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}