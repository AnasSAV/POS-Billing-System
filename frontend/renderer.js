const baseUrl = "http://localhost:3000/api/products-get";

async function searchProduct() {
    const searchQuery = document.getElementById("search").value.trim();
    const token = localStorage.getItem("token");

    if (!token) {
        alert("❌ You must be logged in first!");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/products-get?search=${searchQuery}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        const products = await response.json();
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
    } catch (error) {
        console.error("🚨 Error fetching products:", error);
    }
}
