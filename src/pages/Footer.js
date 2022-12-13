import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Teach Me
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                A Platform for Teacher and Students 'Hunzala Mushtaq '
            </Typography>
        </Box>
    )
}

export default Footer
