
import './EmployeeDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EmployeeDetails = ({ children }) => {
    const [employees, setEmployee] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    // Handle changing the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getEmployee') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setEmployee(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div>
                <h1>employees Data</h1>
                <table className="employeeAlign">
                    <thead>
                        <tr>
                            <th className="employeeheader">Efname</th>
                            <th className="employeeheader">EMi</th>
                            <th className="employeeheader">Elname</th>
                            <th className="employeeheader">Salary</th>
                            <th className="employeeheader">Essn</th>
                            <th className="employeeheader">Esex</th>
                            <th className="employeeheader">Shift</th>
                            <th className="employeeheader">Eaddress</th>
                            <th className="employeeheader">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((employee, index) => (
                            <tr key={index}>
                                <td className="employeecell">{employee.Efname}</td>
                                <td className="employeecell">{employee.EMi}</td>
                                <td className="employeecell">{employee.Elname}</td>
                                <td className="employeecell">{employee.Salary}</td>
                                <td className="employeecell">{employee.Essn}</td>
                                <td className="employeecell">{employee.Esex}</td>
                                <td className="employeecell">{employee.Shift}</td>
                                <td className="employeecell">{employee.Eaddress}</td>
                                <td className="employeecell">{employee.Role}</td>
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

export { EmployeeDetails };
