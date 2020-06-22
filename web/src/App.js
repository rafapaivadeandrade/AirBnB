import React  from 'react';
import logo from './assets/airbnb.svg';
import './App.css';
import Router from './routes'

function App() {

  

  return (
    <div className="container">
      <img src={logo} alt="aircnc"/>
      <div className="content"> 
       <Router/>
      </div>
    </div>
  );
}

export default App;
