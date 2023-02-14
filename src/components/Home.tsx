import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Festival
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Retrouvez ici les informations concernant My Festival
            </Typography>
          </Container>
        </Box>
      </main>
    </>
  );
}