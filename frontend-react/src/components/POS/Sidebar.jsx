import React, { useState, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Alert,
    Autocomplete,
    CircularProgress,
    Stack 
} from '@mui/material';
import { getProducts } from '../../services/api';

const Sidebar = ({ onProductsFound }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSearch = async (newValue) => {
        try {
            setError('');
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in first');
                return;
            }
            const products = await getProducts(token, newValue);
            setOptions(products);
        } catch (error) {
            console.error('Search error:', error);
            setError(error.message);
            if (error.message === 'Invalid token') {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddProducts = () => {
        if (selectedProducts.length > 0) {
            const productsWithQuantity = selectedProducts.map(product => ({
                ...product,
                quantity: 1
            }));
            onProductsFound(productsWithQuantity);
            setSelectedProducts([]); // Clear selection after adding
        }
    };

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) {
                handleSearch(searchQuery);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <Box sx={{ width: 300, p: 2, borderLeft: '1px solid #ddd' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Stack spacing={2}>
                <Autocomplete
                    multiple
                    fullWidth
                    options={options}
                    getOptionLabel={(option) => option.name}
                    loading={loading}
                    value={selectedProducts}
                    onChange={(_, newValue) => setSelectedProducts(newValue)}
                    onInputChange={(_, newValue) => setSearchQuery(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Products"
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                <Button 
                    fullWidth 
                    variant="contained"
                    onClick={handleAddProducts}
                    disabled={loading || selectedProducts.length === 0}
                >
                    {loading ? 'Searching...' : 'Add Selected Products'}
                </Button>
            </Stack>
        </Box>
    );
};

export default Sidebar;