import React, { useState }  from 'react';


import './App.css';
import {SearchBar} from './SearchBar';
import { Details } from './Details';
function App() {
  const[res,setRes]=useState();
  const [showContent, setShowContent] = useState(false);
  return (
    <div className='alignbgpage'>

      <div >
        <div className='alignsearch'>
          <h1 className='align_title'>Airport Management System</h1>
          <SearchBar setShowContent={setShowContent} setRes={setRes}/>
          {/* Render the results or other components based on the searchQuery if needed */}
          {/* <p>Search Query: {searchQuery}</p> */}
        </div>
        <Details showContent={showContent} res={res} />
        </div>
    </div>
         
        
         
        
        
        
      

  );
}

export default App;
