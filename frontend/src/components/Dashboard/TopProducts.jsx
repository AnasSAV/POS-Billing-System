import React from 'react';
import { Paper, Typography, Box, Card, CardContent } from '@mui/material';

const TopProducts = ({ products }) => {
    return (
        <Paper sx={{ p: 3, height: 350, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Top Selling Products
            </Typography>
            <Box sx={{ maxHeight: 280, overflow: 'auto' }}>
                {products.map((product) => (
                    <Card key={product.name} sx={{ mb: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                        <CardContent sx={{ py: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.quantity} units sold
                                    </Typography>
                                </Box>
                                <Typography variant="h6" color="primary" fontWeight="bold">
                                    ${product.revenue.toFixed(2)}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Paper>
    );
};

export default TopProducts;
