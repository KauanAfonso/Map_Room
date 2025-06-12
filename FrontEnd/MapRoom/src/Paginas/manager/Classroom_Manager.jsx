import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import styles from "../Teachers/Teacher_Enviroument.module.css";
// Importação dos ícones do React Icons
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

export function Classroom_Manager() {
  const [salas, setsalas] = useState([]);
  const token = localStorage.getItem('acess_token');
  const navigate = useNavigate();
  if(!token){
        navigate('/')
  }

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/salas/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setsalas(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error("Erro ao buscar salas:", error);
    });

  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;

    const token = localStorage.getItem('acess_token');

    axios.delete(`http://127.0.0.1:8000/api/salas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      alert('Disciplina excluída com sucesso!');
      setsalas(prev => prev.filter(dis => dis.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir disciplina:', error);
      alert('Erro ao excluir a disciplina.');
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.filtro}>
        <h1>Salas disponíveis</h1>
        <Link to="/gestor/salas/register/">
          <FiPlus size={24} title="Adicionar" />
        </Link>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Capacidade de alunos</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {salas.map(sala => (
              <tr key={sala.id}>
                <td>{sala.nome}</td>
                <td>{sala.capacidade_alunos} alunos</td>
              <td>
                  <Link to={`/gestor/salas/editar/${sala.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(sala.id)}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
