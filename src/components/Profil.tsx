import {UserProps} from "./App"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

function Profil({user, setUser}:UserProps) {
    return (
        <Box sx={{ bgcolor: 'background.paper',pt: 8,pb: 6,}}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              {user.polyuser_prenom + " " + user.polyuser_nom}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {user.polyuser_mail}
            </Typography>
          </Container>
        </Box>
    )
}

export default Profil