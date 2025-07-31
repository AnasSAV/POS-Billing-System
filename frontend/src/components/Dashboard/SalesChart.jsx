import React from 'react';
import { Paper, Box, Typography, Tabs, Tab } from '@mui/material';
import { ResponsiveContainer, AreaChart, BarChart, ComposedChart, Area, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const SalesChart = ({ selectedChart, handleChartChange, analytics }) => {
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

export default SalesChart;
