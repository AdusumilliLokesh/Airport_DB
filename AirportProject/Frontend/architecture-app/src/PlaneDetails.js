
import './PlaneDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PlaneDetails = ({ children }) => {
    const [planes, setPlanes] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
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

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getTypeOfPlane') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setPlanes(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div>
                <h1>Planes Data</h1>
                <table className="planeAlign">
                    <thead>
                        <tr>
                            <th className="planeheader">Model</th>
                            <th className="planeheader">Fuel_Capacity</th>
                            <th className="planeheader">Weight</th>
                            <th className="planeheader">Maximum_Range</th>
                            <th className="planeheader">Seating_Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((plane, index) => (
                            <tr key={index}>
                                <td className="planecell">{plane.Model}</td>
                                <td className="planecell">{plane.Fuel_Capacity}</td>
                                <td className="planecell">{plane.Weight}</td>
                                <td className="planecell">{plane.Maximum_Range}</td>
                                <td className="planecell">{plane.Seating_Capacity}</td>
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

export { PlaneDetails };
