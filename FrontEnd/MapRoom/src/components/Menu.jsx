import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie, FaDoorClosed } from "react-icons/fa";
import { CardMenu } from "./CardMenu";
import { Link } from 'react-router-dom'


export function Menu() {
const username = localStorage.getItem("username");
    const tipo = localStorage.getItem("tipo");

    // Define rotas com base no tipo do usuário
    const link_disciplinas = tipo === 'P' ? '/disciplinas' : '/gestor/disciplinas';
    const link_ambientes = tipo === 'P' ? '/reservas' : '/gestor/reservas';
    const link_usuarios = tipo == 'P' ? '/a' : '/gestor/usuarios';
    const link_salas = tipo === 'P' ? '/salas' : '/gestor/salas';
 
    return (
        <div className={styles.container}>
            <h1 className={styles.nome}>Olá {username}</h1><br />
            <div className={styles.containerCard}>

                <Link to={link_disciplinas}>
                    <CardMenu icon={FaBookOpen} label="Disciplinas" />
                </Link>

                <Link to={link_ambientes}>
                    <CardMenu icon={FaSchool} label="Ambientes" />
                </Link>

                {/* Só exibe Professores e Gestores se tipo for 'G' */}
                {tipo === 'G' && (
                    <>
                        <Link to={link_usuarios}>
                            <CardMenu icon={FaChalkboardTeacher} label="Usuários" />
                        </Link>
                        <Link to="http://127.0.0.1:8000/admin/">
                            <CardMenu icon={FaUserTie} label="Administrador" />
                        </Link>
                    </>
                )}

                <Link to={link_salas}>
                    <CardMenu icon={FaDoorClosed} label="Salas" />
                </Link>
            </div>
        </div>
    );
}
