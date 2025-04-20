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