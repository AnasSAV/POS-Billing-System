import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Paper, 
    Typography,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import {
    TrendingUp,
    AttachMoney,
    Receipt,
    ShoppingCart,
    LocalAtm,
    CreditCard
} from '@mui/icons-material';
import TopBar from '../shared/TopBar';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState({
        // Revenue Analytics
        totalRevenue: 0,
        dailyRevenue: [],
        monthlyRevenue: 0,
        revenueGrowth: 0,
        
        // Transaction Analytics
        totalTransactions: 0,
        averageTransactionValue: 0,
        transactionTrends: [],
        
        // Payment Analytics
        paymentMethods: [],
        
        // Product Analytics
        topSellingProducts: [],
        salesByCategory: [],
        
        // Performance Metrics
        hourlyTransactions: [],
        weeklyPerformance: [],
        
        // Recent transactions
        recentTransactions: []
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [timeRange, setTimeRange] = useState('7d'); // 1d, 7d, 30d

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('No authentication token found');
                }

                // For now, using mock data until backend APIs are implemented
                const mockData = {
                    totalRevenue: 25847.50,
                    dailyRevenue: [
                        { date: '2024-12-12', revenue: 1250.30 },
                        { date: '2024-12-13', revenue: 1890.75 },
                        { date: '2024-12-14', revenue: 2100.50 },
                        { date: '2024-12-15', revenue: 1750.25 },
                        { date: '2024-12-16', revenue: 2250.80 },
                        { date: '2024-12-17', revenue: 1950.40 },
                        { date: '2024-12-18', revenue: 2350.60 }
                    ],
                    monthlyRevenue: 78450.20,
                    revenueGrowth: 12.5,
                    
                    totalTransactions: 1247,
                    averageTransactionValue: 20.73,
                    transactionTrends: [
                        { time: '09:00', count: 15 },
                        { time: '10:00', count: 25 },
                        { time: '11:00', count: 35 },
                        { time: '12:00', count: 50 },
                        { time: '13:00', count: 45 },
                        { time: '14:00', count: 40 },
                        { time: '15:00', count: 35 },
                        { time: '16:00', count: 30 },
                        { time: '17:00', count: 45 },
                        { time: '18:00', count: 25 }
                    ],
                    
                    paymentMethods: [
                        { name: 'Cash', value: 45, amount: 11630.75 },
                        { name: 'Credit Card', value: 35, amount: 9046.63 },
                        { name: 'Debit Card', value: 20, amount: 5169.12 }
                    ],
                    
                    topSellingProducts: [
                        { name: 'Coffee', quantity: 256, revenue: 1024.00 },
                        { name: 'Sandwich', quantity: 189, revenue: 1323.00 },
                        { name: 'Pastry', quantity: 145, revenue: 725.00 },
                        { name: 'Juice', quantity: 132, revenue: 528.00 },
                        { name: 'Salad', quantity: 98, revenue: 882.00 }
                    ],
                    
                    salesByCategory: [
                        { category: 'Beverages', sales: 45, revenue: 2250.00 },
                        { category: 'Food', sales: 35, revenue: 3850.00 },
                        { category: 'Snacks', sales: 20, revenue: 980.00 }
                    ],
                    
                    weeklyPerformance: [
                        { day: 'Mon', transactions: 178, revenue: 3250.50 },
                        { day: 'Tue', transactions: 156, revenue: 2890.75 },
                        { day: 'Wed', transactions: 189, revenue: 3450.25 },
                        { day: 'Thu', transactions: 201, revenue: 3750.80 },
                        { day: 'Fri', transactions: 234, revenue: 4250.40 },
                        { day: 'Sat', transactions: 267, revenue: 4850.60 },
                        { day: 'Sun', transactions: 222, revenue: 3900.20 }
                    ],
                    
                    recentTransactions: [
                        { id: 'TXN001', amount: 25.50, items: 3, time: '10:45 AM', paymentMethod: 'Cash' },
                        { id: 'TXN002', amount: 18.75, items: 2, time: '10:42 AM', paymentMethod: 'Card' },
                        { id: 'TXN003', amount: 32.00, items: 4, time: '10:38 AM', paymentMethod: 'Cash' },
                        { id: 'TXN004', amount: 15.25, items: 1, time: '10:35 AM', paymentMethod: 'Card' },
                        { id: 'TXN005', amount: 42.80, items: 6, time: '10:30 AM', paymentMethod: 'Cash' }
                    ]
                };

                setAnalytics(mockData);
            } catch (error) {
                console.error('Failed to fetch analytics data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
        // Refresh data every 2 minutes for real-time updates
        const interval = setInterval(fetchAnalyticsData, 120000);
        return () => clearInterval(interval);
    }, [timeRange]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ ml: 2 }}>Loading Analytics...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="h6">Error Loading Dashboard</Typography>
                    {error}
                </Alert>
            </Box>
        );
    }

    // Colors for charts
    const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    // Metric Card Component
    const MetricCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => (
        <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                            {value}
                        </Typography>
                        {trend && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2">
                                    {trendValue}% vs last period
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ opacity: 0.8 }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <Container maxWidth="xl" sx={{ mt: 2, mb: 4, flex: 1, overflow: 'auto' }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    POS Billing Analytics
                </Typography>
                
                <Grid container spacing={3}>
                    {/* Key Metrics Row */}
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Total Revenue"
                            value={`$${analytics.totalRevenue.toLocaleString()}`}
                            icon={<AttachMoney sx={{ fontSize: 40 }} />}
                            trend={true}
                            trendValue={analytics.revenueGrowth}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Total Transactions"
                            value={analytics.totalTransactions.toLocaleString()}
                            icon={<Receipt sx={{ fontSize: 40 }} />}
                            trend={true}
                            trendValue={8.2}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Avg Transaction Value"
                            value={`$${analytics.averageTransactionValue.toFixed(2)}`}
                            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
                            trend={true}
                            trendValue={5.7}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <MetricCard
                            title="Monthly Revenue"
                            value={`$${analytics.monthlyRevenue.toLocaleString()}`}
                            icon={<LocalAtm sx={{ fontSize: 40 }} />}
                            trend={true}
                            trendValue={15.3}
                        />
                    </Grid>

                    {/* Revenue Trend Chart */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, height: 400 }}>
                            <Typography variant="h6" gutterBottom>
                                Daily Revenue Trend (Last 7 Days)
                            </Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analytics.dailyRevenue}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="revenue" 
                                        stroke="#8884d8" 
                                        fillOpacity={1} 
                                        fill="url(#colorRevenue)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Payment Methods Distribution */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, height: 400 }}>
                            <Typography variant="h6" gutterBottom>
                                Payment Methods
                            </Typography>
                            <ResponsiveContainer width="100%" height="70%">
                                <PieChart>
                                    <Pie
                                        data={analytics.paymentMethods}
                                        innerRadius={60}
                                        outerRadius={100}
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
                            <Box sx={{ mt: 2 }}>
                                {analytics.paymentMethods.map((method, index) => (
                                    <Box key={method.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    backgroundColor: CHART_COLORS[index],
                                                    mr: 1,
                                                    borderRadius: '50%'
                                                }}
                                            />
                                            <Typography variant="body2">{method.name}</Typography>
                                        </Box>
                                        <Typography variant="body2" fontWeight="bold">
                                            ${method.amount.toLocaleString()}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Hourly Transaction Patterns */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, height: 350 }}>
                            <Typography variant="h6" gutterBottom>
                                Hourly Transaction Patterns
                            </Typography>
                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart data={analytics.transactionTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#00C49F" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Top Selling Products */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, height: 350 }}>
                            <Typography variant="h6" gutterBottom>
                                Top Selling Products
                            </Typography>
                            <Box sx={{ maxHeight: 280, overflow: 'auto' }}>
                                {analytics.topSellingProducts.map((product, index) => (
                                    <Card key={product.name} sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
                                        <CardContent sx={{ py: 2 }}>
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
                    </Grid>

                    {/* Weekly Performance */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, height: 350 }}>
                            <Typography variant="h6" gutterBottom>
                                Weekly Performance
                            </Typography>
                            <ResponsiveContainer width="100%" height="90%">
                                <LineChart data={analytics.weeklyPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Bar yAxisId="left" dataKey="transactions" fill="#8884d8" />
                                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ff7300" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Recent Transactions */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, height: 350 }}>
                            <Typography variant="h6" gutterBottom>
                                Recent Transactions
                            </Typography>
                            <TableContainer sx={{ maxHeight: 280 }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Transaction ID</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="center">Items</TableCell>
                                            <TableCell align="center">Time</TableCell>
                                            <TableCell align="center">Payment</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {analytics.recentTransactions.map((transaction) => (
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
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;