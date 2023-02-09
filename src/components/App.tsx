import "../style/App.css"
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import Home from "./Home"
import Benevoles from "./Benevoles"
import Jeux from "./Jeux"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./Header"
import Zones from "./Zones"
import Creneaux from "./Creneaux"
import Zone from "./Zone"
import Creneau from "./Creneau"

const theme = createTheme();
const pages = [["Jeux","/jeux"],["Bénévoles","/benevoles"],["Zones","/zones"],["Créneaux","/creneaux"]]

function App() {
  return (
    <ThemeProvider theme={theme}>
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
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App