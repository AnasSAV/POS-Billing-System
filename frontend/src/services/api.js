const API_BASE_URL = 'http://localhost:5050/api'; // Match backend port

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    });
    return response.json();
};

export const getProducts = async (token, search = '') => {
    try {
        const response = await fetch(`${API_BASE_URL}/products-get?search=${search}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            throw new Error('Invalid token');
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch products');
        }

        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const createTransaction = async (transactionData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/transactions-create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });

        if (response.status === 401) {
            throw new Error('Invalid token');
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create transaction');
        }

        return data;
    } catch (error) {
        console.error('Transaction API Error:', error);
        throw error;
    }
};

export const getDashboardStats = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard-stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch dashboard stats');
        }

        return response.json();
    } catch (error) {
        console.error('Dashboard API Error:', error);
        throw error;
    }
};

export const getWeeklyCustomers = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/stats/weekly-customers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch weekly customers');
        return response.json();
    } catch (error) {
        console.error('Weekly customers API Error:', error);
        throw error;
    }
};

export const getDailyTraffic = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/stats/daily-traffic`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch daily traffic');
        return response.json();
    } catch (error) {
        console.error('Daily traffic API Error:', error);
        throw error;
    }
};

export const getSalesDistribution = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/stats/sales-distribution`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch sales distribution');
        return response.json();
    } catch (error) {
        console.error('Sales distribution API Error:', error);
        throw error;
    }
};

export const getInventoryStatus = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/stats/inventory`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch inventory status');
        return response.json();
    } catch (error) {
        console.error('Inventory API Error:', error);
        throw error;
    }
};

// New POS Billing Analytics APIs
export const getBillingAnalytics = async (token, timeRange = '7d') => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/billing?range=${timeRange}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch billing analytics');
        return response.json();
    } catch (error) {
        console.error('Billing analytics API Error:', error);
        throw error;
    }
};

export const getRevenueAnalytics = async (token, timeRange = '7d') => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/revenue?range=${timeRange}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch revenue analytics');
        return response.json();
    } catch (error) {
        console.error('Revenue analytics API Error:', error);
        throw error;
    }
};

export const getTransactionAnalytics = async (token, timeRange = '7d') => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/transactions?range=${timeRange}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch transaction analytics');
        return response.json();
    } catch (error) {
        console.error('Transaction analytics API Error:', error);
        throw error;
    }
};

export const getPaymentMethodAnalytics = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/payment-methods`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch payment method analytics');
        return response.json();
    } catch (error) {
        console.error('Payment method analytics API Error:', error);
        throw error;
    }
};

export const getTopSellingProducts = async (token, limit = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/top-products?limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch top selling products');
        return response.json();
    } catch (error) {
        console.error('Top products analytics API Error:', error);
        throw error;
    }
};

export const getRecentTransactions = async (token, limit = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/recent-transactions?limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch recent transactions');
        return response.json();
    } catch (error) {
        console.error('Recent transactions API Error:', error);
        throw error;
    }
};