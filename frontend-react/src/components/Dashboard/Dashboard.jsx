import React from 'react';
import { 
    Box, 
    Grid, 
    Paper, 
    Typography, 
    Container 
} from '@mui/material';
import TopBar from '../shared/TopBar';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TopBar showDashboardReturn={true} />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Sales Overview */}
                    <Grid item xs={12} md={8}>
                        <Paper className={styles.paper}>
                            <Typography variant="h6" gutterBottom>
                                Sales Overview
                            </Typography>
                            {/* Add chart component here */}
                        </Paper>
                    </Grid>

                    {/* Recent Transactions */}
                    <Grid item xs={12} md={4}>
                        <Paper className={styles.paper}>
                            <Typography variant="h6" gutterBottom>
                                Recent Transactions
                            </Typography>
                            {/* Add transaction list here */}
                        </Paper>
                    </Grid>

                    {/* Inventory Status */}
                    <Grid item xs={12}>
                        <Paper className={styles.paper}>
                            <Typography variant="h6" gutterBottom>
                                Low Stock Items
                            </Typography>
                            {/* Add inventory table here */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;