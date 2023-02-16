import {UserProps} from "./App"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"

function Affectation({user, setUser}:UserProps) {

    const [jeu, setJeu] = useState({jeu_id:0,jeu_name:"",jeu_type:""})
    const [zones, setZones] = useState<{zone_id:number,zone_name:string}[]>([])
    const [zone, setZone] = useState<number>(0)

    const navigate = useNavigate()

    const {id} = useParams()

    async function getJeu() {
        const res = await fetch(`http://localhost:5000/jeu/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        setJeu(parseRes)
    }

    async function getZones() {
        const res = await fetch("http://localhost:5000/zone", {
            method: "GET"
        })
        const parseRes = await res.json()
        setZones(parseRes)
    }

    async function getZonesByJeu() {
        const res = await fetch(`http://localhost:5000/affectation/jeu/${id}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        console.log("RES",parseRes)
        const parseRes2 = parseRes.map(({zone_id}:{zone_id:number}) => zone_id)
        const newZones = zones.slice().filter(({zone_id}) => !parseRes2.includes(zone_id))
        if (newZones.length !== zones.length) {
            setZones(newZones)
        }
    }

    console.log(zones)

    useEffect(() => {
        getJeu()
        getZones()
        getZonesByJeu()
    },[])

    useEffect(() => {
        if (zones.length !== 0) {
            setZone(zones[0].zone_id)
            getZonesByJeu()
        }
    },[zones])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {jeu:id,zone:zone}
        const res = await fetch("http://localhost:5000/affectation", {
            method: "POST",
            headers: {"Content-Type" : "application/json",token: localStorage.token},
            body:JSON.stringify(body)
        })
        navigate("/jeux")
      }

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" component="h2">{jeu.jeu_name}</Typography>
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Zone</InputLabel>
                <Select
                    labelId="zone"
                    id="zone"
                    value={zone}
                    label="Zone"
                    onChange={(e) => setZone(Number(e.target.value))}
                >
                    {zones.map(({zone_id,zone_name}) => 
                        <MenuItem key={zone_id} value={zone_id}>{zone_name}</MenuItem>
                    )}
                </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                AFFECTER
            </Button>
          </Box>
        </Container>
    )
}

export default Affectation