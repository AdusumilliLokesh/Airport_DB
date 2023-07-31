
import './ApronDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiAddLine } from 'react-icons/ri';

const ApronDetails = ({ children }) => {
  const [aprons, setapron] = useState([]);
  const itemsPerPage = 10; // Set the number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [Edit, setEdit] = useState(false);
  const [Add, setAdd] = useState(false);
  // Calculate the total number of pages
  const totalPages = Math.ceil(aprons.length / itemsPerPage);

  // Get the current items to display based on the current page number
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = aprons.slice(indexOfFirstItem, indexOfLastItem);

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [capacity, setcapacity] = useState();
  const [ApronType, setApronType] = useState();
  const [ApronStatus, setApronStatus] = useState();
  const [Apron_number, setApron_number] = useState();
  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log('Edit item with ID:', id);
    setEdit(true);
    setcapacity(id.Aircraft_Capacity);
    setApronType(id.Apron_type);
    setApronStatus(id.Apron_status);
    setApron_number(id.Apron_number);
    setAdd(false);
  };


  const handleAdd = (id) => {

    // Implement your add logic here
    setAdd(true);
    setEdit(false);
    console.log('Add item with ID:', id);
  };
  const useHandleSave = (event) => {
    event.preventDefault();
    const data = {
      "Apron_type": ApronType,
      "Aircraft_Capacity": capacity,
      "Apron_status": ApronStatus
    };
    const apiUrl = 'http://localhost:5000/airport_aprons/' + Apron_number;

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
            axios.get('/getAirportAprons') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setapron(response.data))
            .catch(error => console.error('Error fetching data', error));
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
      "Apron_number": Apron_number,
      "Apron_type": ApronType,
      "Aircraft_Capacity": capacity,
      "Apron_status": ApronStatus
    };
    const apiUrl = 'http://localhost:5000/airport_apron';

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
        axios.get('/getAirportAprons') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setapron(response.data))
      .catch(error => console.error('Error fetching data', error));
        // Do something with the data, if needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      });
    
  };
  const handleChangecapacity = (event) => {
    setcapacity(event.target.value);
  };
  const handleApronType = (event) => {
    setApronType(event.target.value);
  };
  const handleApronStatus = (event) => {
    setApronStatus(event.target.value);
  };
  const handleChangecapacityAdd = (event) => {
    setcapacity(event.target.value);
  };
  const handleApronTypeAdd = (event) => {
    setApronType(event.target.value);
  };
  const handleApronStatusAdd = (event) => {
    setApronStatus(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    event.preventDefault();
  };
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);

  };
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('/getAirportAprons') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setapron(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);


  return (
    <div>
      <div className='align_table'>
        <div>
          <h1>Aprons Data
            <RiAddLine
              onClick={() => handleAdd(123)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />


          </h1>
          <table className="apronAlign">
            <thead>
              <tr>
                <th className="apronheader">Apron Number</th>
                <th className="apronheader">Capacity</th>
                <th className="apronheader">Apron Status</th>
                <th className="apronheader">Apron Type</th>
                <th className="apronheader">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((apron, index) => (
                <tr key={index}>
                  <td className="aproncell">{apron.Apron_number}</td>
                  <td className="aproncell">{apron.Aircraft_Capacity}</td>
                  <td className="aproncell">{apron.Apron_status}</td>
                  <td className="aproncell">{apron.Apron_type}</td>
                  <td className="aproncell">
                    <span>
                      <RiEdit2Line
                        onClick={() =>handleEdit(apron)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                      />
                    </span>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

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
            <div>Edit Apron
              <label>
                Capacity:
                <input type="text" value={capacity} onChange={handleChangecapacity} />
              </label>
            </div>
            <div>
              <label>
                Apron Status:
                <input type="text" value={ApronStatus} onChange={handleApronStatus} />
              </label>
            </div>
            <div>
              <label>

                Apron Type:
                <input type="text" value={ApronType} onChange={handleApronType} />
              </label>
            </div>
            <div>
              <button type="submit" onClick={useHandleSave}>Save</button>
            </div>
          </form>
        ) : null}

        {Add ?
          <form onSubmit={handleSubmitAdd}>
            <div>Add new Apron:
              <label>
                Capacity:
                <input type="text" value={capacity} onChange={handleChangecapacityAdd} />
              </label>
            </div>
            <div>
              <label>
                Apron Status:
                <input type="text" value={ApronStatus} onChange={handleApronStatusAdd} />
              </label>
            </div>
            <div>
              <label>

                Apron Type:
                <input type="text" value={ApronType} onChange={handleApronTypeAdd} />
              </label>
            </div>
            <div><button type="submit" onClick={ useHandleSaveAdd}>Save</button></div>
          </form>
          : null}
      </div>

    </div>
  );
};

export { ApronDetails };
