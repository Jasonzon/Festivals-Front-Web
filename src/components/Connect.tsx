import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {UserProps} from "./App"
import {useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"

function Connect({user, setUser, setOpen}:UserProps) {

  const navigate = useNavigate()

  useEffect(() => {
    if (user.polyuser_id !== 0) {
      navigate("/profil")
    }
  },[user])

  const [mail, setMail] = useState<string>("")

  const [password, setPassword] = useState<string>("")

  function checkMail() {
    if (mail.length === 0) {
      return "Valeur manquante"
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      return "Mail invalide"
    }
    return ""
  }

  function checkPassword() {
    if (password.length === 0) {
      return "Valeur manquante"
    }
    return ""
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkMail() === "" && checkPassword() === "") {
      const body = {mail,password}
      const res = await fetch("http://localhost:5000/polyuser/connect", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body:JSON.stringify(body)
      })
      const parseRes = await res.json()
      if (parseRes.rows.length !== 0 && parseRes.token) {
          localStorage.setItem("token",parseRes.token)
          setUser(parseRes.rows[0])
      }
    }
    if (!validation) setValidation(true)
  }

  const [validation, setValidation] = useState<boolean>(false)

  return (
      <Container component="main" maxWidth="xs">
        {user.polyuser_id === 0 &&
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          <Typography component="h1" variant="h5">Connexion</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              error={validation && checkMail() !== ""}
              helperText={validation && checkMail()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={validation && checkPassword() !== ""}
              helperText={validation && checkPassword()}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              CONNEXION
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" style={{textDecoration:"underline",color:"black"}}>
                  Pas de compte ? S'enregistrer
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
      </Container>
  );
}

export default Connect