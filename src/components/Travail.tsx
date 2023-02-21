import {UserProps} from "./App"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

function Travail({user, setUser}:UserProps) {

    const {id} = useParams()

    const [benevole, setBenevole] = useState({
        benevole_id:0,
        benevole_nom:"",
        benevole_prenom:"",
        benevole_mail:""
    })

    async function getBenevole() {
        const res = await fetch(`http://localhost:5000/benevole/${id}`)
        const parseRes = await res.json()
        setBenevole(parseRes)
    }

    return (
        <div>Travail</div>
    )
}

export default Travail