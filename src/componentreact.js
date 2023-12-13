import React, { useEffect, useState } from 'react';

const SpreadsheetTEST = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Update the fetch URL to match your server endpoint
      const response = await fetch('http://localhost:3000/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div>
      {"wdasdadswww"}
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default SpreadsheetTEST;
