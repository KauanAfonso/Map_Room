import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header>
            <nav className={styles.container}>
                <ul>
                    <li><Link to="/home">MapRoom</Link></li>
                    <li>Meus Agendamentos</li>
                    <li>Agendar Sala</li>
                    <li>Visualizar salas agendadas</li>
                    <li><Link to="/">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}