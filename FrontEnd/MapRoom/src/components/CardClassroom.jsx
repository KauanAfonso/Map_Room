import styles from "./Card.module.css";
import dayjs from 'dayjs';
import Button from "./Button";

/*
Esse componente será responsável
por ser o card de sala
*/
export function CardClassroom({ nome, capacidade_alunos}) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{nome}</h2>
            <p>Capacidade de Alunos: {capacidade_alunos}</p>
        </div>
    );
}
