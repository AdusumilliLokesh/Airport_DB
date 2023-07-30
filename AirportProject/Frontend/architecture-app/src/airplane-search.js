
import './airplane-search.css'; // Import the CSS file for styling
import React, { useState,useEffect} from 'react';



const AirplaneSearch = ({res}) => {
    
    const [Airplanes, setAirplane] = useState([]);
    useEffect(() => {
        setAirplane(res.data.airplane);
      }, []);
    
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
                <table className="AirplaneAlign">
                    <thead>
                        <tr>
                            <th className="Airplaneheader">Registration_no</th>
                            <th className="Airplaneheader">Manufacturer</th>
                            <th className="Airplaneheader">Model</th>
                            <th className="Airplaneheader">AP_Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((Airplane, index) => (
                            <tr key={index}>
                                <td className="Airplanecell">{Airplane.Registration_no}</td>
                                <td className="Airplanecell">{Airplane.Manufacturer}</td>
                                <td className="Airplanecell">{Airplane.Model}</td>
                                <td className="Airplanecell">{Airplane.AP_Number}</td>
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
