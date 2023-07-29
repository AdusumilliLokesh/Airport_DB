import React from 'react';

import { VerticalTab, VerticalTabs } from './VerticalTabs';
import { PlaneDetails } from './PlaneDetails';
function App() {

  
  return (
    <div>

      <div>
        <h1>Airport Management System</h1>
        <VerticalTabs>
          <VerticalTab label="Aprons">
            <div>
              <h2>Content of Tab 1</h2>
              <p>This is the content of Tab 1.</p>
            </div>
          </VerticalTab>
          <VerticalTab label="Models">
            <div>
              <h2>Content of Tab 2</h2>
              <p>This is the content of Tab 2.</p>
            </div>
          </VerticalTab>
          <VerticalTab label="Plane Details">
            <div>
             <PlaneDetails></PlaneDetails>
            </div>
          </VerticalTab>
          <VerticalTab label="Owners">
            <div>
              <h2>Content of Tab 3</h2>
              <p>This is the content of Tab 3.</p>
            </div>
          </VerticalTab>
          <VerticalTab label="Employees">
            <div>
              <h2>Content of Tab 3</h2>
              <p>This is the content of Tab 3.</p>
            </div>
          </VerticalTab>
        </VerticalTabs>
      </div>
    </div>

  );
}

export default App;
