import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {UserProps} from "./App"
import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"

function Register({user, setUser}:UserProps) {

  const navigate = useNavigate()

  useEffect(() => {
    if (user.polyuser_id !== 0) {
      navigate("/profil")
    }
  },[user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch(`http://localhost:5000/polyuser/mail/${data.get("mail")}`, {
      method: "GET"
    })
    const parseRes = await res.json()
    if (parseRes.length === 0) {
        const body = {mail:data.get("email"),nom:data.get("lastName"),prenom:data.get("firstName"),password:data.get("password")}
        console.log(body)
        const res2 = await fetch("http://localhost:5000/polyuser", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(body)
        })
        const parseRes2 = await res2.json()
        localStorage.setItem("token",parseRes2.token)
        setUser(parseRes2.rows[0])
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/connect" style={{textDecoration:"underline",color:"black"}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Register