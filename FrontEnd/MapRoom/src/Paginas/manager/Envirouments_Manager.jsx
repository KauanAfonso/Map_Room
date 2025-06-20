import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../Teachers/Teacher_Enviroument.module.css";

// Importação dos ícones do React Icons
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';

// Esse componente é responsável por listar as reservas de ambientes
// Ele busca as reservas da API e exibe em uma tabela, permitindo editar ou excluir cada reserva
export function Envirouments_Manager() {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('acess_token');
  const navigate = useNavigate();
  if(!token){
      navigate('/')
  }
  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/reservas/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setReservas(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error("Erro ao buscar reservas:", error);
    });

  }, []);

  // Função para lidar com a exclusão de uma reserva
  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;

    const token = localStorage.getItem('acess_token');

    axios.delete(`http://127.0.0.1:8000/api/reservas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      alert('reserva excluída com sucesso!');
      setReservas(prev => prev.filter(dis => dis.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir reserva:', error);
      alert('Erro ao excluir a reserva.');
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.filtro}>
        <h1>Reservas de ambientes</h1>
        <Link to="/gestor/reservas/register/">
          <FiPlus size={24} title="Adicionar" />
        </Link>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
    <table>
    <thead>
        <tr>
        <th>ID</th>
        <th>Data</th>
        <th>Período</th>
        <th>Professor</th>
        <th>Sala</th>
        <th>Ações</th>
        </tr>
    </thead>
    <tbody>
        {reservas.map((reserva) => (
        <tr key={reserva.id}>
            <td>{reserva.id}</td>
            <td>{reserva.data}</td>
            <td>
                {reserva.periodo === "M"
                ? "Manhã"
                : reserva.periodo === "T"
                ? "Tarde"
                : reserva.periodo === "N"
                ? "Noite"
                : "Período desconhecido"}
            </td>
            <td>{reserva.professor_name}</td>
            <td>{reserva.sala_nome}</td>
            <td>
            <Link to={`/gestor/reservas/editar/${reserva.id}`}>
                <FiEdit size={20} title="Editar" />
            </Link>
            <FiTrash
                size={20}
                title="Excluir"
                onClick={() => handleDelete(reserva.id)}
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
