import {useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from "react";


const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1, "informe um nome")
        .max(100, "Maximo 100 caracteres"),
    curso: z.string()
        .min(255, "Informe no maximo 255 caracteres"),
    cargaHoraria: z.number(
        {invalid_type_error: "Informe uma carga horaria"})
        .int("Digite um valor inteiro")
        .min(1, "informe um valor")
        .max(260, "Carga horária maxima é de 260h"),
    descricao:z.string()
    .min(1, "Informe a descrição")
    .max(255, "Informe no maximo 255 caracteres"),
    professor: z.number(
        {invalid_type_error: 'Selecione um professor'})
            .min(1,"Selecione um professor")
})


export function RegisterSubject(){
    const [professores, setProfessores] = useState([]);

    const{
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({
        resolver: zodResolver(schemaDisciplinas)
    });

    useEffect(()=>{

        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('acess_token');
                const response = await axios.get('http:/127.0.0.1:8000/api/usuario/', {
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });

                setProfessores(response.data);
            }catch(error){
                console.error("erro", error)
            }
        }

        buscarProfessores();
    }, [])

    async function obterDadosFormulario(data) {
        console.log("Dados no formularo", data)

        try{
            const token = localStorage.getItem('acess_token');
            const response = await axios.post(`http://127.0.0.1/api/disciplinas:8000`, data ,
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            );
            alert("Discciplna atualiada com sucesso !");
            reset()
        }catch(error){
            console.log("Erro", error)
            alert("Erro ao cadastrar")
        }
    }
}