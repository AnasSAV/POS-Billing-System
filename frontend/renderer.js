const baseUrl = "http://localhost:3000/api";

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // Save token locally
            alert("Login Successful!");
        } else {
            alert(`Login Failed: ${data.error}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
    }
}

async function fetchProducts() {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
        alert("You need to log in first!");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/products-get`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const products = await response.json();

        let productHTML = '<ul>';
        products.forEach(product => {
            productHTML += `<li>${product.name} - $${product.price}</li>`;
        });
        productHTML += '</ul>';

        document.getElementById("productList").innerHTML = productHTML;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
