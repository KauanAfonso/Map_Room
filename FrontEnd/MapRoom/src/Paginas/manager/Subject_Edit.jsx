import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './Subject_Edit.module.css';

// Schema para validação dos dados do formulário de disciplina 
const schemaDisciplina = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    curso: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    carga_horaria: z.number({
        invalid_type_error: 'Informe a cargahorária'})
        .int("Deve ser um número inteiro")
        .min(1, "A carga horária mínima é 1 hora")
        .max(260, "A carga horária máxima é 260 horas"),
    descricao: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(300, 'Informe até 300 caracteres'),
    professor: z.number({
        invalid_type_error: 'Selecione um professor'
                            }).min(1, 'Selecione um professor')
});
 
// Esse componente é responsável por editar uma disciplina existente
export function Subject_Edit() {
 
    const [professores, setProfessores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });
 
    useEffect(() => {
        // Função para buscar os professores e preencher o formulário com os dados da disciplina
        // com o ID fornecido na URL
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('acess_token');
                if(!token){
                        navigate('/')
                  }
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
                console.log(response.data)
                
                //Preenche o formulários com os dados do registro do ID
                 const resDisciplina = await axios.get(`http://127.0.0.1:8000/api/disciplinas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resDisciplina.data);
 
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores();
    }, []);
 
    // Função para obter os dados do formulário e enviar para a API
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('acess_token');
 
            const response = await axios.put(
                `http://127.0.0.1:8000/api/disciplinas/${id}`,
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
            navigate('/home');
 
        } catch (error) {
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        }
    }
 
    return (
        <div className='container'>
           
            <form onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2>Editar de Disciplina</h2>
                    <label>Nome da Disciplina</label>
                    <input
                        
                        {...register('nome')}
                        placeholder="Materia"
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
               
 
                    <label >Nome do curso</label>
                    <input
                        
                        {...register('curso')}
                        placeholder="Desenvolvimento de Sistema"
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
               
 
                    <label >Carga horária</label>
                    <input
                     type="number"
   
                        {...register('cargaHoraria', { valueAsNumber: true })}
                        placeholder="100"
                    />
                    {errors.cargaHoraria &&
                    <p>
                        {errors.cargaHoraria.message}
                    </p>}
               
 
                <label>Descrição</label>
                <textarea
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5}
                    />
                    {errors.descricao && <p>{errors.descricao.message}</p>}
               
                    <label >Professor</label>
                    <select
                    {...register('professor', { valueAsNumber: true })}>
                        <option  value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                                {prof.username}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}

                <div>
                    <button className={estilos.submitButton} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}