import styles from "./Card.module.css";
import dayjs from 'dayjs';
import Button from "./Button";
import { useState } from 'react';
import axios from "axios";


export function CardEnviroument({ professor, sala, periodo, data, acoes, id }) {
    
    const token = localStorage.getItem('acess_token');

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Sala: {sala}</h2>
            <p>Professor:   {professor}</p>
            <p>Data: {dayjs(data).format("D-MM-YYYY")}</p>
            <p>Período: {periodo === "M" ? " Manhã" : periodo === "T" ? " Tarde" : " Noite"}</p>
        </div>
    );
}
