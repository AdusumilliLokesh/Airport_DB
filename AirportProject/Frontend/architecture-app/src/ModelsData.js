
import './ModelsData.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ModelsData = ({ children }) => {
    const [models, setmodel] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

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

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getAirplane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setmodel(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div>
                <h1>Models Data</h1>
                <table className="modelAlign">
                    <thead>
                        <tr>
                            <th className="modelheader">Registration No</th>
                            <th className="modelheader">Manufacturer</th>
                            <th className="modelheader">Model</th>
                            <th className="modelheader">Apron Number</th>
                            <th className="modelheader">Last_Maintenance_Date</th>
                            <th className="modelheader">Maintenance_Status</th>
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
};

export { ModelsData };
