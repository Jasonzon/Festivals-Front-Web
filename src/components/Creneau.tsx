import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import ZoneBenevoles from "./ZoneBenevoles"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

function Creneau() {

    const {id} = useParams()

    useEffect(() => {
        getCreneau()
        getZones()
    },[])

    const [creneau, setCreneau] = useState({creneau_id:null,creneau_debut:"",creneau_fin:""})
    const [zones, setZones] = useState([])

    async function getCreneau() {
        const res = await fetch(`http://localhost:5000/creneau/${id}`)
        const parseRes = await res.json()
        setCreneau(parseRes)
    }

    async function getZones() {
        const res = await fetch(`http://localhost:5000/zone/creneau/${id}`)
        const parseRes = await res.json()
        setZones(parseRes)
        setTimeout(() => setShow(true),500)
    }

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container sx={{ py: 8 }} maxWidth="md">{!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> : <Container>
            <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">{creneau.creneau_debut.toString().slice(11,16) + " - " + creneau.creneau_fin.toString().slice(11,16)}</Typography>
            <Grid container spacing={4}>
                {zones.map(({zone_id,zone_name}) => (
                <Grid item key={zone_id} xs={12} sm={6} md={4}>
                    <ZoneBenevoles zone_id={zone_id} zone_name={zone_name} />
                </Grid>
                ))}
                {zones.length === 0 && creneau.creneau_id !== null && 
                    <Typography style={{marginTop:"2rem",marginLeft:"4rem"}} variant="h4" component="h4">Pas de bénévoles</Typography>
                }
            </Grid></Container> }
        </Container>
    )
}

export default Creneau