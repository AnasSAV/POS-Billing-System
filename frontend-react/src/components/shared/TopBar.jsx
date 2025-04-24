import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TopBar.module.css';  // Fix the import path

const TopBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={styles.title} variant="h6" component="div">
                    POS Billing System
                </Typography>
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