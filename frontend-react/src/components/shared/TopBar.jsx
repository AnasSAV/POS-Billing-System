import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    POS System
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                    Logout
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;