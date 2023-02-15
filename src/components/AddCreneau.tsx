import {UserProps} from "./App"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"

function AddCreneau({user, setUser}:UserProps) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [creneau, setCreneau] = useState({creneau_id:0,creneau_debut:"",creneau_fin:""})

    async function getCreneau() {
        if (id !== undefined) {
            const res = await fetch(`http://localhost:5000/creneau/${id}`, {
                method: "GET"
            })
            const parseRes = await res.json()
            setCreneau(parseRes)
        }
    }

    useEffect(() => {
        getCreneau()
    },[])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {debut:creneau.creneau_debut,fin:creneau.creneau_fin}
        if (id === undefined) {
            const res = await fetch("http://localhost:5000/creneau", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
        }
        else {
            const res = await fetch(`http://localhost:5000/creneau/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
        }
        navigate("/creneaux")
      }

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="datetime-local"
                    label="Début du créneau"
                    type="datetime-local"
                    defaultValue={new Date()}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    id="datetime-local"
                    label="Fin du créneau"
                    type="datetime-local"
                    defaultValue={new Date()}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {id === undefined ? "AJOUTER" : "MODIFIER"}
            </Button>
          </Box>
        </Container>
    )
}

export default AddCreneau