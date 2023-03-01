import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {UserProps} from "./App"
import {Link, useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"

function Register({user, setUser, setOpen}:UserProps) {

  const navigate = useNavigate()

  useEffect(() => {
    if (user.polyuser_id !== 0) {
      navigate("/profil")
    }
  },[user])

  const [validation, setValidation] = useState<boolean>(false)

  const [mail, setMail] = useState<string>("")

  const [nom, setNom] = useState<string>("")

  const [prenom, setPrenom] = useState<string>("")

  const [password, setPassword] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkMail() === "" && checkNom() === "" && checkPrenom() === "" && checkPassword() === "") {
      const res = await fetch(`http://localhost:5000/polyuser/mail/${mail}`, {
        method: "GET"
      })
      const parseRes = await res.json()
      if (parseRes.length === 0) {
          const body = {mail,nom,prenom,password}
          const res2 = await fetch("http://localhost:5000/polyuser", {
              method: "POST",
              headers: {"Content-Type" : "application/json"},
              body:JSON.stringify(body)
          })
          const parseRes2 = await res2.json()
          localStorage.setItem("token",parseRes2.token)
          setUser(parseRes2.rows[0])
      }
    }
    if (!validation) setValidation(true)
  }

  function checkMail() {
    if (mail.length === 0) {
      return "Valeur manquante"
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      return "Mail invalide"
    }
    return ""
  }

  function checkNom() {
    if (nom.length === 0) {
      return "Valeur manquante"
    }
    return ""
  }

  function checkPrenom() {
    if (prenom.length === 0) {
      return "Valeur manquante"
    }
    return ""
  }

  function checkPassword() {
    if (password.length === 0) {
      return "Valeur manquante"
    }
    return ""
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          <Typography component="h1" variant="h5">Enregistrement</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  error={validation && checkPrenom() !== ""}
                  helperText={validation && checkPrenom()}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  error={validation && checkNom() !== ""}
                  helperText={validation && checkNom()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Mail"
                  name="email"
                  autoComplete="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  error={validation && checkMail() !== ""}
                  helperText={validation && checkMail()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={validation && checkPassword() !== ""}
                  helperText={validation && checkPassword()}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ENREGISTREMENT
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/connect" style={{textDecoration:"underline",color:"black"}}>
                  Déjà un compte ? Se connecter
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Register