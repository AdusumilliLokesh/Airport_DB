import React, { useState }  from 'react';

import { VerticalTab, VerticalTabs } from './VerticalTabs';
import { PlaneDetails } from './PlaneDetails';
import { EmployeeDetails } from './EmployeeDetails';
import { OwnerDetails } from './OwnerDetails';
import { ApronDetails } from './ApronDetails';
import { ModelsData } from './ModelsData';
import './App.css';
import SearchBar from './SearchBar';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Perform search or filtering logic here with the 'query' value
    // For example, you can filter data or make API calls based on the search query.
  };
  return (
    <div className='alignbgpage'>

      <div >
        <div className='alignsearch'>
        <h1 className='align_title'>Airport Management System</h1>
        <SearchBar onChange={handleSearchChange}  />
      {/* Render the results or other components based on the searchQuery if needed */}
      {/* <p>Search Query: {searchQuery}</p> */}
      </div>
        <VerticalTabs>
          <VerticalTab label="Aprons">
            <div>
              <ApronDetails></ApronDetails>
            </div>
          </VerticalTab>
          <VerticalTab label="Models">
            <div>
              <ModelsData></ModelsData>
            </div>
          </VerticalTab>
          <VerticalTab label="Plane Details">
            <div>
             <PlaneDetails></PlaneDetails>
            </div>
          </VerticalTab>
          <VerticalTab label="Owners">
            <div>
              <OwnerDetails></OwnerDetails>
            </div>
          </VerticalTab>
          <VerticalTab label="Employees">
            <div>
              <EmployeeDetails></EmployeeDetails>
            </div>
          </VerticalTab>
        </VerticalTabs>
      </div>
    </div>

  );
}

export default App;
