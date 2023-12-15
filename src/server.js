const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'linus',
  host: '127.0.0.1',
  database: 'bokforing',
  password: 'password',
  port: 5432,
});

app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cors());


const insertTransactionData = async (transaktion_beskrivning, kontoRes, summa) => {
  try {
    const result1 = await pool.query('INSERT INTO transaktion (beskrivning) VALUES ($1) RETURNING id', [transaktion_beskrivning]);
    const v_transaktion_id = result1.rows[0].id;
    console.log(kontoRes);
    const result2 = await pool.query('INSERT INTO kontering (transaktion, konto, summa) VALUES ($1, $2, $3)', [v_transaktion_id, kontoRes, summa]);

    console.log('Data inserted into the database');
    return result2.rows[0];
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};



// GET endpoint to retrieve data
// GET endpoint to retrieve data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kontering');
    const data = result.rows;
    console.log('Data retrieved from the database:', data);
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/data/konton', async (req, res) => {
  try {
    console.log("kos omak");
    const result = await pool.query('SELECT * FROM konton');
    const data = result.rows;
    console.log('Data retrieved from the database:', data);
    console.log('Query result:', result);
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/api/data/transaktion', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transaktion');
    const data = result.rows;
    console.log('Data retrieved from the database:', data);
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
})

// POST endpoint to insert data
app.post('/api/data/insertData', async (req, res) => {
  try {
    const { transaktion_beskrivning, kontoRes, summa } = req.body;
    console.log(req)

    const insertedData = await insertTransactionData(transaktion_beskrivning, kontoRes, summa);

    console.log('Data inserted into the database:', insertedData);
    res.json(insertedData);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET endpoint to retrieve data
app.post('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM kontering');
    const data = result.rows;
    console.log('Data retrieved from the database:', data);
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
