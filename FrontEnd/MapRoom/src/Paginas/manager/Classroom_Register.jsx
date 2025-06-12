import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const schemasSala = z.object({
    nome: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    capacidade_alunos: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),

});
 
export function Classroom_Register() {
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemasSala)
    });
 
    const token = localStorage.getItem('acess_token');
    const navigate = useNavigate();
    if(!token){
            navigate('/')
    }
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/salas/',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('sala cadastrada com sucesso!', response.data);
            alert('sala cadastrada com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao cadastrar sala', error);
            alert("Erro ao cadastrar sala");
        }
    }
 
    return (
        <div className='container'>
           
            <form onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2>Criar Sala</h2>
                    <label>Nome da sala</label>
                    <input
                        {...register("nome")}
                        placeholder="Sala"
                    />
                    {errors.nome && <p className='error'>{errors.nome.message}</p>}
                
                    <label >Capacidade de alunos</label>
                    <input
                        type="number"
                        {...register("capacidade_alunos", { valueAsNumber: true })}
                        placeholder="Capacidade de Alunos"
                    />
                    {errors.capacidade_alunos && <p className='error'>{errors.capacidade_alunos.message}</p>}
               
                 <div>
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}
