import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { private_safeAlpha } from '@mui/system';
import { Link } from '@mui/material';
import { Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
const DemoPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

export default function MyProfileTest() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        link: ''
    })
    useEffect(() => {
        axios.get("http://localhost:6996/current-user-details", {
            headers: {
                'token': "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res => {
            // console.log(res.data.data.display_name,"\n",res.data.data.email);
            setProfile({
                name: res.data.data.display_name,
                email: res.data.data.email,
                link: res.data.data.external_urls.spotify
            });
            console.log(profile);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div style={{minHeight:"50vh",background:'linear-gradient(0deg, #e0f7fa, #e1bee7)'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4,paddingTop:"7rem"}}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    backgroundColor: '#eeeeee',
                    borderRadius: 2,
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                    {profile.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {profile.email}
                </Typography>

                <Button
                    variant="contained"
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        backgroundColor: '#90EE90', 
                        color: 'black',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#4caf50',
                        },
                    }}
                >
                    Link to Your Profile
                </Button>
            </Paper>
        </Box>
        </div>
        

    )
}
