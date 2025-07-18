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
    TableRow,
    Tabs,
    Tab
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
    Area,
    ComposedChart
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

// Combined Chart Component - Defined outside the main component to avoid hook issues
const CombinedChartView = ({ selectedChart, handleChartChange, analytics }) => {
    // Chart titles
    const chartTitles = ['Daily Revenue Trend (7 Days)', 'Hourly Transactions', 'Weekly Performance'];
    
    return (
        <Paper sx={{ p: 2, height: 380, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={selectedChart} 
                    onChange={handleChartChange} 
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="chart selector tabs"
                >
                    <Tab label="Daily Revenue" />
                    <Tab label="Hourly Transactions" />
                    <Tab label="Weekly Performance" />
                </Tabs>
            </Box>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '0.95rem', mt: 2 }}>
                {chartTitles[selectedChart]}
            </Typography>
            
            <Box sx={{ height: 280 }}>
                {/* Daily Revenue Chart */}
                {selectedChart === 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analytics.dailyRevenue}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{fontSize: 10}} />
                            <YAxis tick={{fontSize: 10}} />
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
                )}
                
                {/* Hourly Transactions Chart */}
                {selectedChart === 1 && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics.transactionTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" tick={{fontSize: 10}} />
                            <YAxis tick={{fontSize: 10}} />
                            <Tooltip />
                            <Bar dataKey="count" name="Transactions" fill="#00C49F" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                
                {/* Weekly Performance Chart */}
                {selectedChart === 2 && (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={analytics.weeklyPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" tick={{fontSize: 10}} />
                            <YAxis yAxisId="left" tick={{fontSize: 10}} />
                            <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10}} />
                            <Tooltip />
                            <Bar yAxisId="left" dataKey="transactions" name="Transactions" fill="#8884d8" />
                            <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#ff7300" strokeWidth={2} />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Paper>
    );
};

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
    // Move this hook up here:
    const [selectedChart, setSelectedChart] = useState(0);

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

    // Handle chart type change
    const handleChartChange = (event, newValue) => {
        setSelectedChart(newValue);
    };

    // Metric Card Component
    const MetricCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => (
        <Card sx={{ 
            height: '100%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.875rem' }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
                            {value}
                        </Typography>
                        {trend && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <TopBar />
            <Container maxWidth="xl" sx={{ mt: 3, mb: 4, flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
                    POS Billing Analytics
                </Typography>
                
                <Grid container spacing={3}>
                    {/* Key Metrics Row */}
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
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
                        </Grid>
                    </Grid>

                    {/* Charts Row - Combined chart and Payment Methods */}
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {/* Combined Chart Component - Takes 3/4 of space */}
                            <Grid item xs={12} md={9}>
                                <CombinedChartView 
                                    selectedChart={selectedChart}
                                    handleChartChange={handleChartChange}
                                    analytics={analytics}
                                />
                            </Grid>
                            
                            {/* Payment Methods Distribution */}
                            <Grid item xs={12} md={3}>
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
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3, height: 350, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Top Selling Products
                            </Typography>
                            <Box sx={{ maxHeight: 280, overflow: 'auto' }}>
                                {analytics.topSellingProducts.map((product, index) => (
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
                    </Grid>

                    {/* Recent Transactions - Full Width */}
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;