import React from 'react'
import {Box, Typography, LinearProgress } from '@mui/material';

const ProgressBar = ({ value, label }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Typography variant="body1" gutterBottom>
            {label}
        </Typography>
        <Box width="100%" display="flex" alignItems="center" gap={2}>
            <LinearProgress 
                variant="determinate"
                value={value}
                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2">
                {`${value}%`}
            </Typography>
        </Box>
    </Box>
  )
}

export default ProgressBar