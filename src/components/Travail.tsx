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

function Travail({user, setUser, setOpen}:UserProps) {

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

    const [travaux, setTravaux] = useState<{travail_id:number,travail_benevole:number,travail_zone:number,travail_creneau:number}[]>([])

    const [finalCreneaux, setFinalCreneaux] = useState<{creneau_id:number,creneau_debut:Date,creneau_fin:Date}[]>([])

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

    async function getTravaux() {
        const res = await fetch(`http://localhost:5000/travail/benevole/${id}`)
        const parseRes = await res.json()
        setTravaux(parseRes)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const body = {benevole:id,zone,creneau}
        const res = await fetch("http://localhost:5000/travail", {
            method: "POST",
            headers: {"Content-Type" : "application/json",token: localStorage.token},
            body:JSON.stringify(body)
        })
        if (res.status === 401) {
            setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
            setOpen(true)
        }
        navigate("/benevoles")
    }

    useEffect(() => {
        getBenevole()
        getZones()
        getCreneaux()
        getTravaux()
    },[])

    useEffect(() => {
        setFinalCreneaux(creneaux.filter(({creneau_id}) => !travaux.some((travail:{travail_creneau:number}) => travail.travail_creneau === creneau_id)))
    },[travaux,creneaux])

    useEffect(() => {
        if (finalCreneaux.length !== 0) {
            setCreneau(finalCreneaux[0].creneau_id)
        }
        else {
            setCreneau(0)
        }
    },[finalCreneaux])

    useEffect(() => {
        if (zones.length !== 0) {
            setZone(zones[0].zone_id)
        }
        setTimeout(() => setShow(true),500)
    },[zones])

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> :
            <Container component="main" maxWidth="xs">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography style={{marginBottom:"1rem", flexGrow:1,textAlign:"center"}} variant="h3">{benevole.benevole_prenom + " " + benevole.benevole_nom}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select2">Créneau</InputLabel>
                    <Select
                        labelId="zone2"
                        id="zone2"
                        value={creneau}
                        label="Créneau"
                        onChange={(e) => setCreneau(Number(e.target.value))}
                    >
                        {finalCreneaux.map(({creneau_id,creneau_debut,creneau_fin}) => 
                            <MenuItem key={creneau_id} value={creneau_id}>{creneau_debut.toString().slice(0,16).replace("T"," ") + " - " + creneau_fin.toString().slice(0,16).replace("T"," ")}</MenuItem>
                        )}
                        {creneau === 0 && <MenuItem value={0}>Pas de créneaux</MenuItem>}
                    </Select>
                    </FormControl>
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
                </Grid>
                <Button disabled={creneau === 0} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    AFFECTER
                </Button>
              </Box></Container> }
            </Container>
        )
}

export default Travail