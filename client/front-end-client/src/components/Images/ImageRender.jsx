import React, { useEffect } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material'
import data from './data.json' with { type: 'json' };
import trackData from './myTopTrackData.json' with {type: 'json'};
import genreSummaryData from './genereData.json'with {type: 'json'
};
import { Container, Box, Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { colors } from './colors';
import { useState} from 'react';
import axios from 'axios';
import useAuth from '../../UseAuth';


export default function TopTracks() {
  // const accessToken = useAuth(code);
  const [topStats,setTopStats]=useState([])
  useEffect(() => {
    {
        axios
            .get("http://localhost:6996/user/top-stats", {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem("accessToken")
                }
            })
            .then(res => {
                setTopStats(res.data.topTracks);
                console.log("Success");

            }).catch(err => {
                console.log(err)
            })
    }
}, [])
  return (
    <>

      <div style={{ minHeight: '100vh', backgroundColor: '#f7f7f7', padding: '2rem',background: 'linear-gradient(135deg, #e0f7fa, #e1bee7)' }} >
        <Container maxWidth={false}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🎵 My Top Tracks</h2>

          <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <ImageList
              cols={6}
              gap={10}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {topStats.map((item, index) => (
                <ImageListItem key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      padding: 1,
                      backgroundColor: '#ffffff',
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                      
                      textAlign: 'center',
                    }}
                  >
                    <img
                      src={`${item.image.url}?w=240&h=140&fit=crop&auto=format`}
                      alt={item.name}
                      style={{ width: '50%', borderRadius: '10px' }}
                    />
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                  </Paper>
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Container>
      </div>


    </>

  )
}
