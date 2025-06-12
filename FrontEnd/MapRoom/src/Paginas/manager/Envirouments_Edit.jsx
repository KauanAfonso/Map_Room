import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './Subject_Edit.module.css';

const schemasReserva = z.object({
    data: z.string().min(1, 'Data é obrigatória'),
    periodo: z.enum(['M', 'T', 'N'], {
        errorMap: () => ({ message: "Escolha um período válido" }),
    }),
    sala_reservada: z.number({ invalid_type_error: "Sala é obrigatória" }),
    professor: z.number({ invalid_type_error: "Professor é obrigatório" }),
});

export function Envirouments_Edit() {
    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

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

                const reservaRes = await axios.get(`http://127.0.0.1:8000/api/reservas/${id}`, 
                    { headers: { Authorization: `Bearer ${token}` } 
                });
                reset(reservaRes.data);

                const profRes = await axios.get("http://127.0.0.1:8000/api/usuario/",
                    { headers: { Authorization: `Bearer ${token}` } 
                });
                setProfessores(profRes.data);

                const salasRes = await axios.get("http://127.0.0.1:8000/api/salas/",
                    { headers: { Authorization: `Bearer ${token}` } 
                });
                setSalas(salasRes.data);

            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }

        buscarDados();
    }, [id, reset, navigate]);

    async function onSubmit(data) {
        try {
            const token = localStorage.getItem('acess_token');
            const response = await axios.put(`http://127.0.0.1:8000/api/reservas/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("Reserva atualizada com sucesso!");
            navigate('/home');
        } catch (error) {
            console.error("Erro ao atualizar reserva", error);
            alert("Erro ao atualizar reserva");
        }
    }

    return (
        <div className='container'   style={{ marginTop: '4rem ', marginBottom: "4rem" }}>
            <form onSubmit={handleSubmit(onSubmit)} className={estilos.form}>
                <h2>Editar Reserva</h2>

                <label>Data</label>
                <input type="date" {...register("data")} />
                {errors.data && <p className='error'>{errors.data.message}</p>}

                <label>Período</label>
                <select {...register("periodo")}>
                    <option value="">Selecione</option>
                    <option value="M">Manhã</option>
                    <option value="T">Tarde</option>
                    <option value="N">Noite</option>
                </select>
                {errors.periodo && <p className='error'>{errors.periodo.message}</p>}

                <label>Sala</label>
                <select {...register("sala_reservada", { valueAsNumber: true })}>
                    <option value="">Selecione a sala</option>
                    {salas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </select>
                {errors.sala_reservada && <p className='error'>{errors.sala_reservada.message}</p>}

                <label>Professor</label>
                <select {...register("professor", { valueAsNumber: true })}>
                    <option value="">Selecione o professor</option>
                    {professores.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                            {prof.username}
                        </option>
                    ))}
                </select>
                {errors.professor && <p className='error'>{errors.professor.message}</p>}

                <div>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}
