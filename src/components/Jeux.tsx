import {useState, useEffect, Dispatch, SetStateAction} from "react"
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

function Jeux() {

    const [jeux, setJeux] = useState([])
    const [search, setSearch] = useState("")
    const [check, setCheck] = useState<boolean[]>([])
    const [check2, setCheck2] = useState<boolean[]>([])


    useEffect(() => {
        getJeux()
    },[])

    async function getJeux() {
        const res = await fetch("http://localhost:5000/jeu")
        const parseRes = await res.json()
        setJeux(parseRes)
        setCheck(parseRes.map(() => true))
        setCheck2(parseRes.map(() => true))
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
          <Box>
            <TextField id="outlined-basic" label="Recherche" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Zones</FormLabel>
                <FormGroup>
                    {jeux.map(({zone_name}:{zone_name:string},index) => 
                    <FormControlLabel
                        key={index}
                        control={<Checkbox checked={check[index]} onChange={() => setCheck(check.slice().map((bool,id) => index === id ? !bool : bool))} name="gilad" />}
                        label={zone_name}
                    />      
                    )}    
                </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Types</FormLabel>
                <FormGroup>
                    {jeux.map(({jeu_type}:{jeu_type:string},index) => 
                    <FormControlLabel
                        key={index}
                        control={<Checkbox checked={check2[index]} onChange={() => setCheck2(check2.slice().map((bool,id) => index === id ? !bool : bool))} name="gilad" />}
                        label={jeu_type}
                    />      
                    )}    
                </FormGroup>
            </FormControl>
            </Box>
          </Box>
          <Grid container spacing={4}>
            {jeux.filter((jeu,index) => check[index] && check2[index]).filter(({jeu_name}:{jeu_name:string}) => jeu_name.toLowerCase().includes(search.toLowerCase())).map(({jeu_id,jeu_name,jeu_type,zone_name}) => (
              <Grid item key={jeu_id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">{jeu_name}</Typography>
                    <Typography>{jeu_type}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    )
}

export default Jeux