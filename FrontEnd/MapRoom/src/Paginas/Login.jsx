import {    LoginForm   } from "../components/LoginForm";
import styles from "./Login.module.css"
import imagemLogin from '../assets/imagem_login.png';

// Esse componente é responsável por renderizar a página de login
export function Login(){
    return (
        <>
            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.div_form}>
                        <LoginForm />
                    </div>
                    <div className={styles.div_img}>
                        <img src={imagemLogin} alt="" />
                    </div>
                </div>
            </div>
            
        </>
    )
}