import {UserProps} from "./App"

function Profil({user, setUser}:UserProps) {
    return (
        <div>
            <div>{user.polyuser_mail}</div>
            <div>{user.polyuser_prenom}</div>
        </div>
    )
}

export default Profil