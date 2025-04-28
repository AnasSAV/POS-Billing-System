import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Paper, 
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Alert,
    CircularProgress
} from '@mui/material';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import TopBar from '../shared/TopBar';
import styles from '../styles/Dashboard.module.css';
import { 
    getWeeklyCustomers, 
    getDailyTraffic, 
    getSalesDistribution, 
    getInventoryStatus 
} from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        weeklyCustomers: 0,
        dailyCustomers: [],
        productInventory: [],
        lowStockProducts: [],
        salesData: [],
        customerComments: [
            // Hardcoded comments for now
            {
                id: 1,
                content: 'Great service and fast checkout!',
                date: '2024-04-24',
                customer: 'John Doe'
            },
            {
                id: 2,
                content: 'The products were fresh and well-organized.',
                date: '2024-04-24',
                customer: 'Jane Smith'
            }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('No token found');
                }

                const [
                    weeklyCustomersData,
                    dailyTrafficData,
                    salesDistributionData,
                    inventoryData
                ] = await Promise.all([
                    getWeeklyCustomers(token),
                    getDailyTraffic(token),
                    getSalesDistribution(token),
                    getInventoryStatus(token)
                ]);

                setStats(prevStats => ({
                    ...prevStats,
                    weeklyCustomers: weeklyCustomersData.weeklyCustomers,
                    dailyCustomers: dailyTrafficData.dailyCustomers,
                    salesData: salesDistributionData.salesData,
                    productInventory: inventoryData.productInventory,
                    lowStockProducts: inventoryData.lowStockProducts
                }));
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        // Refresh data every 5 minutes
        const interval = setInterval(fetchDashboardData, 300000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    // Colors for pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1, overflow: 'auto' }}>
                <Grid container spacing={3}>
                    {/* First Row: Stats and Inventory */}
                    <Grid item xs={12} md={4}>
                        <Paper className={styles.statsCard}>
                            <Typography variant="h6" color="primary">
                                Weekly Customers
                            </Typography>
                            <Typography variant="h3" component="div">
                                {stats.weeklyCustomers}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Past 7 days
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Product Inventory Section */}
                    <Grid item xs={12} md={4}>
                        <Paper className={styles.tablePaper}>
                            <Typography variant="h6" gutterBottom>
                                Product Inventory
                            </Typography>
                            {stats.productInventory.length === 0 ? (
                                <Typography color="textSecondary" sx={{ p: 2 }}>
                                    No products available
                                </Typography>
                            ) : (
                                <List sx={{ width: '100%' }}>
                                    {stats.productInventory.map((product) => (
                                        <ListItem 
                                            key={product.id} 
                                            divider 
                                            sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Box sx={{ flex: 1, minWidth: '150px' }}>
                                                <Typography variant="body1">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    ${product.price.toFixed(2)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography>
                                                    Stock: {product.stock}
                                                </Typography>
                                                {product.stock < 10 && (
                                                    <Alert 
                                                        severity="warning" 
                                                        sx={{ 
                                                            py: 0, 
                                                            px: 1, 
                                                            '& .MuiAlert-message': { 
                                                                p: 0 
                                                            } 
                                                        }}
                                                    >
                                                        Low
                                                    </Alert>
                                                )}
                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper className={styles.alertPaper}>
                            <Typography variant="h6" gutterBottom color="error">
                                Low Stock Products
                            </Typography>
                            <List>
                                {stats.lowStockProducts.map((product) => (
                                    <ListItem key={product.id}>
                                        <Alert severity="error" sx={{ width: '100%' }}>
                                            {product.name} - Only {product.stock} left
                                        </Alert>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Second Row: Charts */}
                    <Grid item xs={12} md={4}>
                        <Paper className={styles.chartPaper}>
                            <Typography variant="h6" gutterBottom>
                                Sales Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={stats.salesData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {stats.salesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper className={styles.chartPaper}>
                            <Typography variant="h6" gutterBottom>
                                Daily Customer Traffic
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={stats.dailyCustomers}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line 
                                        type="monotone" 
                                        dataKey="count" 
                                        stroke="#8884d8" 
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    {/* Third Row: Comments */}
                    <Grid item xs={12}>
                        <Paper className={styles.commentsPaper}>
                            <Typography variant="h6" gutterBottom>
                                Recent Customer Comments
                            </Typography>
                            <List>
                                {stats.customerComments.map((comment) => (
                                    <ListItem key={comment.id} divider>
                                        <Card sx={{ width: '100%' }}>
                                            <CardContent>
                                                <Typography color="textSecondary" gutterBottom>
                                                    {comment.date}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {comment.content}
                                                </Typography>
                                                <Typography color="textSecondary" sx={{ mt: 1 }}>
                                                    - {comment.customer}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;