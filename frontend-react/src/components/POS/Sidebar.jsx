import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { getProducts } from '../../services/api';

const Sidebar = ({ onProductsFound }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            setError('');
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in first');
                return;
            }
            console.log('Using token:', token); // Debug log
            const products = await getProducts(token, searchQuery);
            console.log('Products received:', products); // Debug log
            onProductsFound(products);
        } catch (error) {
            console.error('Search error:', error);
            setError(error.message);
            if (error.message === 'Invalid token') {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
    };

    return (
        <Box sx={{ width: 300, p: 2, borderLeft: '1px solid #ddd' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <TextField
                fullWidth
                id="search"
                label="Search Products"
                variant="outlined"
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
                fullWidth 
                variant="contained" 
                sx={{ mt: 2 }}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Box>
    );
};

export default Sidebar;