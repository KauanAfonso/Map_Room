import axios from "axios";
import React, { useState, useEffect, useCallback } from 'react';
import { CardSubjects } from "../../components/CardSubjects";
import styles from "./Teacher_subjects.module.css";

export function Teacher_Classroom() {
  const [Salas, setSalas] = useState([]);

  const token = localStorage.getItem('acess_token');

  // Função que busca as Salas com base no endpoint atual
  const fetchSalas = useCallback(() => {
    axios.get('http://127.0.0.1:8000/api/salas/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSalas(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar Salas:", error);
    });
  }, [token]);

  // Atualiza as Salas quando o endpoint muda
  useEffect(() => {
    fetchSalas();
  }, [fetchSalas]);


  return (
        <div className={styles.container}>
            <div className={styles.filtro}>
                <h1>Salas disponíveis</h1>
            </div>

            <div className={styles.container_cards}>
              {Salas.map((sala, index) => (
                <CardSubjects
                  key={index}
                  nome={sala.nome}
                  capacidade_alunos={sala.capacidade_alunos}
                />
              ))}
            </div>
        </div>
  );
}
