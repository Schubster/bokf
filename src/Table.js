import React, { useState, useEffect } from 'react';
import './Spreadsheet.css'; // Import the CSS file
import { v4 as uuidv4 } from 'uuid';


function getByTitle(col, row)
{
  if (row!=0) return row + ", " + col
  return titleArr[col] ?? "like idk"
}
function exists(obj, val){
  return Object.values(obj).includes(val)
}
function printRow(row){
  console.log(row)
  if(true){
    console.log("kos")
    return(row.map(element => (
      <td>{element}</td>
    )))
      
  }
  
}
function printTitle(){
  return "kos"
}

const titleArr = ["id", " transaktionsnummer", "belopp", "beskrivning", "datum"]

// const SpreadsheetTEST = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Update the fetch URL to match your server endpoint
//       const response = await fetch('http://localhost:3001/api/data');
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data', error);
//     }
//   };
// }

const Spreadsheet = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Update the fetch URL to match your server endpoint
      const response = await fetch('http://localhost:3001/api/data');
      const jsonData = await response.json();
      setData(jsonData); // Make sure jsonData is an array
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... rest of your code

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

  // const calculateOverallSum = () => {
  //   return data.reduce((rowSum, row) => {
  //     return rowSum + row.reduce((colSum, cell) => {
  //       const cellValue = parseFloat(cell);
  //       return isNaN(cellValue) ? colSum : colSum + cellValue;
  //     }, 0);
  //   }, 0);
  // };

 

  return (
    <><div className='tableDiv'>
      <table border={1} frame={"hsides"} rules={"rows"}>
        <tbody>
          {console.log("data:" + data)}
          <tr>
          {Object.getOwnPropertyNames(data[0]).map(title => (
            <td>{title}</td>
          ))}
          </tr>
          {data.length === 0 ? (<p>No data available</p>) : (data.map(row =>(

            <tr>
              {row === 0 ? printTitle() : printRow(Object.values(row))}
            </tr>
            
          )))}
          
        </tbody>
      </table>
      </div>
      <div>
      <hr />
      {
      data.map(item => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Konto: {item.konto}</p>
            <p>Summa: {item.summa}</p>
            <p>Transaktion: {item.transaktion}</p>
          </div>
        ))}
      <div>
        {/* <strong>Overall Sum:</strong> {calculateOverallSum()} */}
      </div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
    </div>
    </>
  );
};

export default Spreadsheet;
