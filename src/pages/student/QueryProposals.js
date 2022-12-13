import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';


export default function AllProposals({ count, teacherId, proposalDescription, proposalPrice, isAccepted, id }) {
    
    console.log(proposalDescription)
    return (
        
        <div style={{height: 'auto', margin: 1  }} >
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Proposal {count + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        price: {proposalPrice}
                    </Typography>
                    <Typography>
                        Description {proposalDescription}
                    </Typography>
                    <Typography>
                        <Link to={`/profile/teacher/${teacherId}`}>
                            View Teacher Profile
                        </Link>
                    </Typography>
                    <Stack flexDirection='row-reverse'>
                        <Button variant="contained" disabled={isAccepted} color="success">
                            {isAccepted ? 'Accepted' : 'Accept'}
                        </Button>
                    </Stack>

                </AccordionDetails>
            </Accordion>

        </div>
    );
}