import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();
    const handle_logout = ()=>{
        localStorage.removeItem('acess_token');
        localStorage.removeItem('username');
        localStorage.removeItem('tipo');
        navigate('/');
    }
    return (
        <header>
            <nav className={styles.container}>
                <ul>
                    <li><Link to="/home">MapRoom</Link></li>
                    <li>Meus Agendamentos</li>
                    <li>Agendar Sala</li>
                    <li>Visualizar salas agendadas</li>
                    <li onClick={handle_logout}>Logout</li>
                </ul>
            </nav>
        </header>
    )
}