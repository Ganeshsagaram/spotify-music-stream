import React, { useEffect,useState } from 'react'
import { Container, Form } from "react-bootstrap";
import "./search.css";
import axios from 'axios';
import SpotifyWebApi from "spotify-web-api-node";
import { spotifyApi } from '../DashBoard';
export default function Search() {
  const [searchSong, setSearch] = useState("");

  async function submitEvent(event) {
    event.preventDefault(); // Prevent form refresh
    console.log("Search input:", searchSong);
    const data=await spotifyApi.searchTracks(searchSong);
    setSearch("");
    let trackID=data.body.tracks.items[0].id;
    console.log(data.body.tracks.items[0].id);
    axios.get(`http://localhost:6996/user/audio-analysis/${trackID}`,{
      headers:{
        authorization:'Bearer '+localStorage.getItem("accessToken")
      }
    }).then((res)=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    }
    )
   
  }

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }} id="container">
      <Form onSubmit={submitEvent}>
        <Form.Control
          type="search"
          placeholder="Search bar"
          value={searchSong}
          onChange={(e) => setSearch(e.target.value)}
          style={{width:"auto"}}
        />
        <button type="submit"  className="btn btn-primary mt-2"> Search</button>
      </Form>
    </Container>
  )
}
