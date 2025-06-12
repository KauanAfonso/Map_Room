import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../Teachers/Teacher_Enviroument.module.css";

// Importação dos ícones do React Icons
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

export function Subjects_Manager() {
  const [disciplinas, setDisciplinas] = useState([]);
  const token = localStorage.getItem('acess_token');
  const navigate = useNavigate();
  if(!token){
      navigate('/')
  }
  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/disciplinas/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDisciplinas(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error("Erro ao buscar disciplinas:", error);
    });

  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;

    const token = localStorage.getItem('acess_token');

    axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      alert('Disciplina excluída com sucesso!');
      setDisciplinas(prev => prev.filter(dis => dis.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir disciplina:', error);
      alert('Erro ao excluir a disciplina.');
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.filtro}>
        <h1>Disciplinas</h1>
        <Link to="/gestor/disciplinas/register/">
          <FiPlus size={24} title="Adicionar" />
        </Link>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Descrição</th>
              <th>Professor</th>
              <th>Carga Horária</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map(disciplina => (
              <tr key={disciplina.id}>
                <td>{disciplina.nome}</td>
                <td>{disciplina.curso}</td>
                <td>{disciplina.descricao}</td>
                <th>{disciplina.professor_name}</th>
                <td>{disciplina.carga_horaria}</td>
              <td>
                  <Link to={`/gestor/disciplinas/editar/${disciplina.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(disciplina.id)}
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
