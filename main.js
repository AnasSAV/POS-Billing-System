const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    console.log("🔹 Loading Login Page...");
    mainWindow.loadFile(path.join(__dirname, "frontend/login.html"));

    ipcMain.on("login-success", () => {
        console.log("🔹 Received login-success event! Redirecting to POS system...");
        mainWindow.loadFile(path.join(__dirname, "frontend/index.html"));
    });
});
