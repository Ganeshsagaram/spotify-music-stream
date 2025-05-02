import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
import SpotifyWebApi from "spotify-web-api-node";
import lyricsFinder from "lyrics-finder"


const app=express();
app.use(bodyParser.json());
app.use(cors()) ;
app.use(bodyParser.urlencoded({ extended: true }))
const PORT=process.env.PORT||9669;


app.get("/",(req,res)=>{
    res.send("HI");
});

app.post("/login", (req, res) => {
    const code = req.body.code;
    console.log(code);
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    })
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        console.log(data);
        // res.send(data);
        res.json({
            tokenType:data.body.token_type,
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err);
        res.status(400).send("An unkown error")
      })
  });



  app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken)
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    })
  
    spotifyApi
      .refreshAccessToken()
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.get("/lyrics", async (req, res) => {
    const lyrics =
      (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
  })
  


app.listen(PORT, () => {
    console.log(`app started at ${PORT}`)
});