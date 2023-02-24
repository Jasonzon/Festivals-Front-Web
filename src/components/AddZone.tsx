import {UserProps} from "./App"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

function AddZone({user, setUser, setOpen}:UserProps) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [zone, setZone] = useState({zone_id:0,zone_name:""})

    const [initial, setInitial] = useState({zone_id:0,zone_name:""})

    async function getZone() {
        if (id !== undefined) {
            const res = await fetch(`http://localhost:5000/zone/${id}`, {
                method: "GET"
            })
            const parseRes = await res.json()
            setZone(parseRes)
            setInitial(parseRes)
            setShow(true)
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            getZone()
        }
        else {
            setShow(true)
        }
    },[])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {name:zone.zone_name}
        if (id === undefined) {
            const res = await fetch("http://localhost:5000/zone", {
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
            const res = await fetch(`http://localhost:5000/zone/${id}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json",token: localStorage.token},
                body:JSON.stringify(body)
            })
            if (res.status === 401) {
                setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
                setOpen(true)
              }
        }
        navigate("/zones")
    }

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container maxWidth="xs"> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> : <Container>
            <Typography variant="h4" style={{marginTop:"1rem",textAlign:"center",flexGrow:1}}>{id === undefined ? "Ajouter une zone" : `Modifier la zone : ${initial.zone_name}`}</Typography>
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
          </Box></Container> }
        </Container>
    )
}

export default AddZone