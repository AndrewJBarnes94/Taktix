const XLSX = require('xlsx');

let filename = './takt.xlsx';

function checkExcelFile() {
    try {
        XLSX.readFile(filename);
        console.log("Excel file exists and is readable.");
        return true;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return false;
    }
}

function readExcelColumnsAB() {
    try {
        const workbook = XLSX.readFile(filename);
        console.log("Excel file exists and is readable.");

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const columnA = [];
        const columnB = [];
        
        for (let row = 1; sheet['A' + row] || sheet['B' + row]; row++) {
            if (sheet['A' + row]) {
                columnA.push(sheet['A' + row].v);
            } else {
                columnA.push(null);
            }
            if (sheet['B' + row]) {
                columnB.push(sheet['B' + row].v);
            } else {
                columnB.push(null);
            }
        }

        console.log('Column A:', columnA);
        console.log('Column B:', columnB);
        return { columnA, columnB };
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return false;
    }
}

function createExcelFile(filePath) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
        { Test: "test1", }
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filePath);
    console.log(`Excel file created at ${filePath}`);
}

module.exports = { checkExcelFile, createExcelFile, readExcelColumnsAB };
