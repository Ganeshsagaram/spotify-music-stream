import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e1f5fe, #fce4ec)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          🎧 Welcome to Your Music Dashboard
        </Typography>

        <Typography variant="h6" sx={{ color: '#555', marginBottom: 4 }}>
          Explore your personalized Spotify stats including top tracks, favorite artists,
          and genre distribution — all visualized beautifully and interactively.
        </Typography>
      </Container>
    </Box>
  );
}
