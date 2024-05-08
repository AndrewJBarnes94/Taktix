const { app, BrowserWindow } = require('electron');
const XLSX = require('xlsx');
const fs = require('fs'); // Node.js File System module for checking file existence

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('src/index.html');
    // win.webContents.openDevTools(); // Uncomment for debugging
}

function createExcelFile() {
    const workbook = XLSX.utils.book_new();
    const data = [
        { Task: 'Gather', Complete: 'True', Initials: 'AJ'},
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const filePath = './output.csv';
    XLSX.writeFile(workbook, filePath);
    console.log(`Excel file created at ${filePath}`);
}

function checkExcelFile(filename) {
    try {
        // Try to read the workbook to check if it's accessible and correctly formatted as an Excel file
        XLSX.readFile(filename);
        return true; // File exists and is a readable Excel file
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return false; // File does not exist or is not a readable Excel file
    }
}

app.whenReady().then(() => {
    createWindow();
    let fileExists = checkExcelFile('./output.xlsx');
    
    if (!fileExists) {
      createExcelFile();
    }
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
