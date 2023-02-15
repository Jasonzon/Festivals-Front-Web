import {useState, useEffect} from "react"
import Grid from "@mui/material/Grid"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {Link, useNavigate} from "react-router-dom"
import {UserProps} from "./App"
import Button from "@mui/material/Button"

function Zones({user, setUser}:UserProps) {

    const navigate = useNavigate()

    const [zones, setZones] = useState([])

    useEffect(() => {
        getZones()
    },[])

    async function getZones() {
        const res = await fetch("http://localhost:5000/zone")
        const parseRes = await res.json()
        setZones(parseRes)
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">Zones</Typography>
            {user.polyuser_role === "admin" && <Button onClick={() => navigate("/zones/ajouter")} variant="contained" style={{marginBottom:"1rem"}}>AJOUTER</Button>}
            <Grid container spacing={4}>
                {zones.sort((a:{zone_name:string,zone_id:number},b:{zone_name:string,zone_id:number}) => a.zone_name.localeCompare(b.zone_name)).map(({zone_name,zone_id}) => (
                <Grid item key={zone_id} xs={12} sm={6} md={4}>
                    <Link to={`/zones/${zone_id}`} style={{color:"black",textDecoration:"none"}}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{zone_name}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Zones