import { ImageList, ImageListItem, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import data from '../Images/data.json' with { type: 'json' };
import { useState,useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../UseAuth';

export default function TopArtists() {
   
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [topArtists,setMyTopArtists]=useState([])
    useEffect(() => {
        {
            axios
                .get("http://localhost:6996/user/top-artists", {
                    headers: {
                        'authorization': "Bearer " + localStorage.getItem("accessToken")
                    }
                })
                .then(res => {
                    setMyTopArtists(res.data.topArtists);
                    console.log("Success");

                }).catch(err => {
                    console.log(err)
                })
        }
    }, [])
    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #e0f7fa, #e1bee7)',
                padding: '16px',
                borderRadius: '12px',
                maxHeight: '85vh',
                overflowY: 'auto',
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: '#333',
                }}
            >
                My Top Artists
            </Typography>

            <ImageList
                variant="masonry"
                cols={isSmallScreen ? 2 : 4}
                gap={16}
                sx={{ margin: 0 }}
            >
                {topArtists.map((item, index) => (
                    <ImageListItem key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 1,
                                backgroundColor: '#ffffffdd',
                                borderRadius: 2,
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                        >
                            <img
                                src={`${item.image}?w=140&h=140&fit=crop&auto=format`}
                                alt={item.name}
                                style={{
                                    width: '50%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    marginBottom: '6px',
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500, color: '#444' }}
                            >
                                {item.name}
                            </Typography>
                        </Paper>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>



    )
}


