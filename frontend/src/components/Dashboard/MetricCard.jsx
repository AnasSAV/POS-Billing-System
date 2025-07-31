import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

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

export default MetricCard;
