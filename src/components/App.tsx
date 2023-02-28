import "../style/App.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./Home"
import Benevoles from "./Benevoles"
import Jeux from "./Jeux"
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header"
import Zones from "./Zones"
import Creneaux from "./Creneaux"
import Zone from "./Zone"
import Creneau from "./Creneau"
import {useEffect, useState, Fragment} from "react"
import Register from "./Register"
import Connect from "./Connect"
import Profil from "./Profil"
import AddJeu from "./AddJeu"
import AddBenevole from "./AddBenevole"
import AddCreneau from "./AddCreneau"
import AddZone from "./AddZone"
import Affectation from "./Affectation"
import Desaffectation from "./Desaffectation"
import Travail from "./Travail"
import Detravail from "./Detravail"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button"

const pages = [["Jeux","/jeux"],["Bénévoles","/benevoles"],["Zones","/zones"],["Créneaux","/creneaux"],["Profil","/connect"]]

interface User {
  polyuser_id: number
  polyuser_mail: string
  polyuser_nom: string
  polyuser_prenom: string
  polyuser_role: string
}

export interface UserProps {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function App() {

  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={() => {setOpen(false);window.location.replace("/connect")}}>
        RECONNEXION
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const [user, setUser] = useState<User>({
    polyuser_id:0,
    polyuser_nom:"",
    polyuser_prenom:"",
    polyuser_mail:"",
    polyuser_role:""
  })

  async function auth() {
    if (localStorage.token) {
        const res = await fetch("http://localhost:5000/polyuser/auth", {
            method: "GET",
            headers: {token: localStorage.token}
        })
        const parseRes = await res.json()
        const res2 = await fetch(`http://localhost:5000/polyuser/id/${parseRes.polyuser_id}`, {
            method: "GET",
            headers: {token: localStorage.token}
        })
        const parseRes2 = await res2.json()
        setUser({polyuser_id:parseRes2.polyuser_id,polyuser_role:parseRes2.polyuser_role,polyuser_mail:parseRes.polyuser_mail,polyuser_nom:parseRes2.polyuser_nom,polyuser_prenom:parseRes2.polyuser_prenom})
    }
  }
  
  useEffect(() => {
    auth()
  },[])

  return (
      <Router>
        <CssBaseline />
        <Header pages={pages} />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Vous êtes déconnecté"
          action={action}
        />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/benevoles" element={<Benevoles setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/benevoles/ajouter" element={user.polyuser_id === 0 ? <Benevoles setOpen={setOpen} user={user} setUser={setUser} /> : <AddBenevole setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/benevoles/modifier/:id" element={user.polyuser_id === 0 ? <Benevoles setOpen={setOpen} user={user} setUser={setUser} /> : <AddBenevole setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/benevoles/affecter/:id" element={user.polyuser_id === 0 ? <Benevoles setOpen={setOpen} user={user} setUser={setUser} /> : <Travail setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/benevoles/desaffecter/:id" element={user.polyuser_id === 0 ? <Benevoles setOpen={setOpen} user={user} setUser={setUser} /> : <Detravail setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/jeux" element={<Jeux setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/jeux/ajouter" element={user.polyuser_id === 0 ? <Jeux setOpen={setOpen} user={user} setUser={setUser} /> : <AddJeu setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/jeux/modifier/:id" element={user.polyuser_id === 0 ? <Jeux setOpen={setOpen} user={user} setUser={setUser} /> : <AddJeu setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/jeux/affecter/:id" element={user.polyuser_id === 0 ? <Jeux setOpen={setOpen} user={user} setUser={setUser} /> : <Affectation setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/jeux/desaffecter/:id" element={user.polyuser_id === 0 ? <Jeux setOpen={setOpen} user={user} setUser={setUser} /> : <Desaffectation setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/zones" element={<Zones setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/zones/ajouter" element={user.polyuser_id === 0 ? <Zones setOpen={setOpen} user={user} setUser={setUser} /> : <AddZone setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/zones/modifier/:id" element={user.polyuser_id === 0 ? <Zones setOpen={setOpen} user={user} setUser={setUser} /> : <AddZone setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/zones/:id" element={<Zone/>}></Route>
          <Route path="/creneaux" element={<Creneaux setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/creneaux/ajouter" element={user.polyuser_id === 0 ? <Creneaux setOpen={setOpen} user={user} setUser={setUser} /> : <AddCreneau setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/creneaux/modifier/:id" element={user.polyuser_id === 0 ? <Creneaux setOpen={setOpen} user={user} setUser={setUser} /> : <AddCreneau setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/creneaux/:id" element={<Creneau/>} />
          <Route path="/register" element={<Register setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/connect" element={<Connect setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="/profil" element={<Profil setOpen={setOpen} user={user} setUser={setUser} />} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
  )
}

export default App