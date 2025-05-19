import {useState } from "react";
import estilos from "./LoginForm.module.css";

export function LoginForm({onLogin, error}){

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

function handleLogin(e){
    e.preventDefault()
    onLogin({username, password})
}

return(
    <form onSubmit={handleLogin}>
        <div className={estilos.boas_vindas}>
            <h2>Seja Bem Vindo!</h2>
            <p>Acesse com sua conta</p>
        </div>
        <div className={estilos.div_content}>
            <label>Username: </label>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div className={estilos.div_content}>
            <label>Senha: </label>
            <input type="text" value={password} id="password" onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button type="submit">Enviar</button>
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Exibe a mensagem de erro */}
    </form>
)

}