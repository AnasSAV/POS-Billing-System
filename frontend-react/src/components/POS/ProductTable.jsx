import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductTable = ({ items, setItems, updateTotals }) => {
    const handleQuantityChange = (index, newQuantity) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: Math.max(1, newQuantity) };
            }
            return item;
        });
        setItems(updatedItems);
        updateTotals(updatedItems);
    };

    const handleManualQuantity = (index, event) => {
        const value = parseInt(event.target.value) || 1;
        handleQuantityChange(index, value);
    };

    return (
        <TableContainer component={Paper} sx={{ flex: 1, margin: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="center">
                                <IconButton 
                                    size="small"
                                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleManualQuantity(index, e)}
                                    sx={{ 
                                        width: '60px',
                                        mx: 1,
                                        '& input': { textAlign: 'center' }
                                    }}
                                />
                                <IconButton 
                                    size="small"
                                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">
                                ${item.price.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                                ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;