import estilos from "./LoginForm.module.css";
import axios from "axios";
//A junção dessas 3 bibliotecas faz a validação
//do formulario, eles são tipo uma venda casada,
//um funciona baseado no outro
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";


export function LoginForm() {
    const navigate = useNavigate();
    const schemaLogin = z.object({
        username: z.string()
            .min(1, "informe seu usuário")
            .max(30, "Informe no maximo 30 caracteres"),
        password: z.string()
            .min(1, "Informe ao menos um caracteres")
            .max(15, "informe no maximo de 15 caracteres")
    })

    //registra todas as informações que são dadas pelo usuário
    // e tenta resolver de acordo com o schema
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        { resolver: zodResolver(schemaLogin) }
    );

    async function getDados(data) {
        console.log(`Dados ${data}`)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });

            const { access, refresh, user } = response.data;

            localStorage.setItem('acess_token', access)
            localStorage.setItem('refresh_token', refresh)
            localStorage.setItem('tipo', user.tipo)
            localStorage.setItem('username', user.username)

            console.log("Login efetuado com sucesso !")
            navigate("/home")

        } catch (err) {
            console.error("Deu ruim: ", err)
            alert("Dados inválidos")
        }
    }

    return (
        <form onSubmit={handleSubmit(getDados)}>
            <div className={estilos.boas_vindas}>
                <h2>Seja Bem Vindo!</h2>
                <p>Acesse com sua conta</p>
            </div>
            <div className={estilos.div_content}>
                <label>Username: </label>
                <input type="text" {...register('username')} placeholder="kauanafonso14" />
            </div>
            {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

            <div className={estilos.div_content}>
                <label>Senha: </label>
                <input type="password" {...register('password')} placeholder="password" />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>
            <button type="submit">Enviar</button>
            {/* {error && <div style={{ color: 'red' }}>{error}</div>} Exibe a mensagem de erro */}

        </form>
    )

}