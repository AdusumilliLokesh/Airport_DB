import React from 'react';

import { VerticalTab, VerticalTabs } from './VerticalTabs';
import { PlaneDetails } from './PlaneDetails';
import { EmployeeDetails } from './EmployeeDetails';
import { OwnerDetails } from './OwnerDetails';
import { ApronDetails } from './ApronDetails';
import { ModelsData } from './ModelsData';
function App() {

  
  return (
    <div>

      <div>
        <h1>Airport Management System</h1>
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
