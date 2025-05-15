import styles from "./Menu.module.css";
import { FaChalkboardTeacher, FaSchool, FaBookOpen, FaUserTie } from "react-icons/fa";
import { CardMenu } from "./CardMenu";

export function Menu() {
    return (
        <div className={styles.container}>
            <CardMenu icon={FaBookOpen} label="Disciplinas" />
            <CardMenu icon={FaSchool} label="Ambientes" />
            <CardMenu icon={FaChalkboardTeacher} label="Professores" />
            <CardMenu icon={FaUserTie} label="Gestores" />
        </div>
        
    );
}
