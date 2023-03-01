import {useState, useEffect} from "react"
import Grid from "@mui/material/Grid"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {Link, useNavigate} from "react-router-dom"
import Button from "@mui/material/Button"
import { UserProps } from "./App"
import CardActions from "@mui/material/CardActions"
import CircularProgress from "@mui/material/CircularProgress"

function Creneaux({user, setUser, setOpen}:UserProps) {

    const [del, setDel] = useState(-1)

    const navigate = useNavigate()

    const [creneaux, setCreneaux] = useState<{creneau_id:number,creneau_debut:Date,creneau_fin:Date}[]>([])

    useEffect(() => {
        getCreneaux()
    },[])

    async function getCreneaux() {
        const res = await fetch("http://localhost:5000/creneau")
        const parseRes = await res.json()
        setCreneaux(parseRes)
        setShow(true)
    }

    async function deleteCreneau(id: number) {
        setCreneaux(creneaux.slice().filter(({creneau_id}) => creneau_id !== id))
        const res = await fetch(`http://localhost:5000/creneau/${id}`, {
            method: "DELETE",
            headers: {token: localStorage.token}
        })
        if (res.status === 401) {
            setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
            setOpen(true)
        }
    }

    const [show, setShow] = useState<boolean>(false)

    return (
    <Container> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> :
        <Container sx={{ py: 8 }} maxWidth="md">
            <Typography style={{marginBottom:"1rem", flexGrow:1,textAlign:"center"}} variant="h2" component="h2">Créneaux</Typography>
            {user.polyuser_role === "admin" && <Button sx={{m:2,p:2}} onClick={() => navigate("/creneaux/ajouter")} variant="contained" style={{marginBottom:"1rem"}}>AJOUTER</Button>}
            <Grid container spacing={4}>
                {creneaux.sort((a:{creneau_id:number,creneau_debut:Date,creneau_fin:Date},b:{creneau_id:number,creneau_debut:Date,creneau_fin:Date}) => new Date(a.creneau_debut).getTime() - new Date(b.creneau_debut).getTime()).map(({creneau_id,creneau_debut,creneau_fin}:{creneau_id:number,creneau_debut:Date,creneau_fin:Date},index) => (
                <Grid item key={creneau_id} xs={12} sm={6} md={4}>
                    <Link to={`/creneaux/${creneau_id}`} style={{color:"black",textDecoration:"none"}}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{creneau_debut.toString().replace("T"," ").slice(0,16) + " - " + creneau_fin.toString().replace("T"," ").slice(0,16)}</Typography>
                            </CardContent>
                            {user.polyuser_role === "admin" &&
                            <CardActions>
                                <Button onClick={(e) => {e.preventDefault();navigate(`/creneaux/modifier/${creneau_id}`)}} size="small">MODIFIER</Button>
                                {del !== index ? <Button size="small" onClick={(e) => {e.preventDefault();setDel(index)}}>SUPPRIMER</Button> : <Button onClick={(e) => {e.preventDefault();deleteCreneau(creneau_id)}} size="small">CONFIRMER</Button>}
                            </CardActions> }
                        </Card>
                    </Link>
                </Grid>
                ))}
            </Grid></Container> }
        </Container>
    )
}

export default Creneaux