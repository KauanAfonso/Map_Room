import styles from "./Card.module.css";
import dayjs from 'dayjs';
import Button from "./Button";

export function CardSubjects({ curso, descricao, carga_horaria, nome}) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{nome}</h2>
            <p>Descricao: {descricao}</p>
            <p>Curso: {curso}</p>
            <p>Carga Horária: {carga_horaria}</p>
        </div>
    );
}
