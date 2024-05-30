import React, { useState } from 'react';
import * as XLSX from 'xlsx';
// import './App.css';

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const renderTable = () => {
    if (data.length === 0) return null;

    const headers = Object.keys(data[0]);
    console.log("footer", headers);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-red-600">
          <thead >
            <tr>
              {headers?.map((header, index) => (
                <th key={index} className="px-4 py-2 border-b border-red-600 bg-gray-100 text-left text-gray-700">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className='border-red-600'>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex} >
                {headers?.map((header, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-b border-red-600">{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 pt-10">
      <h1 className="text-2xl font-bold mt-5 mb-10 text-violet-900">Excel Sheet data Render Application</h1>
      <input
        type="file"
        onChange={handleUpload}
        accept=".xlsx, .xls"
        className="outline outline-violet-900 mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
      />
      {renderTable()}
    </div>
  );
}

export default App;
