import {useState, useEffect} from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";

function Jeux() {

    const [jeux, setJeux] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        getJeux()
    },[])

    async function getJeux() {
        const res = await fetch("http://localhost:5000/jeu")
        const parseRes = await res.json()
        setJeux(parseRes)
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
          <TextField id="outlined-basic" label="Recherche" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Grid container spacing={4}>
            {jeux.filter(({jeu_name}:{jeu_name:string}) => jeu_name.toLowerCase().includes(search.toLowerCase())).map(({jeu_id,jeu_name,jeu_type,zone_name}) => (
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