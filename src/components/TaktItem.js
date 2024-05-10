import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function TaktItem() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const excelData = await ipcRenderer.invoke('get-excel-data');
            if (excelData) {
                const transformedData = excelData.columnA.map((milestone, index) => ({
                    milestone,
                    initials: excelData.columnB[index] || ''  // Handle missing initials gracefully
                }));
                setData(transformedData);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="takt-item">
            <table>
                <thead>
                    <tr>
                        <th>Milestone</th>
                        <th>Initials</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.milestone}</td>
                            <td><input type="text" value={item.initials} onChange={() => {}} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaktItem;
