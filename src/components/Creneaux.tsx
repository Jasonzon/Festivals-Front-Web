import {useState, useEffect} from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {useNavigate} from "react-router-dom"
import Button from "@mui/material/Button"
import { UserProps } from "./App"
import CircularProgress from "@mui/material/CircularProgress"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]

const mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

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
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Jour de début</TableCell>
                            <TableCell style={{whiteSpace:"nowrap"}} align="left">Heure de début</TableCell>
                            <TableCell style={{whiteSpace:"nowrap"}} align="left">Jour de fin</TableCell>
                            <TableCell style={{whiteSpace:"nowrap"}} align="left">Heure de fin</TableCell>
                            <TableCell style={{whiteSpace:"nowrap"}} align="left">Modifier</TableCell>
                            <TableCell style={{whiteSpace:"nowrap"}} align="left">Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {creneaux.sort((a:{creneau_id:number,creneau_debut:Date,creneau_fin:Date},b:{creneau_id:number,creneau_debut:Date,creneau_fin:Date}) => new Date(a.creneau_debut).getTime() - new Date(b.creneau_debut).getTime()).map(({creneau_id,creneau_debut,creneau_fin}:{creneau_id:number,creneau_debut:Date,creneau_fin:Date},index) => (
                        <TableRow style={{cursor:"pointer"}} key={creneau_id} onClick={(e) => {navigate(`/creneaux/${creneau_id}`)}}>
                            <TableCell>{jours[new Date(creneau_debut).getDay()] + " " + new Date(creneau_debut).getDate() + " " + mois[new Date(creneau_debut).getMonth()] + " " + new Date(creneau_debut).getFullYear()}</TableCell>
                            <TableCell align="left">{new Date(creneau_debut).getHours() + "h" + new Date(creneau_debut).getMinutes()}</TableCell>
                            <TableCell align="left">{jours[new Date(creneau_fin).getDay()]  + " " + new Date(creneau_fin).getDate() + " " + mois[new Date(creneau_fin).getMonth()] + " " + new Date(creneau_fin).getFullYear()}</TableCell>
                            <TableCell align="left">{new Date(creneau_fin).getHours() + "h" + new Date(creneau_fin).getMinutes()}</TableCell>
                            <TableCell align="left">{user.polyuser_role === "admin" && <Button onClick={(e) => {e.stopPropagation();navigate(`/creneaux/modifier/${creneau_id}`)}} size="small">MODIFIER</Button>}</TableCell>
                            <TableCell align="left">{user.polyuser_role === "admin" && <> {del !== index ? <Button size="small" onClick={(e) => {e.stopPropagation();setDel(index)}}>SUPPRIMER</Button> : <Button onClick={(e) => {e.preventDefault();deleteCreneau(creneau_id)}} size="small">CONFIRMER</Button>}</>}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer></Container> }
        </Container>
    )
}

export default Creneaux