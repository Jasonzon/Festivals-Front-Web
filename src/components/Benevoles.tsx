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
import CircularProgress from '@mui/material/CircularProgress'
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

function Benevoles({user, setUser, setOpen}:UserProps) {

    const navigate = useNavigate()

    const [del, setDel] = useState(-1)

    const [benevoles, setBenevoles] = useState<{benevole_nom:string,benevole_prenom:string,benevole_id:number,benevole_mail:string}[]>([])

    const [searchName, setSearchName] = useState<string>("")

    async function getBenevoles() {
        const res = await fetch("http://localhost:5000/benevole", {
            method: "GET"
        })
        const parseRes = await res.json()
        setBenevoles(parseRes)
        setShow(true)
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
        if (res.status === 401) {
            setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
            setOpen(true)
        }
    }

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> : <Container>
            <Box sx={{py:8}} style={{marginBottom:"1rem"}}>
                <Typography variant="h2" style={{marginBottom:"1rem", flexGrow:1,textAlign:"center"}}>Bénévoles</Typography>
                <TextField sx={{mx:2}} label="Recherche par nom" variant="outlined" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                {user.polyuser_role === "admin" && <Button style={{padding:15}} onClick={() => navigate("/benevoles/ajouter")} variant="contained">AJOUTER</Button>}
            </Box>
            <Grid container spacing={4}>
                {benevoles.filter(({benevole_nom,benevole_prenom,benevole_id,benevole_mail}) => benevole_nom.toLowerCase().includes(searchName.toLowerCase()) || benevole_prenom.toLowerCase().includes(searchName.toLowerCase()) || benevole_mail.toLowerCase().includes(searchName.toLowerCase())).map(({benevole_nom,benevole_prenom,benevole_id,benevole_mail},index) =>
                    <Grid item key={benevole_id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{benevole_prenom + " " + benevole_nom}</Typography>
                                <Typography>{benevole_mail}</Typography>
                            </CardContent>
                            {user.polyuser_role === "admin" &&
                            <CardActions style={{display:"grid"}}>
                                <Button onClick={() => navigate(`/benevoles/modifier/${benevole_id}`)} size="small">MODIFIER</Button>
                                {del !== index ? <Button size="small" onClick={() => setDel(index)}>SUPPRIMER</Button> : <Button onClick={() => deleteBenevole(benevole_id)} size="small">CONFIRMER</Button>}
                                <Button onClick={() => navigate(`/benevoles/affecter/${benevole_id}`)} size="small">AFFECTER A UN POSTE</Button>
                                <Button onClick={() => navigate(`/benevoles/desaffecter/${benevole_id}`)} size="small">DESAFFECTER D'UN POSTE</Button>
                            </CardActions> }
                        </Card>
                    </Grid>
                )}
            </Grid></Container> }
        </Container>
    )
}

export default Benevoles