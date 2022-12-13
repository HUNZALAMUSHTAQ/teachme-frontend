import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Logout from '../Logout';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';

function StudentNavbar() {
    const user = useSelector((state) => state)

    return (
        <AppBar position="relative">
            <Toolbar sx={{ justifyContent: 'space-between' }} >
                <Stack flexDirection='row'>
                    <Link to={'/profile'}>
                        <AccountCircleIcon sx={{ mr: 2 }} />
                    </Link>
                    <Typography>{user.username}</Typography>
                </Stack>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Link to='/student/view-queries' >
                        <Button sx={{ color: '#fff' }}>
                            My Queries
                        </Button>
                    </Link>

                    <Link to='/student/submit-query' >
                        <Button sx={{ color: '#fff' }}>
                            Publish Query
                        </Button>
                    </Link>
                    <Logout />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default StudentNavbar
