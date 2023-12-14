import React, { useEffect, useState } from 'react';

const SpreadsheetTEST = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Update the fetch URL to match your server endpoint
      const response = await fetch('http://localhost:3001/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  console.log(data);

  return (
    <div>
      {"ewadasdrwin"}
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        data.map(item => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Konto: {item.konto}</p>
            <p>Summa: {item.summa}</p>
            <p>Transaktion: {item.transaktion}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SpreadsheetTEST;
