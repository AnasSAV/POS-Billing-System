const API_BASE_URL = 'http://localhost:5050/api';

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

export const getProducts = async (token) => {
    const response = await fetch(`${API_BASE_URL}/products-get`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};