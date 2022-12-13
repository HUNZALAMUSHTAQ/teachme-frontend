import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Logout from '../Logout';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

function TeacherNavbar() {
    const user = useSelector((state) => state)

    return (
        <AppBar position="relative">
            <Toolbar sx={{ justifyContent: 'space-between' }} >
                <Stack flexDirection='row'>
                    <Link to={'/profile'}>
                        <SupervisedUserCircleIcon sx={{ mr: 2 }} />
                    </Link>
                    <Typography>{user?.username}</Typography>
                </Stack>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                    <Link to='/teacher/view-queries' >
                        <Button sx={{ color: '#fff' }}>
                            All Queries
                        </Button>
                    </Link>

                    <Link to='/teacher/all-proposals' >
                        <Button sx={{ color: '#fff' }}>
                            My Proposals
                        </Button>
                    </Link>
                    <Logout />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TeacherNavbar
