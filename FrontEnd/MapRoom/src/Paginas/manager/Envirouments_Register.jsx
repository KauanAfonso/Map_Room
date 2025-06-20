import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Schema para validação dos dados do formulário de reserva 
const schemasReserva = z.object({
    data: z.string().min(1, 'Data é obrigatória'),
    periodo: z.enum(['M', 'T', 'N'], {
        errorMap: () => ({ message: "Escolha um período válido" }),
    }),
    sala_reservada: z.number({ invalid_type_error: "Sala é obrigatória" }),
    professor: z.number({ invalid_type_error: "Professor é obrigatório" }),
});
// Esse componente é responsável por registrar uma nova reserva de ambiente
export function Envirouments_Register() {
    const [salas, setSalas] = useState([]);
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemasReserva)
    });
    
    useEffect(() => {
        async function buscarDados() {
            try {
                const token = localStorage.getItem('acess_token');
                if (!token) navigate('/');

                const profRes = await axios.get("http://127.0.0.1:8000/api/usuario/",
                    { headers: { Authorization: `Bearer ${token}` } 
                });
                setProfessores(profRes.data);

                const salasRes = await axios.get("http://127.0.0.1:8000/api/salas/",
                    { headers: { Authorization: `Bearer ${token}` } 
                });
                console.log(salasRes.data)
                setSalas(salasRes.data);

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }

        buscarDados();
    }, [reset, navigate]);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('acess_token');
 
            const response = await axios.post(
                'http://127.0.0.1:8000/api/reservas/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Disciplina cadastrado com sucesso!', response.data);
            alert('Disciplina cadastrado com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao carregar dados', error);

            //Capturar a mensagem de erro do backend
            if (error.response && error.response.status === 400) {
                const resposta = error.response.data;

                //se tiver alguma messagem na respostas alertar ela
                if (resposta.non_field_errors && resposta.non_field_errors.length > 0) {
                    alert(resposta.non_field_errors[0]);
                } else {
                    alert("Erro ao carregar dados. Verifique os dados.");
                }
            } else {
                alert("Erro inesperado ao carregar dados");
            }
        }

    }
 
    return (
        <div className='container'style={{ marginTop: '4rem ', marginBottom: "4rem" }} >
            <form onSubmit={handleSubmit(obterDadosFormulario)}  >
                <h2>Cadastro de Reserva</h2>

                <label>Data</label>
                <input type="date" {...register('data')} />
                {errors.data && <p className='error'>{errors.data.message}</p>}

                <label>Período</label>
                <select {...register('periodo')}>
                    <option value="">Selecione o período</option>
                    <option value="M">Manhã</option>
                    <option value="T">Tarde</option>
                    <option value="N">Noite</option>
                </select>
                {errors.periodo && <p className='error'>{errors.periodo.message}</p>}

                <label>Sala</label>
                <select {...register('sala_reservada', { valueAsNumber: true })}>
                    <option value="">Selecione uma sala</option>
                    {salas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
                {errors.sala_reservada && <p className='error'>{errors.sala_reservada.message}</p>}

                <label>Professor</label>
                <select {...register('professor', { valueAsNumber: true })}>
                    <option value="">Selecione um professor</option>
                    {professores.map((prof) => (
                        prof.tipo === "P" && (
                            <option key={prof.id} value={prof.id}>
                                {prof.username}
                            </option>
                        )
                    ))}
                </select>
                {errors.professor && <p className='error'>{errors.professor.message}</p>}

                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}
