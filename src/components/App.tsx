import "../style/App.css"
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import Home from "./Home"
import Benevoles from "./Benevoles"
import Jeux from "./Jeux"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Header from "./Header"
import Zones from "./Zones"
import Creneaux from "./Creneaux"

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
          <Route path="/creneaux" element={<Creneaux/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App