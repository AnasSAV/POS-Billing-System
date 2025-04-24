import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TopBar.module.css';

// Add styled component for logout button
const LogoutButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#d32f2f',
    display: 'inline-block',
    color: 'white',
    fontSize: 'large',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#b71c1c',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-1px)'
    }
}));

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
                <LogoutButton onClick={handleLogout}>
                    Logout
                </LogoutButton>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;