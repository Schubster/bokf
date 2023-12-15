import React, { useState } from 'react';

const InsertButton = () => {
  const [status, setStatus] = useState(null);

  const handleInsertData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value1: 1, value2: 2, value3: 3 }), 
      });

      const result = await response.json();
      setStatus(`Data inserted: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error('Error inserting data:', error);
      setStatus('Error inserting data');
    }
  };

  return (
    <div>
      <button onClick={handleInsertData}>Insert Data</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default InsertButton;