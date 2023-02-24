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
import {useEffect} from "react"

function Connect({user, setUser, setOpen}:UserProps) {

  const navigate = useNavigate()

  useEffect(() => {
    if (user.polyuser_id !== 0) {
      navigate("/profil")
    }
  },[user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {mail:data.get("email"),password:data.get("password")}
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

  return (
      <Container component="main" maxWidth="xs">
        {user.polyuser_id === 0 &&
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" style={{textDecoration:"underline",color:"black"}}>
                  Don't have an account? Sign Up
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