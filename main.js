const { app, BrowserWindow } = require('electron');
const { checkExcelFile } = require('./excelManager');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('src/index.html');
    win.webContents.openDevTools(); // Uncomment for debugging
}

const { ipcMain } = require('electron');
const { readExcelColumnsAB } = require('./excelManager');

ipcMain.handle('get-excel-data', async (event) => {
    return readExcelColumnsAB(); // Assumes this function returns { columnA, columnB }
});


app.whenReady().then(() => {
    createWindow();
    checkExcelFile();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
