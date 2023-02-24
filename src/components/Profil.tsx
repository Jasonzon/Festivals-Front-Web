import {UserProps} from "./App"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"

function Profil({user, setUser, setOpen}:UserProps) {

  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token")
    setUser({
      polyuser_id:0,
      polyuser_nom:"",
      polyuser_prenom:"",
      polyuser_mail:"",
      polyuser_role:""
    })
    setOpen(true)
  }

  useEffect(() => {
    if (user.polyuser_id === 0) {
      navigate("/connect")
    }
  },[user])

    return (
        <Box sx={{ bgcolor: 'background.paper',pt: 8,pb: 6,}}>
          {user.polyuser_id !== 0 &&
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              {user.polyuser_prenom + " " + user.polyuser_nom}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              {user.polyuser_mail}
            </Typography>
            <Button onClick={logout} variant="contained" fullWidth>DECONNEXION</Button>
          </Container> }
        </Box>
    )
}

export default Profil