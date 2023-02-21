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

interface Affectation {
    affectation_id:number,
    affectation_jeu:number,
    affectation_zone:number,
    zone_id:number,
    zone_name:string
}

function AddJeu({user, setUser}:UserProps) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [jeu, setJeu] = useState({jeu_id:0,jeu_name:"",jeu_type:"enfant"})

    async function getJeu() {
        const res = await fetch(`http://localhost:5000/jeu/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setJeu(parseRes)
        setShow(true)
    }

    useEffect(() => {
        getJeu()
    },[])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {name:jeu.jeu_name,type:jeu.jeu_type}
        if (id === undefined) {
            const res = await fetch("http://localhost:5000/jeu", {
                method: "POST",
                headers: {"Content-Type" : "application/json",token: localStorage.token},
                body:JSON.stringify(body)
            })
        }
        else {
            const res = await fetch(`http://localhost:5000/jeu/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json",token: localStorage.token},
                body:JSON.stringify(body)
            })
        }
        navigate("/jeux")
    }

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container maxWidth="xs"> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> : <Container>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={jeu.jeu_name}
                  onChange={(e) => setJeu({...jeu,jeu_name:e.target.value})}
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