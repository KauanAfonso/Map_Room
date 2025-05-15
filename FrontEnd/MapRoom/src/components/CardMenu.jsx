
import styles from "./CardMenu.module.css";

//This component makes an card that acepet as paramters an icon and label
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
