import React from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router";
const client_id=process.env.REACT_APP_CLIENT_ID
const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://127.0.0.1:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-read-recently-played`

export default function Login() {
  
  return (
    <div style={{paddingTop:"100px"}}>
      <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh",background: 'linear-gradient(0deg, #e0f7fa, #e1bee7)',display:"flex",alignContent:"center",alignItems:"center"}}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
    </div>
    
  )
}
