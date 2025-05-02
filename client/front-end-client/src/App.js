import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from './Login';
import { Routes, Route } from "react-router-dom";
import React, { Fragment } from 'react';
import HomePage from "./HomePage";
import Dashboard from "./DashBoard";
const code = new URLSearchParams(window.location.search).get("code")
function App() {
  return (
    <Fragment>

    {code?<Dashboard code={code}/>:<Login/>}
    </Fragment>
    
  );
}

export default App;
