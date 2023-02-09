import {useState, useEffect} from "react"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"

interface zone {
    zone_id: number,
    zone_name: string
}

function ZoneBenevoles({zone_id,zone_name}:zone) {

    const [benevoles, setBenevoles] = useState([])

    useEffect(() => {
        getBenevoles()
    },[])

    async function getBenevoles() {
        const res = await fetch(`http://localhost:5000/benevole/zone/${zone_id}`)
        const parseRes = await res.json()
        setBenevoles(parseRes)
    }

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader title={zone_name}/>
            <CardContent sx={{ flexGrow: 1 }}>
                {benevoles.map(({benevole_id,benevole_nom,benevole_prenom,benevole_mail}) => 
                    <Typography key={benevole_id} gutterBottom>{benevole_prenom + " " + benevole_nom}</Typography>
                )}
            </CardContent>
        </Card>
    )
}

export default ZoneBenevoles