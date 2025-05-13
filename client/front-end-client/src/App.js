import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar/NavBar";
import HomePage from "./components/Homepage/HomePage";
import TopTracks from "./components/Images/ImageRender";

import GenreSummary from "./components/GenreSummary/GenreSummary";
import TopArtists from "./components/myTopArtists/TopArtists";
import Dashboard from "./DashBoard";
import LogOut from "./components/Logout/LogOut";
import Login from "./components/Login/Login";
import useAuth from "./UseAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProfile from "./components/Profile/MyProfile";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const accessToken = useAuth(code);

  if (!accessToken) {
    return <Login />;
  }
  return(
    <>
    <NavigationBar/>
      <Routes>
      <Route path="/home" element={<HomePage/>}></Route>
      <Route path="/top-tracks" element={<TopTracks/>}></Route>
      <Route path="/top-artists" element={<TopArtists/>}></Route>
      <Route path="/top-genres" element={<GenreSummary/>}></Route>
      <Route path="/search-songs" element={<Dashboard/>} ></Route>
      <Route path="/logout" element={<LogOut/>}></Route>
      <Route path="/profile" element={<MyProfile/>}></Route>
      </Routes>
      </>
    
  );

 
  
  
}

export default App;
