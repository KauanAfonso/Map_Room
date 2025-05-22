import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie, FaDoorClosed } from "react-icons/fa";
import { CardMenu } from "./CardMenu";

export function Menu() {
    const username = localStorage.getItem("username");
    return (
        <>
        <h1 className={styles.nome}>Olá {username}</h1>      
        <div className={styles.container}>
            <CardMenu icon={FaBookOpen} label="Disciplinas" />
            <CardMenu icon={FaSchool} label="Ambientes" />
            <CardMenu icon={FaChalkboardTeacher} label="Professores" />
            <CardMenu icon={FaUserTie} label="Gestores" />
            <CardMenu icon={FaDoorClosed} label="Salas" />
        </div>
        </>
    );
}
