const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const port = 5000;

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "airport_dbms"
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

    const [airplaneRows] = await connection.query('SELECT * FROM airplane WHERE Registration_Number = ?;', [regNumber]);

    const [ownsRows] = await connection.query('SELECT * FROM owns WHERE Registration_number = ?;', [regNumber]);

    if (airplaneRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Airplane with the provided registration number not found' });
    }

    const airplaneModel = airplaneRows[0].Model;

    const [typeOfPlaneRows] = await connection.query('SELECT * FROM type_of_plane WHERE model = ?;', [airplaneModel]);

    const [worksOnRows] = await connection.query('SELECT * FROM works_on WHERE Registration_number = ?;', [regNumber]);

    const empArray = worksOnRows.map((row) => row.Employee_ID);

    if (empArray.length === 0) {
      connection.release();
      return res.json({
        airplane: airplaneRows|| [],
        owns: ownsRows || [],
        typeOfPlane: typeOfPlaneRows || [],
        employees: [],
        airportApron: [] 
      });
    }

    const [employeeRows] = await connection.query('SELECT * FROM employee WHERE Employee_Id IN (?);', [empArray]);

    const apNumber = airplaneRows[0].Apron_number;

    const [airportApronRows] = await connection.query('SELECT * FROM airport_apron WHERE Apron_number = ?;', [apNumber]);

    connection.release();

    const response = {
      airplane: airplaneRows || [],
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


app.put('/airplanes/:registration_number', async (req, res) => {
  const registrationNumber = req.params.registration_number;
  const { Model, Manufacturer, Apron_number, Maintenance_Status, Last_Maintenance_Date } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE airplane SET Model = ?, Manufacturer = ?, Apron_number = ?, Maintenance_Status = ?, Last_Maintenance_Date = ? WHERE Registration_number = ?`;

    const values = [Model, Manufacturer, Apron_number, Maintenance_Status, Last_Maintenance_Date, registrationNumber];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Airplane updated successfully.' });
  } catch (err) {
    console.error('Error updating airplane:', err);
    res.status(500).json({ error: 'An error occurred while updating the airplane.' });
  }
});

app.put('/airplanes/:registration_number', async (req, res) => {
  const registrationNumber = req.params.registration_number;
  const { Model, Manufacturer, Apron_number, Maintenance_Status, Last_Maintenance_Date } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE airplane SET Model = ?, Manufacturer = ?, Apron_number = ?, Maintenance_Status = ?, Last_Maintenance_Date = ? WHERE Registration_number = ?`;

    const values = [Model, Manufacturer, Apron_number, Maintenance_Status, Last_Maintenance_Date, registrationNumber];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Airplane updated successfully.' });
  } catch (err) {
    console.error('Error updating airplane:', err);
    res.status(500).json({ error: 'An error occurred while updating the airplane.' });
  }
});

app.put('/airport_aprons/:apron_number', async (req, res) => {
  const apronNumber = req.params.apron_number;
  const { Apron_type, Aircraft_Capacity, Apron_status } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE airport_apron SET Apron_type = ?, Aircraft_Capacity = ?, Apron_status = ? WHERE Apron_number = ?`;

    const values = [Apron_type, Aircraft_Capacity, Apron_status, apronNumber];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Airport apron updated successfully.' });
  } catch (err) {
    console.error('Error updating airport apron:', err);
    res.status(500).json({ error: 'An error occurred while updating the airport apron.' });
  }
});

app.put('/type_of_planes/:model', async (req, res) => {
  const model = req.params.model;
  const { Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE type_of_plane 
                   SET Fuel_Capacity = ?, 
                       Maximum_Range = ?, 
                       Weight = ?, 
                       Seating_Capacity = ? 
                   WHERE Model = ?`;

    const values = [Fuel_Capacity, Maximum_Range, Weight, Seating_Capacity, model];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Type of plane updated successfully.' });
  } catch (err) {
    console.error('Error updating type of plane:', err);
    res.status(500).json({ error: 'An error occurred while updating the type of plane.' });
  }
});

app.put('/owns/:owner_id/:registration_number', async (req, res) => {
  const ownerId = req.params.owner_id;
  const registrationNumber = req.params.registration_number;
  const { Purchase_date } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE owns 
                   SET Purchase_date = ? 
                   WHERE owner_id = ? AND Registration_number = ?`;

    const values = [Purchase_date, ownerId, registrationNumber];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Owns table updated successfully.' });
  } catch (err) {
    console.error('Error updating owns table:', err);
    res.status(500).json({ error: 'An error occurred while updating the owns table.' });
  }
});

app.put('/employees/:employee_id', async (req, res) => {
  const employeeId = req.params.employee_id;
  const {
    First_name,
    Middle_Name,
    Last_name, 
    Salary,
    Sex,
    Shift,
    Address,
    Role,
  } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `UPDATE employee 
                   SET First_name = ?,
                       Middle_Name = ?,
                       Last_name = ?,
                       Salary = ?,
                       Sex = ?,
                       Shift = ?,
                       Address = ?,
                       Role = ?
                   WHERE Employee_ID = ?`;

    const values = [
      First_name,
      Middle_Name,
      Last_name,
      Salary,
      Sex,
      Shift,
      Address,
      Role,
      employeeId,
    ];

    await connection.query(query, values);
    connection.release();
    res.status(200).json({ message: 'Employee updated successfully.' });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'An error occurred while updating the employee.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
