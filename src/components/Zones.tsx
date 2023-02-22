import {useState, useEffect} from "react"
import Grid from "@mui/material/Grid"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {Link, useNavigate} from "react-router-dom"
import {UserProps} from "./App"
import Button from "@mui/material/Button"
import CardActions from "@mui/material/CardActions"
import CircularProgress from "@mui/material/CircularProgress"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

function Zones({user, setUser}:UserProps) {

    const [del, setDel] = useState(-1)

    const navigate = useNavigate()

    const [zones, setZones] = useState<{zone_id:number,zone_name:string}[]>([])

    const [searchName, setSearchName] = useState<string>("")

    const [affectations, setAffectations] = useState<{jeu_name:string,affectation_id:number,affectation_jeu:number,affectation_zone:number}[]>([])

    useEffect(() => {
        getZones()
    },[])

    async function getZones() {
        const res = await fetch("http://localhost:5000/zone")
        const parseRes = await res.json()
        setZones(parseRes)
        setShow(true)
    }

    async function getAffectations() {
        const res = await fetch("http://localhost:5000/affectation")
        const parseRes = await res.json()
        setAffectations(parseRes)
    }

    useEffect(() => {
        getAffectations()
    },[zones])

    async function deleteZone(id: number) {
        setZones(zones.slice().filter(({zone_id}) => zone_id !== id))
        const res = await fetch(`http://localhost:5000/zone/${id}`, {
            method: "DELETE",
            headers: {token: localStorage.token}
        })
    }

    const [show, setShow] = useState<boolean>(false)

    return (
    <Container> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> :
        <Container sx={{ py: 8 }} maxWidth="md">
            <Box style={{marginBottom:"1rem"}}>
                <Typography variant="h2" component="h2">Zones</Typography>
                {user.polyuser_role === "admin" && <Button onClick={() => navigate("/zones/ajouter")} variant="contained" style={{marginBottom:"1rem"}}>AJOUTER</Button>}
                <TextField style={{marginLeft:"1rem"}} label="Recherche par nom" variant="outlined" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            </Box>
            <Grid container spacing={4}>
                {zones.sort((a:{zone_name:string,zone_id:number},b:{zone_name:string,zone_id:number}) => a.zone_name.localeCompare(b.zone_name)).filter(({zone_id,zone_name}) => zone_name.toLowerCase().includes(searchName.toLowerCase())).map(({zone_name,zone_id},index) => (
                <Grid item key={zone_id} xs={12} sm={6} md={4}>
                    <Link to={`/zones/${zone_id}`} style={{color:"black",textDecoration:"none"}}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{zone_name}</Typography>
                                {affectations.filter(({affectation_zone}) => affectation_zone === zone_id).map(({affectation_id,jeu_name}) =>
                                    <Typography key={affectation_id} variant="h6">{jeu_name}</Typography>
                                )}
                            </CardContent>
                            {user.polyuser_role === "admin" &&
                            <CardActions>
                                <Button onClick={(e) => {e.preventDefault();navigate(`/zones/modifier/${zone_id}`)}} size="small">MODIFIER</Button>
                                {del !== index ? <Button size="small" onClick={(e) => {e.preventDefault();setDel(index)}}>SUPPRIMER</Button> : <Button onClick={(e) => {e.preventDefault();deleteZone(zone_id)}} size="small">CONFIRMER</Button>}
                            </CardActions> }
                        </Card>
                    </Link>
                </Grid>
                ))}
            </Grid></Container> }
        </Container>
    )
}

export default Zones