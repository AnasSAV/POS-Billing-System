import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert 
} from '@mui/material';
import { createTransaction } from '../../services/api';
import styles from '../styles/BottomBar.module.css';

const BottomBar = ({ items, totals, onTransactionComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('Please login again');
                return;
            }

            const transactionData = {
                items: items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: totals.total,
                payment_type: 'cash'
            };

            await createTransaction(transactionData, token);
            setSuccess(true);
            onTransactionComplete(); // Clear the cart after successful transaction
        } catch (error) {
            setError(error.message);
            console.error('Checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setSuccess(false);
    };

    return (
        <Box className={styles.bottomBar}>
            <Box>
                <Button 
                    variant="contained" 
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                    disabled={loading || items.length === 0}
                >
                    {loading ? <CircularProgress size={24} /> : 'Checkout'}
                </Button>
                <Button variant="contained" className={styles.actionButton}>F2 - Discount</Button>
                <Button variant="contained" className={styles.actionButton}>Comment</Button>
                <Button variant="contained" className={styles.actionButton}>Cash Drawer</Button>
            </Box>
            <Box className={styles.totalsSection}>
                {error && (
                    <Alert severity="error" className={styles.alert}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" className={styles.alert}>
                        Transaction completed successfully!
                    </Alert>
                )}
                <Typography>Subtotal: ${totals.subtotal.toFixed(2)}</Typography>
                <Typography>Tax: ${totals.tax.toFixed(2)}</Typography>
                <Typography className={styles.totalAmount}>
                    Total: ${totals.total.toFixed(2)}
                </Typography>
            </Box>

            <Dialog open={success} onClose={handleCloseDialog}>
                <DialogTitle>Transaction Complete</DialogTitle>
                <DialogContent>
                    Transaction has been processed successfully.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BottomBar;