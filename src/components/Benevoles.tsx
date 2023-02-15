import { UserProps } from "./App"
import Button from "@mui/material/Button"
import {useNavigate} from "react-router-dom"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import {useState, useEffect} from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

function Benevoles({user, setUser}:UserProps) {

    const navigate = useNavigate()

    const [del, setDel] = useState(-1)

    const [benevoles, setBenevoles] = useState([])

    async function getBenevoles() {
        const res = await fetch("http://localhost:5000/benevole", {
            method: "GET"
        })
        const parseRes = await res.json()
        setBenevoles(parseRes)
    }

    useEffect(() => {
        getBenevoles()
    },[])

    async function deleteBenevole(id: number) {
        setBenevoles(benevoles.slice().filter(({benevole_id}) => benevole_id !== id))
        const res = await fetch(`http://localhost:5000/benevole/${id}`, {
            method: "DELETE",
            headers: {token: localStorage.token}
        })
    }

    return (
        <Container>
            <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">Benevoles</Typography>
            {user.polyuser_role === "admin" && <Button style={{marginBottom:"1rem"}} onClick={() => navigate("/benevoles/ajouter")} variant="contained">AJOUTER</Button>}
            <Grid container spacing={4}>
                {benevoles.map(({benevole_nom,benevole_prenom,benevole_id,benevole_mail},index) =>
                    <Grid item key={benevole_id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{benevole_prenom + " " + benevole_nom}</Typography>
                                <Typography>{benevole_mail}</Typography>
                            </CardContent>
                            {user.polyuser_role === "admin" &&
                            <CardActions>
                                <Button onClick={() => navigate(`/benevoles/modifier/${benevole_id}`)} size="small">MODIFIER</Button>
                                {del !== index ? <Button size="small" onClick={() => setDel(index)}>SUPPRIMER</Button> : <Button onClick={() => deleteBenevole(benevole_id)} size="small">CONFIRMER</Button>}
                            </CardActions> }
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

export default Benevoles