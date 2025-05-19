import {LoginForm} from "../components/LoginForm";
import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css"
import imagemLogin from '../assets/imagem_login.png';

export function Login(){

    const [error, setSerror] = useState('');

    function handleLogin({username, password}){
        console.log('Usuário:', username);
        console.log('Senha:', password);

        axios.post("http://127.0.0.1:8000/api/login/",{
            username: username,
            password:password
        })
        .then((response) => console.log(response))
        .catch((err) => {
            if (err.response && err.response.status === 401) {
              setSerror("Credenciais inválidas. Tente novamente");
            }
        });
}
    return (
        <>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.div_form}>
                        <LoginForm onLogin={handleLogin} error={error}/>
                    </div>
                    <div className={styles.div_img}>
                        <img src={imagemLogin} alt="" />
                    </div>
                </div>
            </div>
            
        </>
    )
}