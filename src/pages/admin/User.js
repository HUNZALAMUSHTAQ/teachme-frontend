import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Chip from '@mui/material/Chip';

import Stack from '@mui/material/Stack';
// 
function User({user}) {
    console.log(user)
    return (
        <div>
            <ListItem sx={{ marginBottom: 1 }} alignItems="flex-start">
                <ListItemText
                    primary={
                        <>
                            {/* <Link to={`/teacher/view-queries/${id}`}> */}
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-between"
                                >
                                   {user.username}
                                    <Chip label={user.isTeacher? 'Teacher' : 'Student' } color={user.isTeacher? 'success' : 'warning'} />
                                </Stack>
                            {/* </Link> */}
                        </>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Email - 
                            </Typography>


                            {user.email}
                            <div>
             
                                    Description -  {user.description}

                            </div>
                        </React.Fragment>

                    }
                />
            </ListItem>
        </div>
    )
}

export default User
