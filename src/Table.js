import React, { useState } from 'react';

const Spreadsheet = () => {
  const [data, setData] = useState([
    ['Cell 1'],
  ]);

  const addRow = () => {
    const newData = [...data, Array(data[0].length).fill('')];
    setData(newData);
  };

  const addColumn = () => {
    const newData = data.map((row) => [...row, '']);
    setData(newData);
  };

  const handleCellValueChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const calculateOverallSum = () => {
    return data.reduce((rowSum, row) => {
      return rowSum + row.reduce((colSum, cell) => {
        const cellValue = parseFloat(cell);
        return isNaN(cellValue) ? colSum : colSum + cellValue;
      }, 0);
    }, 0);
  };

  return (
    <div>
      <table>
      <button onClick={addColumn}>Add Column</button>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div>
        <strong>Overall Sum:</strong> {calculateOverallSum()}
      </div>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default Spreadsheet;
