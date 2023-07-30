
import './OwnerDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const OwnerDetails = ({ children }) => {
    const [owners, setowner] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);
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
    const [owner_id, setowner_id] = useState();
    const[Registration_number,setRegistration_number]=useState();
    const[Purchase_date,setPurchase_date]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setEdit(true);
        setowner_id(id.owner_id);
        setRegistration_number(id.Registration_number);
        setPurchase_date(id.Purchase_date);
        setAdd(false);
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
    
  const handleowner_id = (event) => {
    setowner_id(event.target.value);
  };
  const handleRegistration_number = (event) => {
    setRegistration_number(event.target.value);
  };
  const handlePurchase_date = (event) => {
    setPurchase_date(event.target.value);
  };
  const handleowner_idAdd = (event) => {
    setowner_id(event.target.value);
  };
  const handleRegistration_numberAdd = (event) => {
    setRegistration_number(event.target.value);
  };
  const handlePurchase_dateAdd = (event) => {
    setPurchase_date(event.target.value);
  };
  const handleSubmit = (event) => {
    //setcapacity(event.target.value);
    
  };
  const handleSubmitAdd = (event) => {
    //setcapacity(event.target.value);
    
  };

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/getOwner') // The proxy is set to 'http://localhost:5000' in package.json
            .then(response => setowner(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);


    return (
        <div>
            <div className='align_table'>
            <div>
                <h1>Owners Data
                <RiAddLine
                            onClick={() => handleAdd(123)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                        />
                </h1>
                <table className="ownerAlign">
                    <thead>
                        <tr>
                            <th className="ownerheader">Owner ID</th>
                            <th className="ownerheader">Registration Number</th>
                            <th className="ownerheader">Purchase Date</th>
                            <th className="ownerheader">Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((owner, index) => (
                            <tr key={index}>
                                <td className="ownercell">{owner.owner_id}</td>
                                <td className="ownercell">{owner.Registration_number}</td>
                                <td className="ownercell">{owner.Purchase_date}</td>
                                <td className="ownercell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(owner)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                        </span>
                                        <span>
                                            <RiDeleteBinLine
                                                onClick={() => handleDelete(owner)}
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
                        <div>Edit Owner
                        <label>
                        Owner ID:
                          <input type="text" value={owner_id} onChange={handleowner_id} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Registration_number:
                          <input type="text" value={Registration_number} onChange={handleRegistration_number} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Purchase_date:
                          <input type="text" value={Purchase_date} onChange={handlePurchase_date} />
                        </label>
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd}>
                        <div>Add Owner:
                        <label>
                        Owner_ID:
                          <input type="text" value={owner_id} onChange={handleowner_idAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Registration_number:
                          <input type="text" value={Registration_number} onChange={handleRegistration_numberAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Purchase_date:
                          <input type="text" value={Purchase_date} onChange={handlePurchase_dateAdd} />
                        </label>
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { OwnerDetails };
