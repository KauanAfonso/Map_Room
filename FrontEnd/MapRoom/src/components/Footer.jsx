import React from 'react';
import styles from './Footer.module.css';

export function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p className={styles.brand}>Minha Marca</p>
          <p className={styles.description}>Seu texto aqui, explicando o que você faz.</p>
        </div>

        <div className={styles.links}>
          <ul>
            <li><a href="/about" className={styles.link}>Sobre nós</a></li>
            <li><a href="/services" className={styles.link}>Serviços</a></li>
            <li><a href="/contact" className={styles.link}>Contato</a></li>
            <li><a href="/privacy" className={styles.link}>Política de Privacidade</a></li>
          </ul>
        </div>

        <div className={styles.socialMedia}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>LinkedIn</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 Minha Marca. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

