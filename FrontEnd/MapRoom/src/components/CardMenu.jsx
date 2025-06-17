
import styles from "./CardMenu.module.css";

/*
Esse componente será responsável
por ser o card do menu principal
onde recebe um icone uma legenda
*/

export function CardMenu({ icon: Icon, label }) {
    return (
        <div className={styles.card}>
            <div className={styles.div_inside}>
                <Icon aria-label={label} />
                <span>{label}</span>
            </div>
        </div>
    );
}
