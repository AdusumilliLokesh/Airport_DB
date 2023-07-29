
import './OwnerDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const OwnerDetails = ({ children }) => {
    const [owners, setowner] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(owners.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = owners.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setowner(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div>
                <h1>Owners Data</h1>
                <table className="ownerAlign">
                    <thead>
                        <tr>
                            <th className="ownerheader">Owner ID</th>
                            <th className="ownerheader">Registration Number</th>
                            <th className="ownerheader">Purchase Date</th>
                            <th className="ownerheader">Type of Owner</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((owner, index) => (
                            <tr key={index}>
                                <td className="ownercell">{owner.owner_id}</td>
                                <td className="ownercell">{owner.Registration_no}</td>
                                <td className="ownercell">{owner.Purchase_date}</td>
                                <td className="ownercell">{owner.type_of_owner}</td>
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

export { OwnerDetails };
