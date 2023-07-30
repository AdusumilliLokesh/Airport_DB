
import './EmployeeDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const EmployeeDetails = ({ children }) => {
    const [employees, setEmployee] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);
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
    const [Address, setAddress] = useState();
    const[Employee_ID,setEmployee_ID]=useState();
    const[First_name,setFirst_name]=useState();
    const[Last_name,setLast_name]=useState();
    const[Middle_Name,setMiddle_Name]=useState();
    const[Role,setRole]=useState();
    const[Salary,setSalary]=useState();
    const[Sex,setSex]=useState();
    const[Shift,setShift]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setEdit(true);
        setAdd(false);
        setAddress(id.Address);
        setEmployee_ID(id.Employee_ID);
        setFirst_name(id.First_name);
        setLast_name(id.Last_name);
        setMiddle_Name(id.Middle_Name);
        setRole(id.Role);
        setSalary(id.Salary);
        setSex(id.Sex);
        setShift(id.Shift);
    };

    const handleDelete = (id) => {
        // Implement your delete logic here
        console.log('Delete item with ID:', id);

    };
    const handleAdd = (id) => {

        // Implement your add logic here
        setAdd(true);
        setEdit(false);
        console.log('Add item with ID:', id);
    };
    
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleEmployee_ID = (event) => {
    setEmployee_ID(event.target.value);
  };
  const handleFirst_name = (event) => {
    setFirst_name(event.target.value);
  };
  const handleLast_name = (event) => {
    setLast_name(event.target.value);
  };
  const handleMiddle_Name = (event) => {
    setMiddle_Name(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleSalary = (event) => {
    setSalary(event.target.value);
  };
  const handleSex = (event) => {
    setSex(event.target.value);
  };
  const handleShift = (event) => {
    setShift(event.target.value);
  };


  const handleAddressAdd = (event) => {
    setAddress(event.target.value);
  };
  const handleEmployee_IDAdd = (event) => {
    setEmployee_ID(event.target.value);
  };
  const handleFirst_nameAdd = (event) => {
    setFirst_name(event.target.value);
  };
  const handleLast_nameAdd = (event) => {
    setLast_name(event.target.value);
  };
  const handleMiddle_NameAdd = (event) => {
    setMiddle_Name(event.target.value);
  };
  const handleRoleAdd = (event) => {
    setRole(event.target.value);
  };
  const handleSalaryAdd = (event) => {
    setSalary(event.target.value);
  };
  const handleSexAdd = (event) => {
    setSex(event.target.value);
  };
  const handleShiftAdd = (event) => {
    setShift(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    
  };
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);
    
  };
    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getEmployee') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setEmployee(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div className='align_table'>
            <div >
                <h1>Employees Data
                <RiAddLine
                            onClick={() => handleAdd(123)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                        />
                </h1>
                <table className="employeeAlign">
                    <thead>
                        <tr>
                            <th className="employeeheader">Address</th>
                            <th className="employeeheader">Employee_ID</th>
                            <th className="employeeheader">First_name</th>
                            <th className="employeeheader">Last_name</th>
                            <th className="employeeheader">Middle_Name</th>
                            <th className="employeeheader">Role</th>
                            <th className="employeeheader">Salary</th>
                            <th className="employeeheader">Sex</th>
                            <th className="employeeheader">Shift</th>
                            <th className="employeeheader">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((employee, index) => (
                            <tr key={index}>
                                <td className="employeecell">{employee.Address}</td>
                                <td className="employeecell">{employee.Employee_ID}</td>
                                <td className="employeecell">{employee.First_name}</td>
                                <td className="employeecell">{employee.Last_name}</td>
                                <td className="employeecell">{employee.Middle_Name}</td>
                                <td className="employeecell">{employee.Role}</td>
                                <td className="employeecell">{employee.Salary}</td>
                                <td className="employeecell">{employee.Sex}</td>
                                <td className="employeecell">{employee.Shift}</td>
                                <td className="aproncell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(employee)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                        </span>
                                        <span>
                                            <RiDeleteBinLine
                                                onClick={() => handleDelete(employee)}
                                                style={{ cursor: 'pointer' }}
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
                        <div>Edit Employee
                        <label>
                        Address:
                          <input type="text" value={Address} onChange={handleAddress} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Employee_ID:
                          <input type="text" value={Employee_ID} onChange={handleEmployee_ID} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        First_name:
                          <input type="text" value={First_name} onChange={handleFirst_name} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Last_name:
                          <input type="text" value={Last_name} onChange={handleLast_name} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Middle_Name:
                          <input type="text" value={Middle_Name} onChange={handleMiddle_Name} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Role:
                          <input type="text" value={Role} onChange={handleRole} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Salary:
                          <input type="text" value={Salary} onChange={handleSalary} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Sex:
                          <input type="text" value={Sex} onChange={handleSex} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Shift:
                          <input type="text" value={Shift} onChange={handleShift} />
                        </label>
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd}>
                        <div>Add new Employee:
                        <label>
                        Address:
                          <input type="text" value={Address} onChange={handleAddressAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Employee_ID:
                          <input type="text" value={Employee_ID} onChange={handleEmployee_IDAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        First_name:
                          <input type="text" value={First_name} onChange={handleFirst_nameAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Last_name:
                          <input type="text" value={Last_name} onChange={handleLast_nameAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Middle_Name:
                          <input type="text" value={Middle_Name} onChange={handleMiddle_NameAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Role:
                          <input type="text" value={Role} onChange={handleRoleAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Salary:
                          <input type="text" value={Salary} onChange={handleSalaryAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Sex:
                          <input type="text" value={Sex} onChange={handleSexAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Shift:
                          <input type="text" value={Shift} onChange={handleShiftAdd} />
                        </label>
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { EmployeeDetails };
