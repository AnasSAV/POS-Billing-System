import React from 'react';
import { Grid } from '@mui/material';
import MetricCard from './MetricCard';
import { AttachMoney, Receipt, ShoppingCart, LocalAtm } from '@mui/icons-material';

const LiveStats = ({ analytics }) => {
    return (
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
    );
};

export default LiveStats;
