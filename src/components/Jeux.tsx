import {useState, useEffect} from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button"
import {UserProps} from "./App"
import {useNavigate} from "react-router-dom"
import CardActions from "@mui/material/CardActions"
import CircularProgress from '@mui/material/CircularProgress'

interface TypeJeu {
  enfant: boolean,
  famille: boolean,
  ambiance: boolean,
  initie: boolean
  expert: boolean
}

function Jeux({user, setUser}:UserProps) {

  const [del, setDel] = useState(-1)

  const navigate = useNavigate()

  const [jeux, setJeux] = useState<{jeu_id:number,jeu_name:string,jeu_type:keyof TypeJeu,zones_affectees:string[]}[]>([])
  const [searchName, setSearchName] = useState("")
  const [searchZone, setSearchZone] = useState("")
  const [check2, setCheck2] = useState<TypeJeu>({enfant:true,famille:true,ambiance:true,initie:true,expert:true})

  useEffect(() => {
      getJeux()
  },[])

  async function getJeux() {
      const res = await fetch("http://localhost:5000/jeu")
      const parseRes = await res.json()
      setJeux(parseRes)
      setShow(true)
  }

  async function deleteJeu(id: number) {
    setJeux(jeux.slice().filter(({jeu_id}) => jeu_id !== id))
    const res = await fetch(`http://localhost:5000/jeu/${id}`, {
        method: "DELETE",
        headers: {token: localStorage.token}
    })
  }

  const [show, setShow] = useState<boolean>(false)

  return (
    <Container> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> :
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">Jeux</Typography>
        {user.polyuser_role === "admin" && <Button onClick={() => navigate("/jeux/ajouter")} variant="contained" style={{marginBottom:"1rem"}}>AJOUTER</Button>}
        <Box>
          <TextField label="Recherche par nom" variant="outlined" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <TextField sx={{ ml: 2 }} label="Recherche par zone" variant="outlined" value={searchZone} onChange={(e) => setSearchZone(e.target.value)} />
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Types</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={check2.enfant} onChange={() => setCheck2({...check2,enfant:!check2.enfant})}/>}
                  label="enfant"
                />    
                <FormControlLabel
                  control={<Checkbox checked={check2.famille} onChange={() => setCheck2({...check2,famille:!check2.famille})}/>}
                  label="famille"
                />
                <FormControlLabel
                  control={<Checkbox checked={check2.ambiance} onChange={() => setCheck2({...check2,ambiance:!check2.ambiance})}/>}
                  label="ambiance"
                />    
                <FormControlLabel
                  control={<Checkbox checked={check2.initie} onChange={() => setCheck2({...check2,initie:!check2.initie})}/>}
                  label="initie"
                />    
                <FormControlLabel
                  control={<Checkbox checked={check2.expert} onChange={() => setCheck2({...check2,expert:!check2.expert})}/>}
                  label="expert"
                />        
              </FormGroup>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {jeux.filter(({jeu_id,jeu_name,jeu_type,zones_affectees}:{jeu_id:number,jeu_name:string,jeu_type:keyof TypeJeu,zones_affectees:string[]}) => (zones_affectees.length === 0 || zones_affectees.some((zone) => zone.toLowerCase().includes(searchZone.toLowerCase()))) && check2[jeu_type] && jeu_name.toLowerCase().includes(searchName.toLowerCase())).map(({jeu_id,jeu_name,jeu_type,zones_affectees},index) => (
            <Grid item key={jeu_id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">{jeu_name}</Typography>
                  <Typography sx={{fontWeight: 'bold'}}>Catégorie</Typography>
                  <Typography>{jeu_type}</Typography>
                  <Typography sx={{fontWeight: 'bold'}}>Zones</Typography>
                  {zones_affectees.map((zone) =>
                      <Typography>{zone}</Typography>
                  )}
                </CardContent>
                {user.polyuser_role === "admin" &&
                  <CardActions style={{display:"grid"}}>
                      <Button onClick={() => navigate(`/jeux/modifier/${jeu_id}`)} size="small">MODIFIER</Button>
                      {del !== index ? <Button size="small" onClick={() => setDel(index)}>SUPPRIMER</Button> : <Button onClick={() => deleteJeu(jeu_id)} size="small">CONFIRMER</Button>}
                      <Button onClick={() => navigate(`/jeux/affecter/${jeu_id}`)} size="small">AFFECTER A UNE ZONE</Button>
                      <Button onClick={() => navigate(`/jeux/desaffecter/${jeu_id}`)} size="small">DESAFFECTER D'UNE ZONE</Button>
                  </CardActions> }
              </Card>
            </Grid>
          ))}
        </Grid></Container> }
      </Container>
  )
}

export default Jeux