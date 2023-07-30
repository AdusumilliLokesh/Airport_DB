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
app.use(express.json()); 

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
app.post('/searchAirplaneByRegistration', async (req, res) => {
  try {
    const { registration_no } = req.body;

    if (!registration_no) {
      return res.status(400).json({ error: 'Registration number is required' });
    }

    const regNumber = Number(registration_no);

    const connection = await pool.getConnection();

    const [airplaneRows] = await connection.query('SELECT * FROM airplane WHERE registration_no = ?;', [regNumber]);

    const [ownsRows] = await connection.query('SELECT * FROM owns WHERE registration_no = ?;', [regNumber]);

    if (airplaneRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Airplane with the provided registration number not found' });
    }

    const airplaneModel = airplaneRows[0].Model;

    const [typeOfPlaneRows] = await connection.query('SELECT * FROM type_of_plane WHERE model = ?;', [airplaneModel]);

    const [worksOnRows] = await connection.query('SELECT * FROM works_on WHERE registration_no = ?;', [regNumber]);

    const essnArray = worksOnRows.map((row) => row.Essn);

    if (essnArray.length === 0) {
      connection.release();
      return res.json({
        airplane: airplaneRows[0],
        owns: ownsRows || [],
        typeOfPlane: typeOfPlaneRows || [],
        employees: [],
        airportApron: [] // Return an empty array since there is no AP_number in airplane data
      });
    }

    const [employeeRows] = await connection.query('SELECT * FROM employee WHERE essn IN (?);', [essnArray]);

    // Get the AP_number from the airplane data
    const apNumber = airplaneRows[0].AP_Number;

    // Query to fetch data from airport_apron based on the AP_number
    const [airportApronRows] = await connection.query('SELECT * FROM airport_apron WHERE AP_number = ?;', [apNumber]);

    connection.release();

    const response = {
      airplane: airplaneRows[0],
      owns: ownsRows || [],
      typeOfPlane: typeOfPlaneRows || [],
      employees: employeeRows,
      airportApron: airportApronRows || []
    };

    res.json(response);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
