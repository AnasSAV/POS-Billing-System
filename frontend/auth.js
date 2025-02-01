const { ipcRenderer } = require('electron');

async function login() {
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
            console.log("Sending IPC message: login-success");  // Debugging line
            ipcRenderer.send("login-success");  // Notify main process
        } else {
            document.getElementById("loginMessage").innerText = "❌ Login Failed: " + data.error;
        }
    } catch (error) {
        console.error("Login Error:", error);
    }
}