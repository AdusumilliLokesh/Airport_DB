const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "airport_db"
};

const pool = mysql.createPool(dbConfig);

app.use(cors());

app.get('/getTypeOfPlane', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('Select * from type_of_plane');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getAirportAprons', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM airport_apron;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getAirportAprons', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM airport_apron;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getAirplane', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM airplane;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getOwner', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM owns;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getEmployee', async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM employee;');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
