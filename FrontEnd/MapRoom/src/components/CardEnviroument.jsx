import styles from "./CardEnviroument.module.css";
import dayjs from 'dayjs';

export function CardEnviroument({ professor, sala, periodo, data }) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Sala: {sala}</h2>
            <p>Professor:   {professor}</p>
            <p>Data: {dayjs(data).format("D-MM-YYYY")}</p>
            <p>Período: {periodo === "M" ? " Manhã" : periodo === "T" ? " Tarde" : " Noite"}</p>
        </div>
    );
}
