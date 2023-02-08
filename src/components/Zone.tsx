import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import CreneauBenevoles from "./CreneauBenevoles"
import Typography from "@mui/material/Typography"

function Zone() {

    const {id} = useParams()

    useEffect(() => {
        getZone()
        getCreneaux()
    },[])

    const [creneaux, setCreneaux] = useState([])
    const [zone, setZone] = useState({zone_id:null,zone_name:""})

    async function getZone() {
        const res = await fetch(`http://localhost:5000/zone/${id}`)
        const parseRes = await res.json()
        setZone(parseRes)
    }

    async function getCreneaux() {
        const res = await fetch(`http://localhost:5000/creneau/zone/${id}`)
        const parseRes = await res.json()
        setCreneaux(parseRes)
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">{zone.zone_name}</Typography>
            <Grid container spacing={4}>
                {creneaux.map(({creneau_id,creneau_debut,creneau_fin}) => (
                <Grid item key={creneau_id} xs={12} sm={6} md={4}>
                    <CreneauBenevoles creneau_id={creneau_id} creneau_debut={creneau_debut} creneau_fin={creneau_fin} />
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Zone