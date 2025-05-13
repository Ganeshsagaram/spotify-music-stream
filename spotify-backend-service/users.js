import { Router } from "express"
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

export const Usersapi = Router();
// const BearerToken=process.env.BEARER_TOKEN;

Usersapi.get("/current-user-details",async(req,res)=>{
    try {
        const apiUrl = 'https://api.spotify.com/v1/me'; 
        const token = req.headers.token;
        const response = await axios.get(apiUrl,{
            headers:{
                'Authorization': token }
        });
        const data = response.data;
    
        res.json({ message: 'Data fetched successfully!', data: data });
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from the API' });
      }
});

Usersapi.get("/user-profile/:id",async(req,res)=>{

    try {
        const userId = req.params.id;
        const token = req.headers.token;
        const apiUrl = `https://api.spotify.com/v1/users/${userId}`; 
        const response = await axios.get(apiUrl,{
            headers:{
                'Authorization': token }
        });
        const data = response.data;
    
        res.json({ message: 'Data fetched successfully!', data: data });
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from the API'});
      }
});

Usersapi.get("/get-my-playlist",async(req,res)=>{
    const accessToken = req.headers['authorization']?.split(' ')[1];
  
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token missing in Authorization header' });
    }
    
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    try{
        const data=await spotifyApi.getUserPlaylists();
        console.log(data.body.items);
        res.status(200).json({"total_songs":data.body.items[0].tracks.total});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

});

Usersapi.get("/get-track",async(req,res)=>{
    const accessToken = req.headers['authorization']?.split(' ')[1];
  
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token missing in Authorization header' });
    }
    
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    try{
        const data=await spotifyApi.getMySavedTracks({
            market:'IN'
        });
        // console.log(data.body.items);
        var jsonRes=[]
        data.body.items.forEach(item=>{
            const resObj={
                'nameOfTheTrack':item.track.name,
                'added_at':item.added_at,
                'track_id':item.track.id
            }
            jsonRes.push(resObj)

        })
        res.status(200).json({"res_array":jsonRes});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

Usersapi.get('/user/top-artists', async (req, res) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Missing access token in Authorization header' });
  }

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);

  try {
    const [topArtistsRes, topTracksRes, recentlyPlayedRes] = await Promise.all([
      spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 5 }),
      spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 5 }),
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 }),
    ]);

    const response = {
      topArtists: topArtistsRes.body.items.map(artist => ({
        name: artist.name,
        genres: artist.genres,
        popularity: artist.popularity,
        image: artist.images?.[0]?.url,
      })),
      topTracks: topTracksRes.body.items.map(track => ({
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        image: track.album.images?.[0]?.url,
      })),
      recentlyPlayed: recentlyPlayedRes.body.items.map(item => ({
        track: item.track.name,
        artist: item.track.artists[0].name,
        playedAt: item.played_at,
        image: item.track.album.images?.[0]?.url,
      })),
    };

    res.json(response);
  } catch (err) {
    console.error('Spotify API error:', err.body || err);
    res.status(500).json({ error: 'Failed to fetch listening habit data' });
  }
  });

Usersapi.get('/user/top-stats', async (req, res) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });
  
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
  
    try {
      const [topTracksRes, topArtistsRes] = await Promise.all([
        spotifyApi.getMyTopTracks({ time_range: 'medium_term', limit: 20 }),
        spotifyApi.getMyTopArtists({ time_range: 'medium_term', limit: 20 })
      ]);
  
      
      const avgDurationMs = topTracksRes.body.items.reduce((sum, track) => sum + track.duration_ms, 0) / topTracksRes.body.items.length;
  
      let genreCount = {};
      topArtistsRes.body.items.forEach(artist => {
        artist.genres.forEach(genre => {
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
      });
      console.log(topTracksRes.body.items)
      const sortedGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
  
      res.json({
        topTracks: topTracksRes.body.items.map(track => ({
          name: track.name,
          image:track.album.images[0],
          artist: track.artists.map(a => a.name).join(', '),
          duration_ms: track.duration_ms,
          track_id:track.id
        })),
        topArtists: topArtistsRes.body.items.map(artist => artist.name),
        mostCommonGenres: sortedGenres.slice(0, 3),
        avgSongDurationMin: (avgDurationMs / 60000).toFixed(2)
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user stats' });
    }
  });

  
  Usersapi.get('/user/audio-analysis/:trackId', async (req, res) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    const trackId = req.params.trackId;
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });
  console.log(trackId)
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
  
    try {
      const data = await spotifyApi.getAudioAnalysisForTrack(trackId);
      console.log(data)
      res.json({ trackId, features: data.body });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch audio analysis' });
    }
  });


  Usersapi.get('/user/genre-summary', async (req, res) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) return res.status(401).json({ error: 'Access token missing' });
  
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
  
    try {
      const topArtistsRes = await spotifyApi.getMyTopArtists({ limit: 50 });
      let genreCount = {};
  
      topArtistsRes.body.items.forEach(artist => {
        artist.genres.forEach(genre => {
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
      });
  
      const sortedGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .map(([genre, count]) => ({ genre, count }));
  
      res.json({ genreSummary: sortedGenres });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate genre summary' });
    }
  });






