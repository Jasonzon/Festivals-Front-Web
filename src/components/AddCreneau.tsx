import {UserProps} from "./App"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import {useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

function AddCreneau({user, setUser, setOpen}:UserProps) {

    const navigate = useNavigate()

    const {id} = useParams()

    const [creneau, setCreneau] = useState<{creneau_id:number,creneau_debut:string,creneau_fin:string}>({creneau_debut:new Date().toISOString(),creneau_fin:new Date(new Date().setHours(new Date().getHours()+1)).toISOString(),creneau_id:0})

    const [initial, setInitial] = useState<{creneau_id:number,creneau_debut:string,creneau_fin:string}>({creneau_debut:"",creneau_fin:"",creneau_id:0})

    const [validation, setValidation] = useState<boolean>(false)

    async function getCreneau() {
        if (id !== undefined) {
            const res = await fetch(`http://localhost:5000/creneau/${id}`, {
                method: "GET"
            })
            const parseRes = await res.json()
            setCreneau({creneau_id:parseRes.creneau_id,creneau_debut:parseRes.creneau_debut.slice(0, 19),creneau_fin:parseRes.creneau_fin.slice(0, 19)})
            setInitial({creneau_id:parseRes.creneau_id,creneau_debut:parseRes.creneau_debut.slice(0, 19),creneau_fin:parseRes.creneau_fin.slice(0, 19)})
            setShow(true)
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            getCreneau()
        }
        else {
            setShow(true)
        }
    },[])

    function check() {
        if (creneau.creneau_debut >= creneau.creneau_fin) {
            return "Créneau invalide"
        }
        return ""
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (check() === "") {
            const body = {debut:creneau.creneau_debut,fin:creneau.creneau_fin}
            if (id === undefined) {
                const res = await fetch("http://localhost:5000/creneau", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json",token: localStorage.token},
                    body:JSON.stringify(body)
                })
                if (res.status === 401) {
                    setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
                    setOpen(true)
                }
            }
            else {
                const res = await fetch(`http://localhost:5000/creneau/${id}`, {
                    method: "PUT",
                    headers: {"Content-Type" : "application/json",token: localStorage.token},
                    body:JSON.stringify(body)
                })
                if (res.status === 401) {
                    setUser({polyuser_id:0,polyuser_nom:"",polyuser_prenom:"",polyuser_mail:"",polyuser_role:""})
                    setOpen(true)
                }
            }
            navigate("/creneaux")
        }
        if (!validation) setValidation(true)
    }

    const [show, setShow] = useState<boolean>(false)

    return (
        <Container maxWidth="sm"> {!show ? <Container sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh'}}><CircularProgress/></Container> : <Container>
            <Typography variant="h4" style={{marginTop:"1rem",textAlign:"center",flexGrow:1}}>{id === undefined ? "Nouveau créneau" : initial.creneau_debut.toString().replace("T"," ").slice(0,16) + " - " + initial.creneau_fin.toString().replace("T"," ").slice(0,16)}</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                    id="date1"
                    label="Date de début"
                    type="date"
                    value={creneau.creneau_debut.slice(0,10)}
                    onChange={(e) => setCreneau({...creneau,creneau_debut:`${e.target.value}T${creneau.creneau_debut.slice(11,19)}.000Z`})}
                    InputLabelProps={{shrink: true}}
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="time1"
                    label="Heure de début"
                    type="time"
                    value={creneau.creneau_debut.slice(11,16)}
                    onChange={(e) => setCreneau({...creneau,creneau_debut:`${creneau.creneau_debut.slice(0,10)}T${e.target.value}:00.000Z`})}
                    InputLabelProps={{shrink: true}}
                    fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="date2"
                    label="Date de fin"
                    type="date"
                    value={creneau.creneau_fin.slice(0,10)}
                    onChange={(e) => setCreneau({...creneau,creneau_fin:`${e.target.value}T${creneau.creneau_fin.slice(11,19)}.000Z`})}
                    InputLabelProps={{shrink: true}}
                    fullWidth
                    error={validation && check() !== ""}
                    helperText={validation && check()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="time2"
                    label="Heure de fin"
                    type="time"
                    value={creneau.creneau_fin.slice(11,16)}
                    onChange={(e) => setCreneau({...creneau,creneau_fin:`${creneau.creneau_fin.slice(0,10)}T${e.target.value}:00.000Z`})}
                    InputLabelProps={{shrink: true}}
                    fullWidth
                    error={validation && check() !== ""}
                    helperText={validation && check()}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {id === undefined ? "AJOUTER" : "MODIFIER"}
            </Button>
          </Box></Container> }
        </Container>
    )
}

export default AddCreneau