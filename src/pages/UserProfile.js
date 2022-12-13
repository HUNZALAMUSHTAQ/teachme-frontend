import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/system';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const theme = createTheme();

export default function UserProfile() {
    const user = useSelector((state) => state)
    // React.useState(()=>{
    //     window.location.reload()
    // }, [])
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

                    <Box component="form" noValidate sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Stack flex={true} flexDirection='column' alignItems='center' >
                                            <Avatar sx={{ m: 1, bgcolor: (!user?.isTeacher)? 'blue': 'pink'}}>
                                                {!user.isTeacher ?
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
                                            {user?.email}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, marginBottom: 0, paddingBottom: 0 }} color="text.secondary" gutterBottom>
                                            Username
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {user?.username}
                                        </Typography>

                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Description
                                        </Typography>
                                        <Typography variant="body2">
                                            {user.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">{!user.isTeacher ? 'Proffessor' : 'Student'}</Button>
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