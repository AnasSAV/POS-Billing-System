import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';
import { LocalAtm, CreditCard } from '@mui/icons-material';

const TransactionTable = ({ transactions }) => {
    return (
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recent Transactions
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Items</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Time</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id} hover>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        {transaction.id}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2" color="primary" fontWeight="bold">
                                        ${transaction.amount.toFixed(2)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip 
                                        label={transaction.items} 
                                        size="small" 
                                        color="default"
                                        sx={{ minWidth: 30 }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="body2">
                                        {transaction.time}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip 
                                        label={transaction.paymentMethod}
                                        size="small"
                                        icon={transaction.paymentMethod === 'Cash' ? <LocalAtm /> : <CreditCard />}
                                        color={transaction.paymentMethod === 'Cash' ? 'success' : 'primary'}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TransactionTable;
