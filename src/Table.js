import React, { useState } from 'react';
import './Spreadsheet.css'; // Import the CSS file


function getByTitle(col, row)
{
  if (row!=0) return row + ", " + col
  var Title = ""
  switch(col) {
    case 0:
      return "TransectionsID"
    case 1:
      return "namn"
    case 2:
      return "värde"
    default: return "osv"
  }
}

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
    console.log(data)
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
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                >
                  <div
                    type="text"
                    class={"row"+rowIndex}
                    value={cell}
                    onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                    style={{borderw: 2 + 'px'}}
                  >{getByTitle(colIndex, rowIndex)}</div>
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
      <button onClick={addColumn}>Add Column</button>
    </div>
  );
};

export default Spreadsheet;
