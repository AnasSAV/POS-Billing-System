import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const BottomBar = ({ totals }) => {
    return (
        <Box sx={{ 
            borderTop: '1px solid #ddd', 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between' 
        }}>
            <Box>
                <Button variant="contained" sx={{ mr: 1 }}>F2 - Discount</Button>
                <Button variant="contained" sx={{ mr: 1 }}>Comment</Button>
                <Button variant="contained" sx={{ mr: 1 }}>Customer</Button>
                <Button variant="contained">Cash Drawer</Button>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography>Subtotal: ${totals.subtotal.toFixed(2)}</Typography>
                <Typography>Tax: ${totals.tax.toFixed(2)}</Typography>
                <Typography variant="h6">Total: ${totals.total.toFixed(2)}</Typography>
            </Box>
        </Box>
    );
};

export default BottomBar;