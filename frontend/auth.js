async function login() {
    console.log("Login button pressed");
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
            localStorage.setItem("token", data.token);
            console.log("✅ Login Successful! Sending IPC message...");
            console.log("window.api availability:", window.api); // Debug log
            if (!window.api) {
                console.error("❌ IPC bridge not found! window.api is undefined");
                return;
            }
            window.api.send("login-success");
        } else {
            document.getElementById("loginMessage").innerText = "❌ Login Failed: " + data.error;
        }
    } catch (error) {
        console.error("🚨 Login Error:", error);
    }
}
