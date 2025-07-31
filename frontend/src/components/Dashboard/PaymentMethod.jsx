import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PaymentMethod = ({ analytics }) => {
    return (
        <Paper sx={{ p: 2, height: 380, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                Payment Methods
            </Typography>
            <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                    <Pie
                        data={analytics.paymentMethods}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {analytics.paymentMethods.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 1 }}>
                {analytics.paymentMethods.map((method, index) => (
                    <Box key={method.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: CHART_COLORS[index],
                                    mr: 1,
                                    borderRadius: '50%'
                                }}
                            />
                            <Typography variant="body2" fontSize="0.75rem">{method.name}</Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="bold" fontSize="0.75rem">
                            ${method.amount.toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default PaymentMethod;
