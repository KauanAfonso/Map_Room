import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import estilos from './Subject_Edit.module.css';

 // Schema para validação dos dados do formulário de usuário
const schemasUser = z.object({
    username: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    ni: z.number()
        .int("Deve ser um número inteiro")
        .min(1, 'Informe ao menos um caractere'),
    email: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(100, 'Informe até 100 caracteres'),
    telefone: z.string()
        .min(1, 'Informe ao menos um caractere')
        .max(23, 'Informe até 100 caracteres'),
    password: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula.')
        .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula.')
        .regex(/[0-9]/, 'Deve conter ao menos um número.')
        .regex(/[^a-zA-Z0-9]/, 'Deve conter ao menos um caractere especial.'),        
    tipo: z.string({
        invalid_type_error: 'Selecione um tipo'
                            }).min(1, 'Selecione um tipo')

});

// Esse componente é responsável por editar um usuário existente
export function User_Edit(){
    const[usuario, setusuario] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemasUser)
    });
 
    useEffect(() => {
        async function buscarusuario() {
            try {
                const token = localStorage.getItem('acess_token');
                if(!token){
                    navigate('/')
                }
                const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setusuario(response.data);
                reset(response.data); // Agora sim: response.data é o objeto da usuario

            } catch (error) {
                console.error("Erro ao carregar a usuario", error);
            }
        }

        buscarusuario();
    }, [id, reset]);
 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('acess_token');
 
            const response = await axios.put(
                `http://127.0.0.1:8000/api/usuario/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('usuario atualizada com sucesso!', response.data);
            alert('usuario atualizado com sucesso!');
            reset();
            navigate('/home');
 
        } catch (error) {
            console.error('Erro ao cadastrar usuario', error);
            alert("Erro ao cadastrar usuario");
        }
    }
 
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2>Criar Usuário</h2>
                    <label>Username</label>
                    <input
                        {...register("username")}
                        placeholder="Username"
                    />
                    {errors.nome && <p className='error'>{errors.nome.message}</p>}
                
                    <label >NI</label>
                    <input
                        type="number"
                        {...register("ni", { valueAsNumber: true })}
                        placeholder="ni"
                    />
                    {errors.ni && <p className='error'>{errors.ni.message}</p>}
               
                    <label >Email</label>
                    <input
                        {...register("email")}
                        placeholder="email"
                    />
                    {errors.email && <p className='error'>{errors.email.message}</p>}

                <label>Telefone</label>
                <input
                    type="tel"
                    {...register("telefone")}
                    placeholder="(99) 99999-9999"
                />
                {errors.telefone && <p className='error'>{errors.telefone.message}</p>}

                <label>Senha</label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Mínimo de 6 caracteres"
                />
                {errors.password && <p className='error'>{errors.password.message}</p>}


                <label>Tipo de Usuário</label>
                <select {...register("tipo")}>
                    <option value="">Selecione o tipo</option>
                    <option value="P">Professor</option>
                    <option value="G">Gestor</option>
                </select>
                {errors.tipo && <p className='error'>{errors.tipo.message}</p>}

                 <div>
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}