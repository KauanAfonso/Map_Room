import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie, FaDoorClosed } from "react-icons/fa";
import { CardMenu } from "./CardMenu";
import { Link } from 'react-router-dom'


export function Menu() {
const username = localStorage.getItem("username");
    const tipo = localStorage.getItem("tipo");

    // Define rotas com base no tipo do usuário
    const linkDisciplinas = tipo === 'P' ? '/disciplinas' : '/gestor/disciplinas';
    const linkAmbientes = tipo === 'P' ? '/reservas' : '/gestor/reservas';

    return (
        <div className={styles.container}>
            <h1 className={styles.nome}>Olá {username}</h1><br />
            <div className={styles.containerCard}>
                <Link to={linkDisciplinas}>
                    <CardMenu icon={FaBookOpen} label="Disciplinas" />
                </Link>

                <Link to={linkAmbientes}>
                    <CardMenu icon={FaSchool} label="Ambientes" />
                </Link>

                {/* Só exibe Professores e Gestores se tipo for 'G' */}
                {tipo === 'G' && (
                    <>
                        <Link to="/professores">
                            <CardMenu icon={FaChalkboardTeacher} label="Professores" />
                        </Link>
                        <Link to="http://127.0.0.1:8000/admin/">
                            <CardMenu icon={FaUserTie} label="Gestores" />
                        </Link>
                    </>
                )}

                <Link to="/salas">
                    <CardMenu icon={FaDoorClosed} label="Salas" />
                </Link>
            </div>
        </div>
    );
}
