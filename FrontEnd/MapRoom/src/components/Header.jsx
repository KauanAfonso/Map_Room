import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // uso recomendado para importar imagens
export function Header() {
    //Fazendo o logout se o usuario clicar em logout
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
                    <li><Link to="/home"><img class='logo' src={logo} alt="aaa" /></Link></li>
                    <li>Meus Agendamentos</li>
                    <li>Agendar Sala</li>
                    <li>Visualizar salas agendadas</li>
                    <li style={{cursor:"pointer"}} onClick={handle_logout}>Logout</li>
                </ul>
            </nav>
        </header>
    )
}