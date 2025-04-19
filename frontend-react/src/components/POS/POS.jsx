import React, { useState } from 'react';
import { Box } from '@mui/material';
import TopBar from '../shared/TopBar';
import ProductTable from './ProductTable';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';

const POS = () => {
    const [items, setItems] = useState([]);
    const [totals, setTotals] = useState({
        subtotal: 0,
        tax: 0,
        total: 0
    });

    const updateTotals = (items) => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        setTotals({
            subtotal,
            tax,
            total: subtotal + tax
        });
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TopBar />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <ProductTable items={items} setItems={setItems} updateTotals={updateTotals} />
                <Sidebar />
            </Box>
            <BottomBar totals={totals} />
        </Box>
    );
};

export default POS;