const { app, BrowserWindow } = require('electron');
const path = require("path");

function createWindow() {
    let win = new BrowserWindow({
        width: 1000,
        height: 1000,
        minHeight: 800,
        minWidth: 800,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, "assets", "icon.png"),
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
