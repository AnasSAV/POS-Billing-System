const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    let mainWindow = new BrowserWindow({
        width: 1200, height: 800,
        webPreferences: { nodeIntegration: true }
    });

    mainWindow.loadFile("frontend/index.html");
});
