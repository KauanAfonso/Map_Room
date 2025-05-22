import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie, FaDoorClosed } from "react-icons/fa";
import { CardMenu } from "./CardMenu";
import { Link } from 'react-router-dom'

export function Menu() {
    const username = localStorage.getItem("username");
    return (
        <>
        <h1 className={styles.nome}>Olá {username}</h1>      
        <div className={styles.container}>
            <Link to="/disciplinas"><CardMenu icon={FaBookOpen} label="Disciplinas" /></Link>
            <CardMenu icon={FaSchool} label="Ambientes" />
            <CardMenu icon={FaChalkboardTeacher} label="Professores" />
            <CardMenu icon={FaUserTie} label="Gestores" />
            <CardMenu icon={FaDoorClosed} label="Salas" />
        </div>
        </>
    );
}
