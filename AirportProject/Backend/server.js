const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    port: 3306,
    database: "airport_db"
};

// Create a connection pool to the MySQL database
const pool = mysql.createPool(dbConfig);

// Enable CORS for all origins (*)
app.use(cors());

// Define a route to get architecture data
app.get('/architecture', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
