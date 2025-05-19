import { use, useState } from "react"

export function LoginForm(){

const {username, setUsername} = useState('')
const {password, setPassword} = useState('')

return(

    <form action="">
        <label>Digite seu username: </label>
        <input type="text" value={username} />

        <label>Digite sua senha: </label>
        <input type="text" value={password} />

        <button type="submit">Enviar</button>
    </form>
)

}