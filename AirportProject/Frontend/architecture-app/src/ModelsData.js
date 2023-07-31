
import './ModelsData.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const ModelsData = ({ children }) => {
    const [models, setmodel] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);
    // Calculate the total number of pages
    const totalPages = Math.ceil(models.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = models.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [Manufacturer	, setManufacturer	] = useState();
    const[Model,setModel]=useState();
    const[ApronNumber,setApronNumber]=useState();
    const[Last_Maintenance_Date,setLast_Maintenance_Date]=useState();
    const[Maintenance_Status	,setMaintenance_Status	]=useState();
    const[Registration_number,setRegistration_number]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setManufacturer(id.Manufacturer);
        setModel(id.Model);
        setApronNumber(id.Apron_number);
        setLast_Maintenance_Date(id.Last_Maintenance_Date);
        setMaintenance_Status(id.Maintenance_Status);
        setRegistration_number(id.Registration_number);
        setEdit(true);
        setAdd(false);
    };

    const handleDelete = (id,event) => {
        // Implement your delete logic here
        event.preventDefault();
        
        const apiUrl = 'http://localhost:5000/airplanes/' + id.Registration_number;
    
        // Optional: Headers for the request (e.g., if you need to send an authorization token)
        const headers = {
          'Content-Type': 'application/json',
          // Add any other required headers here
        };
       
          // Make the POST request using Axios
          axios.delete(apiUrl, { headers })
            .then((response) => {
              // Process the response data
              console.log('Response data:', response.data);
              if (response.status === 200 && response.data.message === "Airport apron updated successfully.") {
                axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
                .then(response => setmodel(response.data))
                .catch(error => console.error('Error fetching data', error));
                setAdd(false);
    setEdit(false);
                  // Do something with the data, if needed
              }
    
              // Do something with the data, if needed
            })
            .catch((error) => {
              console.error('Error:', error);
              // Handle any errors that occurred during the request
            });
        console.log('Delete item with ID:', id);

    };
    const handleAdd = (id) => {

        // Implement your add logic here
        setAdd(true);
        setEdit(false);
        setManufacturer('');
        setModel('');
        setApronNumber('');
        setLast_Maintenance_Date('');
        setMaintenance_Status('');
        setRegistration_number('');
        console.log('Add item with ID:', id);
    };
    const handleChangeManufacturer	 = (event) => {
        setManufacturer	(event.target.value);
      };
      const handleModel = (event) => {
        setModel(event.target.value);
      };
      const handleApron_number = (event) => {
        setApronNumber(event.target.value);
      };
      const handleLast_Maintenance_Date = (event) => {
        setLast_Maintenance_Date(event.target.value);
      };
      const handleMaintenance_Status = (event) => {
        setMaintenance_Status(event.target.value);
      };

      const handleManufacturerAdd = (event) => {
        setManufacturer(event.target.value);
      };
      const handleModelAdd = (event) => {
        setModel(event.target.value);
      };
      const handleApron_numberAdd = (event) => {
        setApronNumber(event.target.value);
      };
      const handleLast_Maintenance_DateAdd = (event) => {
        setLast_Maintenance_Date(event.target.value);
      };
      const handleMaintenance_StatusAdd = (event) => {
        setMaintenance_Status(event.target.value);
      };
      const handleRegistration_numberAdd = (event) => {
        setRegistration_number(event.target.value);
      };
      const handleSubmit = (event) => {
        //setcapacity(event.target.value);
        
      };
      const handleSubmitAdd = (event) => {
        //setcapacity(event.target.value);
        
      };
      const useHandleSave = (event) => {
        event.preventDefault();
        const data = {
          "Model": Model,
          "Manufacturer": Manufacturer,
          "Apron_number": ApronNumber,
          "Maintenance_Status": Maintenance_Status,
          "Last_Maintenance_Date": Last_Maintenance_Date
        };
        const apiUrl = 'http://localhost:5000/airplanes/' + Registration_number;
    
        // Optional: Headers for the request (e.g., if you need to send an authorization token)
        const headers = {
          'Content-Type': 'application/json',
          // Add any other required headers here
        };
       
          // Make the POST request using Axios
          axios.put(apiUrl, data, { headers })
            .then((response) => {
              // Process the response data
              console.log('Response data:', response.data);
              if (response.status === 200 && response.data.message === "Airport apron updated successfully.") {
                axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
                .then(response => setmodel(response.data))
                .catch(error => console.error('Error fetching data', error));
                setAdd(false);
    setEdit(false);
                  // Do something with the data, if needed
              }
    
              // Do something with the data, if needed
            })
            .catch((error) => {
              console.error('Error:', error);
              // Handle any errors that occurred during the request
            });
        
      };
      const useHandleSaveAdd = (event) => {
        event.preventDefault();
        const data = {
          "Registration_number":Registration_number,
         "Model": Model,
         "Manufacturer": Manufacturer,
         "Apron_number": ApronNumber,
         "Maintenance_Status": Maintenance_Status,
         "Last_Maintenance_Date": Last_Maintenance_Date
       };
        const apiUrl = 'http://localhost:5000/airplanes';
    
        // Optional: Headers for the request (e.g., if you need to send an authorization token)
        const headers = {
          'Content-Type': 'application/json',
          // Add any other required headers here
        };
        
        // Make the POST request using Axios
        axios.post(apiUrl, data, { headers })
          .then((response) => {
            // Process the response data
            console.log('Response data:', response.data);
            axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
          .then(response => setmodel(response.data))
          .catch(error => console.error('Error fetching data', error));
          setAdd(false);
    setEdit(false);
            // Do something with the data, if needed
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle any errors that occurred during the request
          });
        
      };
    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setmodel(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div className='align_table'>
                <h1>Models Data
                <RiAddLine
                            onClick={() => handleAdd(123)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                        /></h1>
                <table className="modelAlign">
                    <thead>
                        <tr>
                            <th className="modelheader">Registration No</th>
                            <th className="modelheader">Manufacturer</th>
                            <th className="modelheader">Model</th>
                            <th className="modelheader">Apron Number</th>
                            <th className="modelheader">Last_Maintenance_Date</th>
                            <th className="modelheader">Maintenance_Status</th>
                            <th className="modelheader">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((model, index) => (
                            <tr key={index}>
                                <td className="modelcell">{model.Registration_number}</td>
                                <td className="modelcell">{model.Manufacturer}</td>
                                <td className="modelcell">{model.Model}</td>
                                <td className="modelcell">{model.Apron_number}</td>
                                <td className="modelcell">{model.Last_Maintenance_Date}</td>
                                <td className="modelcell">{model.Maintenance_Status}</td>
                                <td className="aproncell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(model)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                        </span>
                                        <span>
                                            <RiDeleteBinLine
                                                onClick={(e) => handleDelete(model,e)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </span>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            

            <div>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
            </div>
            <div className='align_form'>
                    {Edit ? (
                        <form onSubmit={handleSubmit}>
                        <div>Edit Model
                        <label>
                        Manufacturer:
                          <input type="text" value={Manufacturer} onChange={handleChangeManufacturer} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Model:
                          <input type="text" value={Model} onChange={handleModel} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Apron_number:
                          <input type="text" value={ApronNumber} onChange={handleApron_number} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Last_Maintenance_Date:
                          <input type="text" value={Last_Maintenance_Date} onChange={handleLast_Maintenance_Date} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Maintenance_Status:
                          <input type="text" value={Maintenance_Status} onChange={handleMaintenance_Status} />
                        </label>
                        </div>
                        <div><button type="submit" onClick={useHandleSave}>Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd}>
                        <div>Add new Model:
                        <label>
                        Manufacturer:
                          <input type="text" value={Manufacturer} onChange={handleManufacturerAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Registration_number:
                          <input type="text" value={Registration_number} onChange={handleRegistration_numberAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Model:
                          <input type="text" value={Model} onChange={handleModelAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Apron_number:
                          <input type="text" value={ApronNumber} onChange={handleApron_numberAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Last_Maintenance_Date:
                          <input type="text" value={Last_Maintenance_Date} onChange={handleLast_Maintenance_DateAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Maintenance_Status:
                          <input type="text" value={Maintenance_Status} onChange={handleMaintenance_StatusAdd} />
                        </label>
                        </div>
                        <div><button type="submit" onClick={ useHandleSaveAdd}>Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { ModelsData };
