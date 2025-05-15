import style from './Navbar.module.css';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className={style.container}>  
            <ul>
                <li>Meus Agendamentos</li>
                <li>Agendar Sala</li>
                <li>Visualizar salas agendadas</li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
               
            </ul>
        </nav>
    )
}