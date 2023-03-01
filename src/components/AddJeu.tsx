import {UserProps} from "./App"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import { Typography } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

function AddJeu({user, setUser, setOpen}:UserProps) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [jeu, setJeu] = useState({jeu_id:0,jeu_name:"",jeu_type:"enfant"})

    const [initial, setInitial] = useState({jeu_id:0,jeu_name:"",jeu_type:"enfant"})

    async function getJeu() {
        const res = await fetch(`http://localhost:5000/jeu/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setJeu(parseRes)
        setInitial(parseRes)
        setShow(true)
    }

    useEffect(() => {
        if (id !== undefined) {
            getJeu()
        }
        else {
            setShow(true)
        }
    },[])

    const [validation, setValidation] = useState<boolean>(false)

    function checkJeu() {
        if (jeu.jeu_name.length === 0) {
            return "Valeur manquante"
        }
        return ""
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (checkJeu() === "") {
            const body = {name:jeu.jeu_name,type:jeu.jeu_type}
            if (id === undefined) {
                const res = await fetch("http://localhost:5000/jeu", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json",token: localStorage.token},
                    body:JSON.stringify(body)
                })
                if (res.status === 401) {
                    setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
                    setOpen(true)
                }
            }
            else {
                const res = await fetch(`http://localhost:5000/jeu/${id}`, {
                    method: "PUT",
                    headers: {"Content-Type" : "application/json",token: localStorage.token},
                    body:JSON.stringify(body)
                })
                if (res.status === 401) {
                    setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
                    setOpen(true)
                }
            }
            navigate("/jeux")
        }
        if (!validation) setValidation(true)
    }

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container maxWidth="xs"> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> : <Container>
            <Typography variant="h4" style={{marginTop:"1rem",textAlign:"center",flexGrow:1}}>{id === undefined ? "Nouveau jeu" : initial.jeu_name}</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nom"
                  name="name"
                  value={jeu.jeu_name}
                  onChange={(e) => setJeu({...jeu,jeu_name:e.target.value})}
                  error={validation && checkJeu() !== ""}
                  helperText={validation && checkJeu()}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        value={jeu.jeu_type}
                        label="Type"
                        onChange={(e) => setJeu({...jeu,jeu_type:e.target.value})}
                    >
                        <MenuItem value={"enfant"}>Enfant</MenuItem>
                        <MenuItem value={"famille"}>Famille</MenuItem>
                        <MenuItem value={"ambiance"}>Ambiance</MenuItem>
                        <MenuItem value={"initié"}>Initié</MenuItem>
                        <MenuItem value={"expert"}>Expert</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                CONFIRMER
            </Button>
          </Box></Container> }
        </Container>
    )
}

export default AddJeu