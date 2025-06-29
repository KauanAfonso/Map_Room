import React from 'react';
import styles from './Footer.module.css';
import logo from '../assets/logo.png'; // uso recomendado para importar imagens


/*
Esse componente é referente ao footer do site
contém a logo e links importantes
*/
export function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
            <img class='logo' src={logo} alt="aaa" />
          <p className={styles.description}>MapRoom, gerenciando sua escola.</p>
        </div>

        <div className={styles.links}>
          <ul>
            <li><a href="#" className={styles.link}>Sobre nós</a></li>
            <li><a href="#" className={styles.link}>Serviços</a></li>
            <li><a href="#" className={styles.link}>Contato</a></li>
            <li><a href="#" className={styles.link}>Política de Privacidade</a></li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.icon}>Facebook</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.icon}>Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.icon}>LinkedIn</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 Minha Marca. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

