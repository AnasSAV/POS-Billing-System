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
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { createTransaction } from '../../services/api';
import styles from '../styles/BottomBar.module.css';

const BottomBar = ({ items, totals, onTransactionComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

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
            console.error('Checkout error:', error);
            // Handle specific out-of-stock error
            if (error.message.includes('check_positive_stock')) {
                setError('Transaction failed: One or more products are out of stock');
            } else {
                setError(error.message || 'Transaction failed');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClearAll = () => {
        onTransactionComplete(); // Reuse the same function to clear everything
    };

    const handleCloseDialog = () => {
        setSuccess(false);
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
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
                <Button 
                    variant="contained" 
                    className={styles.clearButton}
                    onClick={handleClearAll}
                    startIcon={<DeleteSweepIcon />}
                    disabled={items.length === 0}
                >
                    Clear All
                </Button>
                <Button variant="contained" className={styles.actionButton}>F2 - Discount</Button>
                <Button variant="contained" className={styles.actionButton}>Comment</Button>
                <Button variant="contained" className={styles.actionButton}>Cash Drawer</Button>
                {isAdmin && (
                    <Button 
                        variant="contained" 
                        className={styles.dashboardButton}
                        onClick={handleDashboardClick}
                        startIcon={<DashboardIcon />}
                    >
                        Dashboard
                    </Button>
                )}
            </Box>
            <Box className={styles.totalsSection}>
                {error && (
                    <Alert 
                        severity="error" 
                        className={styles.alert}
                        sx={{ 
                            marginBottom: 2,
                            fontWeight: 'bold'
                        }}
                    >
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