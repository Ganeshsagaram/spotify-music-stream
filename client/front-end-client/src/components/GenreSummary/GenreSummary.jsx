import React, { useEffect, useState } from 'react'
import { Grid, Box,Typography } from '@mui/material';
import { colors } from '../Images/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import useAuth from '../../UseAuth';
// import "./body.css"

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'grey',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
export default function GenreSummary() {
    
    const [mySummary, setMySummary] = useState([])
    useEffect(() => {
        {
            axios
                .get("http://localhost:6996/user/genre-summary", {
                    headers: {
                        'authorization': "Bearer " + localStorage.getItem("accessToken")
                    }
                })
                .then(res => {
                    setMySummary(res.data.genreSummary);
                    console.log("Success");

                }).catch(err => {
                    console.log(err)
                })
        }
    }, [])
    return (
        <Box
            sx={{
                background: 'linear-gradient(to right, #f3f4f6, #e0f7fa)',
                minHeight: '100vh',
                padding: '40px 20px',
            }}
        >
            <Grid container spacing={3} justifyContent="center">
                {mySummary.map((item, index) => {
                    const bgColor = colors[index % colors.length];
                    return (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={item.genre}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    backgroundColor: bgColor,
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    height: '100%',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#424242', marginBottom: 1 }}
                                >
                                    {item.genre}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#616161', fontWeight: 500 }}
                                >
                                    {item.count}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    )

}
