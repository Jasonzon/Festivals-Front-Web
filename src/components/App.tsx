import "../style/App.css"
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import Home from "./Home"
import Benevoles from "./Benevoles"
import Jeux from "./Jeux"
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header"
import Zones from "./Zones"
import Creneaux from "./Creneaux"
import Zone from "./Zone"
import Creneau from "./Creneau"
import { createContext, useEffect, useState } from "react"
import Register from "./Register"
import Connect from "./Connect"

const pages = [["Jeux","/jeux"],["Bénévoles","/benevoles"],["Zones","/zones"],["Créneaux","/creneaux"]]

const UserContext = createContext([{},() => {}])

function App() {

  const [user, setUser] = useState({})

  async function auth() {
    if (localStorage.token) {
        const res = await fetch("http://localhost:5000/polyuser/auth", {
            method: "GET",
            headers: {token: localStorage.token}
        })
        const parseRes = await res.json()
        const res2 = await fetch(`http://localhost:5000/polyuser/id/${parseRes.polyuser_id}`, {
            method: "GET"
        })
        const parseRes2 = await res2.json()
        setUser({polyuser_id:parseRes2.polyuser_id,polyuser_role:parseRes2.polyuser_role,polyuser_mail:parseRes.polyuser_mail,polyuser_nom:parseRes2.polyuser_nom,polyuser_prenom:parseRes2.polyuser_prenom})
    }
  }
  
  useEffect(() => {
    auth()
  },[])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <CssBaseline />
        <Header pages={pages} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/benevoles" element={<Benevoles/>} />
          <Route path="/jeux" element={<Jeux/>} />
          <Route path="/zones" element={<Zones/>} />
          <Route path="/zones/:id" element={<Zone/>}></Route>
          <Route path="/creneaux" element={<Creneaux/>} />
          <Route path="/creneaux/:id" element={<Creneau/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/connect" element={<Connect/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App