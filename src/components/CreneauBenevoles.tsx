import {useState, useEffect} from "react"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"

interface creneau {
    creneau_id: number,
    creneau_debut: Date,
    creneau_fin: Date
}

function CreneauBenevoles({creneau_id,creneau_debut,creneau_fin}:creneau) {

    const [benevoles, setBenevoles] = useState([])

    useEffect(() => {
        getBenevoles()
    },[])

    async function getBenevoles() {
        const res = await fetch(`http://localhost:5000/benevole/creneau/${creneau_id}`)
        const parseRes = await res.json()
        setBenevoles(parseRes)
    }

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader title={creneau_debut.toString().slice(0,16).replace("T"," ") + " - " + creneau_fin.toString().slice(0,16).replace("T"," ")}/>
            <CardContent sx={{ flexGrow: 1 }}>
                {benevoles.map(({benevole_id,benevole_nom,benevole_prenom,benevole_mail}) => 
                    <Typography key={benevole_id} gutterBottom>{benevole_prenom + " " + benevole_nom}</Typography>
                )}
            </CardContent>
        </Card>
    )
}

export default CreneauBenevoles