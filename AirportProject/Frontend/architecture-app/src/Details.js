
import './airplane-search.css'; // Import the CSS file for styling
import React from 'react';

import { VerticalTab, VerticalTabs } from './VerticalTabs';
import { PlaneDetails } from './PlaneDetails';
import { EmployeeDetails } from './EmployeeDetails';
import { OwnerDetails } from './OwnerDetails';
import { ApronDetails } from './ApronDetails';
import { ModelsData } from './ModelsData';
import { AirplaneSearch } from './airplane-search';

const Details = ({showContent,res}) => {
    if (showContent) {
    return (
        <VerticalTabs>
          <VerticalTab label="Airplane">
              <div>
                <AirplaneSearch res={res}></AirplaneSearch>
              </div>
            </VerticalTab>
            <VerticalTab label="Owner">
              <div>
                <ApronDetails></ApronDetails>
              </div>
            </VerticalTab>
            <VerticalTab label="Models">
              <div>
                <ModelsData></ModelsData>
              </div>
            </VerticalTab>
            <VerticalTab label="Employees/staff">
              <div>
                <PlaneDetails></PlaneDetails>
              </div>
            </VerticalTab>
            <VerticalTab label="Apron">
              <div>
              <OwnerDetails></OwnerDetails>
              </div>
            </VerticalTab>
           
          </VerticalTabs>
    );  
    }else{
        return(
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
        ); 
        
        }
};

export { Details };
