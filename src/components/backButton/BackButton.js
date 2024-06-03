import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from 'react-router-dom';


export default function BackButton({ title }) {
    const navigate = useNavigate();
    return (
        <Box display={'flex'} flexDirection={'row'} gap={2}>
            <IconButton onClick={() => navigate(-1)} aria-label="back">
                <ArrowBackIosNewIcon color="#000" />
            </IconButton>
            <Typography variant="h4">
                {title}
            </Typography>
        </Box>
    )
}
