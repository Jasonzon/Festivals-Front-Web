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
import CircularProgress from "@mui/material/CircularProgress"

function Travail({user, setUser}:UserProps) {

    const {id} = useParams()

    const navigate = useNavigate()

    const [benevole, setBenevole] = useState({
        benevole_id:0,
        benevole_nom:"",
        benevole_prenom:"",
        benevole_mail:""
    })

    const [zone, setZone] = useState<number>(0)

    const [creneau, setCreneau] = useState<number>(0)

    const [zones, setZones] = useState<{zone_id:number,zone_name:string}[]>([])

    const [creneaux, setCreneaux] = useState<{creneau_id:number,creneau_debut:Date,creneau_fin:Date}[]>([])

    async function getBenevole() {
        const res = await fetch(`http://localhost:5000/benevole/${id}`)
        const parseRes = await res.json()
        setBenevole(parseRes)
    }

    async function getCreneaux() {
        const res = await fetch("http://localhost:5000/creneau")
        const parseRes = await res.json()
        setCreneaux(parseRes)
    }

    async function getZones() {
        const res = await fetch("http://localhost:5000/zone")
        const parseRes = await res.json()
        setZones(parseRes)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {benevole:id,zone,creneau}
        const res = await fetch("http://localhost:5000/travail", {
            method: "POST",
            headers: {"Content-Type" : "application/json",token: localStorage.token},
            body:JSON.stringify(body)
        })
        navigate("/benevoles")
    }

    useEffect(() => {
        getBenevole()
        getZones()
        getCreneaux()
    },[])

    useEffect(() => {
        if (zones.length !== 0) {
            setZone(zones[0].zone_id)
        }
    },[zones])

    useEffect(() => {
        if (creneaux.length !== 0) {
            setCreneau(creneaux[0].creneau_id)
        }
        setTimeout(() => setShow(true),500)
    },[creneaux])

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> :
            <Container component="main" maxWidth="xs">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" component="h2">{benevole.benevole_prenom + " " + benevole.benevole_nom}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select1">Zone</InputLabel>
                    <Select
                        labelId="zone1"
                        id="zone1"
                        value={zone}
                        label="Zone"
                        onChange={(e) => setZone(Number(e.target.value))}
                    >
                        {zones.map(({zone_id,zone_name}) => 
                            <MenuItem key={zone_id} value={zone_id}>{zone_name}</MenuItem>
                        )}
                        {zone === 0 && <MenuItem value={0}>Pas de zones</MenuItem>}
                    </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select2">Créneau</InputLabel>
                    <Select
                        labelId="zone2"
                        id="zone2"
                        value={zone}
                        label="Créneau"
                        onChange={(e) => setCreneau(Number(e.target.value))}
                    >
                        {creneaux.map(({creneau_id,creneau_debut,creneau_fin}) => 
                            <MenuItem key={creneau_id} value={creneau_id}>{creneau_debut.toString().slice(11,16) + " - " + creneau_fin.toString().slice(11,16)}</MenuItem>
                        )}
                        {creneau === 0 && <MenuItem value={0}>Pas de créneaux</MenuItem>}
                    </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button disabled={zone === 0} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    AFFECTER
                </Button>
              </Box></Container> }
            </Container>
        )
}

export default Travail