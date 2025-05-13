import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'My Top Tracks', path: '/top-tracks' },
  { name: 'My Top Artists', path: '/top-artists' },
  { name: 'My Top Genres', path: '/top-genres' },
  {name:'Search', path:'/search-songs'},
  {name:'Profile',path:'/profile'},
  {name:'Logout', path:'/logout'}
];

export default function NavigationBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Spotify Insights
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              component={NavLink}
              to={item.path}
              sx={{
                color: 'white',
                textTransform: 'none',
                '&.active': {
                  fontWeight: 'bold',
                  borderBottom: '2px solid white'
                }
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
