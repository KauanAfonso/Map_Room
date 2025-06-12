import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "../Teachers/Teacher_Enviroument.module.css";
// Importação dos ícones do React Icons
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

export function User_Manager() {
  const [usuario, setUsuario] = useState([]);
  const token = localStorage.getItem('acess_token');
  const navigate = useNavigate();
  if(!token){
      navigate('/')
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsuario(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error("Erro ao buscar usuario:", error);
    });

  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
    if (!confirmar) return;
    axios.delete(`http://127.0.0.1:8000/api/usuario/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      alert('usuário excluído com sucesso!');
      setUsuario(prev => prev.filter(dis => dis.id !== id));
    })
    .catch(error => {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir a usuário.');
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.filtro}>
        <h1>Usuarios disponíveis</h1>
        <Link to="/gestor/usuario/register/">
          <FiPlus size={24} title="Adicionar" />
        </Link>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Ni</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Tipo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.ni}</td>
                <td>{user.email}</td>
                <th>{user.telefone}</th>
                <th>{user.tipo}</th>
              <td>
                  <Link to={`/gestor/usuario/editar/${user.id}`}>
                    <FiEdit size={20} title="Editar" />
                  </Link>
                  <FiTrash
                    size={20}
                    title="Excluir"
                    onClick={() => handleDelete(user.id)}
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
