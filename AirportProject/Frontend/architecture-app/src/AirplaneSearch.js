
import './AirplaneSearch.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const AirplaneSearch = ({res}) => {
    
    const [Airplanes, setAirplane] = useState([]);
    useEffect(() => {
        setAirplane(res.data.airplane);
      }, [res.data.airplane]);
    
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(Airplanes.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Airplanes.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    


    return (
        <div>
            <div>
                <h1>Airplanes Data</h1>
                <table className="planeAlign">
                    <thead>
                        <tr>
                            <th className="planeheader">Registration_no</th>
                            <th className="planeheader">Manufacturer</th>
                            <th className="planeheader">Model</th>
                            <th className="planeheader">AP_Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((Airplane, index) => (
                            <tr key={index}>
                                <td className="planecell">{Airplane.Registration_no}</td>
                                <td className="planecell">{Airplane.Manufacturer}</td>
                                <td className="planecell">{Airplane.Model}</td>
                                <td className="planecell">{Airplane.AP_Number}</td>
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

export { AirplaneSearch };
