import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Chip from '@mui/material/Chip';

import Stack from '@mui/material/Stack';
// 
function Proposal({proposal}) {
    console.log(proposal)
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
                                   {proposal.query.queryTitle} 
                                    <Chip label={proposal.proposalPrice + 'rs'} color={proposal.isAccepted? 'success' : 'warning'} />
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
                                Your Description - 
                            </Typography>


                            {proposal.proposalDescription}
                            <div>
                                <small>
                                    Actual Price -  {proposal.query.offerPrice}
                                </small>
                            </div>
                        </React.Fragment>

                    }
                />
            </ListItem>
        </div>
    )
}

export default Proposal
