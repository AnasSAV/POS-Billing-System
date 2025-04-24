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
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../styles/ProductTable.module.css';

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

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        updateTotals(updatedItems);
    };

    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell className={styles.centerAlign}>Quantity</TableCell>
                        <TableCell className={styles.rightAlign}>Price</TableCell>
                        <TableCell className={styles.rightAlign}>Total</TableCell>
                        <TableCell className={styles.centerAlign}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className={styles.centerAlign}>
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
                                    className={styles.quantityField}
                                />
                                <IconButton 
                                    size="small"
                                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell className={styles.rightAlign}>
                                ${item.price.toFixed(2)}
                            </TableCell>
                            <TableCell className={styles.rightAlign}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell className={styles.centerAlign}>
                                <IconButton 
                                    color="error"
                                    onClick={() => handleDeleteItem(index)}
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;