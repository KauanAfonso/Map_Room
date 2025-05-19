import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie } from "react-icons/fa";
import { CardMenu } from "./CardMenu";

export function Menu() {
    return (
        <>
        <h1 className={styles.nome}>Olá Kauan AFonso</h1>
        <div className={styles.container}>
            <CardMenu icon={FaBookOpen} label="Disciplinas" />
            <CardMenu icon={FaSchool} label="Ambientes" />
            <CardMenu icon={FaChalkboardTeacher} label="Professores" />
            <CardMenu icon={FaUserTie} label="Gestores" />
        </div>
        </>
    );
}
