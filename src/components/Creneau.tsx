import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import ZoneBenevoles from "./ZoneBenevoles"
import Typography from "@mui/material/Typography"
import Creneaux from "./Creneaux"

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
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">{creneau.creneau_debut.toString().slice(11,16) + " - " + creneau.creneau_fin.toString().slice(11,16)}</Typography>
            <Grid container spacing={4}>
                {zones.map(({zone_id,zone_name}) => (
                <Grid item key={zone_id} xs={12} sm={6} md={4}>
                    <ZoneBenevoles zone_id={zone_id} zone_name={zone_name} />
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Creneau