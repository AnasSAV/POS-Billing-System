const baseUrl = "http://localhost:3000/api";

/**
 * Helper function to make API calls with JWT authentication
 */
async function fetchAPI(endpoint, method = "GET", body = null) {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("❌ You need to log in first!");
        return null;
    }

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Server error occurred.");
        }

        return await response.json();
    } catch (error) {
        console.error("🚨 API Error:", error);
        alert(`⚠️ Error: ${error.message}`);
        return null;
    }
}

/**
 * Handles user login and stores JWT token
 */
async function login() {
    console.log("Login button pressed");  // Debugging line
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);  // Store token
            ipcRenderer.send("login-success");  // Notify main process
        } else {
            document.getElementById("loginMessage").innerText = "❌ Login Failed: " + data.error;
        }
    } catch (error) {
        console.error("Login Error:", error);
    }
}

/**
 * Fetches and displays all available products
 */
async function fetchProducts() {
    const products = await fetchAPI("/products-get");

    if (products) {
        let productHTML = '<ul>';
        products.forEach(product => {
            productHTML += `<li>${product.name} - $${product.price}</li>`;
        });
        productHTML += '</ul>';

        document.getElementById("productList").innerHTML = productHTML;
    }
}

/**
 * Live product search - Displays products as the user types
 */
async function searchProduct() {
    const searchQuery = document.getElementById("search").value.trim();
    if (searchQuery.length === 0) return;

    const products = await fetchAPI(`/products-get?search=${searchQuery}`);

    if (products) {
        let productHTML = '';

        products.forEach(product => {
            productHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td>1</td>
                    <td>${product.price}</td>
                    <td>${product.price}</td>
                </tr>`;
        });

        document.getElementById("productTableBody").innerHTML = productHTML || `<tr><td colspan="4" class="no-items">No items</td></tr>`;
    }
}

/**
 * Logout user and redirect to login page
 */
function logout() {
    localStorage.removeItem("token");
    alert("🔒 Logged out successfully!");
    window.location.href = "login.html";
}

/**
 * Checks if the user is logged in; if not, redirects to login page
 */
function checkAuth() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
    }
}

// Run auth check when POS loads
if (window.location.pathname.includes("index.html")) {
    checkAuth();
}

// Placeholder functions for buttons
function newSale() { alert("🛒 New Sale Started!"); }
function voidOrder() { alert("❌ Order Voided!"); }
function saveSale() { alert("💾 Sale Saved!"); }
function applyDiscount() { alert("💲 Discount Applied!"); }
function checkout() { alert("💳 Proceeding to Payment!"); }

function payWithCash() { alert("💵 Paid with Cash!"); }
function payWithCard() { alert("💳 Paid with Card!"); }
function payWithVoucher() { alert("🎟️ Paid with Voucher!"); }
function payWithGiftCard() { alert("🎁 Paid with Gift Card!"); }
