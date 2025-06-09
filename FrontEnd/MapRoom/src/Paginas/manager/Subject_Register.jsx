import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

 
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
 
export function Subject_Register() {
 
    const [professores, setProfessores] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina)
    });
 
    useEffect(() => {
        async function buscarProfessores() {
            try {
                const token = localStorage.getItem('acess_token');
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfessores(response.data);
            } catch (error) {
                console.error("Erro ao carregar professores", error);
            }
        }
        buscarProfessores();
    }, []);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('acess_token');
 
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
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
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        }
    }
 
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2>Cadastro de Disciplina</h2>

                <label>Nome da Disciplina</label>
                <input {...register('nome')} placeholder="Materia" />
                {errors.nome && <p className='error'>{errors.nome.message}</p>}

                <label>Nome do curso</label>
                <input {...register('curso')} placeholder="Desenvolvimento de Sistema" />
                {errors.curso && <p className='error'>{errors.curso.message}</p>}

                <label>Carga horária</label>
                <input
                    type="number"
                    {...register('carga_horaria', { valueAsNumber: true })}
                    placeholder="75"
                />
                {errors.carga_horaria && <p className='error'>{errors.carga_horaria.message}</p>}

                <label>Descrição</label>
                <textarea
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5}
                />
                {errors.descricao && <p className='error'>{errors.descricao.message}</p>}

                <label>Professor</label>
                <select {...register('professor', { valueAsNumber: true })}>
                    <option value="">Selecione um professor</option>
                    {professores.map((prof) => (
                        prof.tipo == "P" &&(
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
