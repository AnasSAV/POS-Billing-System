import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TopBar.module.css';

const TopBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box className={styles.titleContainer}>
                    <img 
                        src="/POS_service.png" 
                        alt="POS Service" 
                        className={styles.logo}
                    />
                    <Typography className={styles.title} variant="h6" component="div">
                        POS Billing System
                    </Typography>
                </Box>
                <IconButton 
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;