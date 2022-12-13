import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
// 
function Query({ offerPrice, queryDescription, queryTitle, studentId, studyHour, id, proposals }) {
    console.log(queryTitle)
    return (
        <div>
            <ListItem sx={{ marginBottom: 1 }} alignItems="flex-start">
                <ListItemText
                    primary={
                        <>
                            <Link to={`/teacher/view-queries/${id}`}>
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="space-between"
                                >
                                    {queryTitle}
                                    <Chip label={offerPrice + 'rs'} color="success" />
                                </Stack>
                            </Link>
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
                                {studyHour} Hours  - {` `}
                            </Typography>


                            {queryDescription}
                            <div>
                                <small>
                                    {proposals.length} proposals
                                </small>
                            </div>
                        </React.Fragment>

                    }
                />
            </ListItem>
        </div>
    )
}

export default Query
