
import './ApronSearch.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const ApronSearch = ({res}) => {
    
    const [aprons, setapron] = useState([]);
    useEffect(() => {
        setapron(res.data.airportApron);
      }, [res.data.airportApron]);
    
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

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

    


    return (
        <div>
            <div>
                <h1>Aprons Data</h1>
                <table className="apronAlign">
                    <thead>
                        <tr>
                            <th className="apronheader">AP_number</th>
                            <th className="apronheader">Capacity</th>
                            <th className="apronheader">AP_location</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((apron, index) => (
                            <tr key={index}>
                                <td className="aproncell">{apron.AP_number}</td>
                                <td className="aproncell">{apron.Capacity}</td>
                                <td className="aproncell">{apron.AP_location}</td>
                                
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

export { ApronSearch };
