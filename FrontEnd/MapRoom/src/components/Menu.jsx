import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie, FaDoorClosed } from "react-icons/fa";
import { CardMenu } from "./CardMenu";
import { Link } from 'react-router-dom'

export function Menu() {
    const username = localStorage.getItem("username");
    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.nome}>Olá {username}</h1>      
                <div className={styles.containerCard}>
                    <Link to="/disciplinas"><CardMenu icon={FaBookOpen} label="Disciplinas" /></Link>
                    <Link to="/reservas"><CardMenu icon={FaSchool} label="Ambientes" /></Link>
                    <CardMenu icon={FaChalkboardTeacher} label="Professores" />
                    <CardMenu icon={FaUserTie} label="Gestores" />
                    <CardMenu icon={FaDoorClosed} label="Salas" />
                </div>
        </div>
        </>
    );
}
