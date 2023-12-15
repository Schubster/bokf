import React, { useState } from 'react';

const InsertButton = () => {
  const [transaktion, setTransaktion] = useState('');
  const [konto, setKonto] = useState('');
  const [summa, setSumma] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const choices = ['1930 Bankkonto', '2610 Utgående moms', '2640 ingående moms', '3040 fösäljning', '4010 Inköp'];
  const kontoIdMap = {
    '1930 Bankkonto': '0',
    '2610 Utgående moms': 1,
    '2640 ingående moms': 2,
    '3040 fösäljning': 3,
    '4010 Inköp': 4
  };

  const handleInsertData = async () => {
    try {
      if (!transaktion || !konto || !summa) {
        setStatus('Please fill in all fields');
        return;
      }
  
      setLoading(true);
      console.log("konto:" + konto)
      const kontoId = kontoIdMap[konto];
      console.log("koasdokasd:" + kontoId);
      const response = await fetch('http://localhost:3001/api/data/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          transaktion_beskrivning: transaktion,
          kontoRes: konto,
          summa: summa 
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseBody = await response.text();
      console.log(responseBody);
      const result = responseBody ? JSON.parse(responseBody) : null;
  
      setStatus(`Data inserted: ${JSON.stringify(result)}`);
      console.log(result);
    } catch (error) {
      console.error('Error inserting data:', error);
      setStatus('Error inserting data');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <input
        name='transaktion'
        type='text'
        value={transaktion}
        onChange={(e) => setTransaktion(e.target.value)}
      />
{choices.map((choice, index) => (
  <label key={index}>
          {console.log()}

    <input
      type="radio"
      name="konto"
      value={kontoIdMap[choice]}
      checked={konto === kontoIdMap[choice]}
      onChange={(e) => setKonto(parseInt(e.target.value, 10))}  
    />
    {choice}
  </label>
))}

      <input
        name='summa'
        type='number'
        value={summa}
        onChange={(e) => setSumma(e.target.value)}
      />
      <button onClick={handleInsertData} disabled={loading}>
        {loading ? 'Inserting...' : 'Insert Data'}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default InsertButton;