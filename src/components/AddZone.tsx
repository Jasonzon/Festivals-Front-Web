import {UserProps} from "./App"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"

function AddZone({user, setUser}:UserProps) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [zone, setZone] = useState({zone_id:0,zone_name:""})

    async function getZone() {
        if (id !== undefined) {
            const res = await fetch(`http://localhost:5000/zone/${id}`, {
                method: "GET"
            })
            const parseRes = await res.json()
            setZone(parseRes)
        }
    }

    useEffect(() => {
        getZone()
    },[])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {name:zone.zone_name}
        if (id === undefined) {
            const res = await fetch("http://localhost:5000/zone", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
        }
        else {
            const res = await fetch(`http://localhost:5000/zone/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body:JSON.stringify(body)
            })
        }
        navigate("/zones")
      }

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={zone.zone_name}
                  onChange={(e) => setZone({...zone,zone_name:e.target.value})}
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

export default AddZone