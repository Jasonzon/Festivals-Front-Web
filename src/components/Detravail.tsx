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

function Detravail({user, setUser, setOpen}:UserProps) {

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

    const [travaux, setTravaux] = useState<{travail_id:number,travail_benevole:number,travail_zone:number,travail_creneau:number,creneau_debut:Date,creneau_fin:Date,zone_name:string}[]>([])

    const [finalTravaux, setFinalTravaux] = useState<{travail_id:number,travail_benevole:number,travail_zone:number,travail_creneau:number,creneau_debut:Date,creneau_fin:Date,zone_name:string}[]>([])

    async function getBenevole() {
        const res = await fetch(`http://localhost:5000/benevole/${id}`)
        const parseRes = await res.json()
        setBenevole(parseRes)
    }

    async function getTravaux() {
        const res = await fetch(`http://localhost:5000/travail/benevole/${id}`)
        const parseRes = await res.json()
        setTravaux(parseRes)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const tra = travaux.find((tr:{travail_zone:number,travail_creneau:number}) => tr.travail_zone === zone && tr.travail_creneau === creneau)!.travail_id
        const res = await fetch(`http://localhost:5000/travail/${tra}`, {
            method: "DELETE",
            headers: {token: localStorage.token}
        })
        if (res.status === 401) {
            setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
            setOpen(true)
        }
        navigate("/benevoles")
    }

    useEffect(() => {
        getBenevole()
        getTravaux()
    },[])

    useEffect(() => {
        if (travaux.length !== 0) {
            setCreneau(travaux[0].travail_creneau)
        }
        setTimeout(() => setShow(true),500)
    },[travaux])

    useEffect(() => {
        setFinalTravaux(travaux.filter(({travail_creneau}) => travail_creneau === creneau))
    },[creneau,travaux])

    useEffect(() => {
        if (finalTravaux.length !== 0) {
            setZone(finalTravaux[0].travail_zone)
        }
    },[finalTravaux])

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
                        {travaux.map(({travail_id,travail_zone,travail_creneau,creneau_debut,creneau_fin}) => 
                            <MenuItem key={travail_creneau} value={travail_creneau}>{creneau_debut.toString().slice(0,16).replace("T"," ") + " - " + creneau_fin.toString().slice(0,16).replace("T"," ")}</MenuItem>
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
                        {finalTravaux.map(({travail_zone,zone_name}) => 
                            <MenuItem key={travail_zone} value={travail_zone}>{zone_name}</MenuItem>
                        )}
                        {zone === 0 && <MenuItem value={0}>Pas de zones</MenuItem>}
                    </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button disabled={creneau === 0} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    DESAFFECTER
                </Button>
              </Box></Container> }
            </Container>
        )
}

export default Detravail