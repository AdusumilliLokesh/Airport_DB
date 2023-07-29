import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [planes, setPlanes] = useState([]);
  const itemsPerPage = 5; // Set the number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(planes.length / itemsPerPage);

  // Get the current items to display based on the current page number
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = planes.slice(indexOfFirstItem, indexOfLastItem);

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Change the current page number
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('/architecture') // The proxy is set to 'http://localhost:5000' in package.json
      .then(response => setPlanes(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);
  
  return (
    <div>
    <div>
      <h1>Planes Data</h1>
      <table style={{ borderCollapse: 'collapse', width: 'fit-content' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Model</th>
            <th style={tableHeaderStyle}>Capacity</th>
            <th style={tableHeaderStyle}>Weight</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.map((plane, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{plane.Model}</td>
              <td style={tableCellStyle}>{plane.Capacity}</td>
              <td style={tableCellStyle}>{plane.Weight}</td>
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
  );
}
// Styles for table header cells
const tableHeaderStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left',
  fontWeight: 'bold',
};

// Styles for table cells
const tableCellStyle = {
  border: '1px solid black',
  padding: '8px',
};
export default App;