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
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import TopBar from '../shared/TopBar';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    // Placeholder data
    const [stats] = useState({
        weeklyCustomers: 487,
        dailyCustomers: [
            { date: 'Mon', count: 85 },
            { date: 'Tue', count: 92 },
            { date: 'Wed', count: 75 },
            { date: 'Thu', count: 89 },
            { date: 'Fri', count: 95 },
            { date: 'Sat', count: 112 },
            { date: 'Sun', count: 78 }
        ],
        productInventory: [
            { id: 1, name: 'Orange', stock: 3, price: 0.80 },
            { id: 2, name: 'Apple', stock: 15, price: 0.60 },
            { id: 3, name: 'Banana', stock: 25, price: 0.40 },
            { id: 4, name: 'Grapes', stock: 50, price: 2.00 },
            { id: 5, name: 'Mango', stock: 8, price: 1.50 }
        ],
        lowStockProducts: [
            { id: 1, name: 'Orange', stock: 3 },
            { id: 5, name: 'Mango', stock: 8 }
        ],
        customerComments: [
            { 
                id: 1, 
                customer: 'John Doe',
                date: '2024-04-24',
                content: 'Great service and fast checkout!'
            },
            { 
                id: 2, 
                customer: 'Jane Smith',
                date: '2024-04-24',
                content: 'The products were fresh and well-organized.'
            }
        ],
        salesData: [
            { name: 'Fruits', value: 400 },
            { name: 'Vegetables', value: 300 },
            { name: 'Beverages', value: 200 }
        ]
    });

    // Colors for pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1, overflow: 'auto' }}>
                <Grid container spacing={3}>
                    {/* Weekly Customer Count Card */}
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

                    {/* Sales Distribution */}
                    <Grid item xs={12} md={4}>
                        <Paper className={styles.statsCard}>
                            <Typography variant="h6" gutterBottom>
                                Sales Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={200}>
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

                    {/* Daily Customer Chart */}
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

                    {/* Product Inventory */}
                    <Grid item xs={12} md={6}>
                        <Paper className={styles.tablePaper}>
                            <Typography variant="h6" gutterBottom>
                                Product Inventory
                            </Typography>
                            <List>
                                {stats.productInventory.map((product) => (
                                    <ListItem key={product.id} divider>
                                        <ListItemText 
                                            primary={product.name}
                                            secondary={`Price: $${product.price.toFixed(2)}`}
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography>
                                                Stock: {product.stock}
                                            </Typography>
                                            {product.stock < 10 && (
                                                <Alert severity="warning" sx={{ ml: 2 }}>
                                                    Low Stock
                                                </Alert>
                                            )}
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Low Stock Alert */}
                    <Grid item xs={12} md={6}>
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

                    {/* Customer Comments */}
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