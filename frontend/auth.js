async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = '/dashboard.html'; // Redirect after successful login
        } else {
            document.getElementById("loginMessage").innerText = "❌ Login Failed: " + data.error;
        }
    } catch (error) {
        console.error("🚨 Login Error:", error);
        document.getElementById("loginMessage").innerText = "❌ Server Error: Cannot connect to backend";
    }
}
