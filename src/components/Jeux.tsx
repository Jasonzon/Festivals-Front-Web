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

  const [jeux, setJeux] = useState([])
  const [search, setSearch] = useState("")
  const [check, setCheck] = useState<boolean[]>([])
  const [check2, setCheck2] = useState<TypeJeu>({enfant:true,famille:true,ambiance:true,initie:true,expert:true})
  const [zones, setZones] = useState<{zone_name:string,zone_id:number}[]>([])

  useEffect(() => {
      getJeux()
      getZones()
  },[])

  async function getJeux() {
      const res = await fetch("http://localhost:5000/jeu")
      const parseRes = await res.json()
      setJeux(parseRes)
  }

  async function getZones() {
    const res = await fetch("http://localhost:5000/zone")
    const parseRes = await res.json()
    setZones(parseRes)
    setCheck(parseRes.map(() => true))
  }

  async function deleteJeu(id: number) {
    setJeux(jeux.slice().filter(({jeu_id}) => jeu_id !== id))
    const res = await fetch(`http://localhost:5000/jeu/${id}`, {
        method: "DELETE",
        headers: {token: localStorage.token}
    })
  }

  return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography style={{marginBottom:"1rem"}} variant="h2" component="h2">Jeux</Typography>
        {user.polyuser_role === "admin" && <Button onClick={() => navigate("/jeux/ajouter")} variant="contained" style={{marginBottom:"1rem"}}>AJOUTER</Button>}
        <Box>
          <TextField id="outlined-basic" label="Recherche" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Zones</FormLabel>
              <FormGroup>
                  {zones.map(({zone_name,zone_id}:{zone_name:string,zone_id:number},index) => 
                  <FormControlLabel
                      key={zone_id}
                      control={<Checkbox checked={check[index]} onChange={() => setCheck(check.slice().map((bool,id) => index === id ? !bool : bool))}/>}
                      label={zone_name}
                  />      
                  )}    
              </FormGroup>
          </FormControl>
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
        </Box>
        <Grid container spacing={4}>
          {jeux.filter(({jeu_id,jeu_name,jeu_type,zones_affectees}:{jeu_id:number,jeu_name:string,jeu_type:keyof TypeJeu,zones_affectees:string[]}) => zones.slice().filter(({zone_name,zone_id}:{zone_name:string,zone_id:number},index) => zones_affectees.includes(zone_name) && check[index] === true).length !== 0 && check2[jeu_type] === true && jeu_name.toLowerCase().includes(search.toLowerCase())).map(({jeu_id,jeu_name,jeu_type},index) => (
            <Grid item key={jeu_id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">{jeu_name}</Typography>
                  <Typography>{jeu_type}</Typography>
                </CardContent>
                {user.polyuser_role === "admin" &&
                  <CardActions>
                      <Button onClick={() => navigate(`/jeux/modifier/${jeu_id}`)} size="small">MODIFIER</Button>
                      {del !== index ? <Button size="small" onClick={() => setDel(index)}>SUPPRIMER</Button> : <Button onClick={() => deleteJeu(jeu_id)} size="small">CONFIRMER</Button>}
                      <Button onClick={() => navigate(`/jeux/affecter/${jeu_id}`)} size="small">AFFECTER</Button>
                  </CardActions> }
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
  )
}

export default Jeux