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

function Desaffectation({user, setUser}:UserProps) {

    const [jeu, setJeu] = useState({jeu_id:0,jeu_name:"",jeu_type:""})
    const [zones, setZones] = useState<{zone_id:number,zone_name:string}[]>([])
    const [zone, setZone] = useState<number>(0)
    const [finalZones, setFinalZones] = useState<{zone_id:number,zone_name:string}[]>([])
    const [affectations, setAffectations] = useState<{zone_id:number,affectation_id:number,zone_name:string}[]>([])

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
        setAffectations(parseRes)
    }

    useEffect(() => {
        getJeu()
        getZones()
        getZonesByJeu()
    },[])

    useEffect(() => {
        setFinalZones(zones.filter(({zone_id,zone_name}) => affectations.some((zone:{zone_id:number,zone_name:string}) => zone.zone_name === zone_name)))
    },[zones,affectations])

    useEffect(() => {
        if (finalZones.length !== 0) {
            setZone(finalZones[0].zone_id)
        }
        else {
            setZone(0)
        }
        setShow(true)
    },[finalZones])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const aff = affectations.find((aff:{zone_id:number}) => aff.zone_id === zone)!.affectation_id
        const res = await fetch(`http://localhost:5000/affectation/${aff}`, {
            method: "DELETE",
            headers: {token: localStorage.token}
        })
        navigate("/jeux")
    }

    const [show, setShow] = useState<boolean>(false)

    return (
    <Container>{!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> :
        <Container component="main" maxWidth="xs">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" component="h2">{jeu.jeu_name}</Typography>
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select2">Zone</InputLabel>
                <Select
                    labelId="zone2"
                    id="zone2"
                    value={zone}
                    label="Zone"
                    onChange={(e) => setZone(Number(e.target.value))}
                >
                    {finalZones.map(({zone_id,zone_name}) => 
                        <MenuItem key={zone_id} value={zone_id}>{zone_name}</MenuItem>
                    )}
                    {zone === 0 && <MenuItem disabled key={0} value={0}>Pas de zones</MenuItem>}
                </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button disabled={zone === 0} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                DESAFFECTER
            </Button>
          </Box></Container> }
        </Container>
    )
}

export default Desaffectation