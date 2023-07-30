
import './PlaneDetails.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

const PlaneDetails = ({ children }) => {
    const [planes, setPlanes] = useState([]);
    const itemsPerPage = 10; // Set the number of items to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [Edit, setEdit] = useState(false);
    const [Add, setAdd] = useState(false);

    // Calculate the total number of pages
    const totalPages = Math.ceil(planes.length / itemsPerPage);

    // Get the current items to display based on the current page number
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = planes.slice(indexOfFirstItem, indexOfLastItem);
    const [Model, setModel] = useState();
    const[Fuel_Capacity,setFuel_Capacity]=useState();
    const[Weight,setWeight]=useState();
    const[Maximum_Range	,setMaximum_Range	]=useState();
    const[Seating_Capacity,setSeating_Capacity]=useState();
    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log('Edit item with ID:', id);
        setEdit(true);
        setAdd(false);
        setModel(id.Model);
        setWeight(id.Weight);
        setFuel_Capacity(id.Fuel_Capacity);
        setMaximum_Range(id.Maximum_Range);
        setSeating_Capacity(id.Seating_Capacity);
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
    const handleModel = (event) => {
        setModel(event.target.value);
      };
      const handleFuel_Capacity = (event) => {
        setFuel_Capacity(event.target.value);
      };
      const handleWeight = (event) => {
        setWeight(event.target.value);
      };
      const handleMaximum_Range = (event) => {
        setMaximum_Range(event.target.value);
      };
      const handleSeating_Capacity = (event) => {
        setSeating_Capacity(event.target.value);
      };
      const handleModelAdd = (event) => {
        setModel(event.target.value);
      };
      const handleWeightAdd = (event) => {
        setWeight(event.target.value);
      };
      const handleFuel_CapacityAdd = (event) => {
        setFuel_Capacity(event.target.value);
      };
      const handleMaximum_RangeAdd = (event) => {
        setMaximum_Range(event.target.value);
      };
      const handleSeating_CapacityAdd = (event) => {
        setSeating_Capacity(event.target.value);
      };
      const handleSubmit = (event) => {
        //setcapacity(event.target.value);
        
      };
      const handleSubmitAdd = (event) => {
        //setcapacity(event.target.value);
        
      };
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
            <div className='align_table'>
            <div>
                <h1>Planes Data
                <RiAddLine
                            onClick={() => handleAdd(123)}
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                        />

                </h1>
                <table className="planeAlign">
                    <thead>
                        <tr>
                            <th className="planeheader">Model</th>
                            <th className="planeheader">Fuel_Capacity</th>
                            <th className="planeheader">Weight</th>
                            <th className="planeheader">Maximum_Range</th>
                            <th className="planeheader">Seating_Capacity</th>
                            <th className="planeheader">Actions</th>
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
                                <td className="aproncell">
                                        <span>
                                            <RiEdit2Line
                                                onClick={() => handleEdit(plane)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
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
                        <div>Edit Plane
                        <label>
                        Model:
                          <input type="text" value={Model} onChange={handleModel} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Fuel_Capacity:
                          <input type="text" value={Fuel_Capacity} onChange={handleFuel_Capacity} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Weight:
                          <input type="text" value={Weight} onChange={handleWeight} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Maximum_Range:
                          <input type="text" value={Maximum_Range} onChange={handleMaximum_Range} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Seating_Capacity:
                          <input type="text" value={Seating_Capacity} onChange={handleSeating_Capacity} />
                        </label>
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                    ) : null}

                    {Add ?
                        <form onSubmit={handleSubmitAdd}>
                        <div>Add new Plane:
                        <label>
                        Model:
                          <input type="text" value={Model} onChange={handleModelAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                        Fuel_Capacity:
                          <input type="text" value={Fuel_Capacity} onChange={handleFuel_CapacityAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Weight:
                          <input type="text" value={Weight} onChange={handleWeightAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Maximum_Range:
                          <input type="text" value={Maximum_Range} onChange={handleMaximum_RangeAdd} />
                        </label>
                        </div>
                        <div>
                        <label>
                            
                        Seating_Capacity:
                          <input type="text" value={Seating_Capacity} onChange={handleSeating_CapacityAdd} />
                        </label>
                        </div>
                        <div><button type="submit">Save</button></div>
                      </form>
                        : null}
                </div>
        </div>
    );
};

export { PlaneDetails };
