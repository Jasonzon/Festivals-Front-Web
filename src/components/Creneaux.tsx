import {useState, useEffect} from "react"
import Grid from "@mui/material/Grid"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {Link} from "react-router-dom"

function Creneaux() {

    const [creneaux, setCreneaux] = useState([])

    useEffect(() => {
        getCreneaux()
    },[])

    async function getCreneaux() {
        const res = await fetch("http://localhost:5000/creneau")
        const parseRes = await res.json()
        setCreneaux(parseRes)
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {creneaux.sort((a:{creneau_id:number,creneau_debut:Date,creneau_fin:Date},b:{creneau_id:number,creneau_debut:Date,creneau_fin:Date}) => a.creneau_debut.getTime() - b.creneau_debut.getTime()).map(({creneau_id,creneau_debut,creneau_fin}:{creneau_id:number,creneau_debut:Date,creneau_fin:Date}) => (
                <Grid item key={creneau_id} xs={12} sm={6} md={4}>
                    <Link to={`/creneaux/${creneau_id}`} style={{color:"black",textDecoration:"none"}}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{creneau_debut.toString().slice(11,16) + " - " + creneau_fin.toString().slice(11,16)}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Creneaux