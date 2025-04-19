import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const Sidebar = () => {
    return (
        <Box sx={{ width: 300, p: 2, borderLeft: '1px solid #ddd' }}>
            <TextField
                fullWidth
                id="search"
                label="Search Products"
                variant="outlined"
                margin="normal"
            />
            <Button 
                fullWidth 
                variant="contained" 
                sx={{ mt: 2 }}
            >
                Search
            </Button>
        </Box>
    );
};

export default Sidebar;