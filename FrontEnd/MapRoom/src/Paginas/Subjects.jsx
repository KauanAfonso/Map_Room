import { useState, useEffect } from "react";
import { CardMenu } from "../components/CardMenu";

export function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const token = localStorage.getItem('acess_token')

    useEffect(() => {
        async function getSubjects() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/disciplinas/', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // <- Envia o token corretamente
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                console.log(data)
                setSubjects(data)
            } catch (erro) {
                console.log(erro)
            }
        }

        getSubjects()
    }, []);


    return (
        <div>
            <h1>Disciplinas:</h1>
            {subjects.map((sub, index) => {
                return(
                    
                    <ul>
                        <li key={index}> Nome: {sub.nome}</li><br />
                        <li>Curso: {sub.curso}</li><br />
                        <li>Professor resonsável: {sub.professor_name}</li>
                </ul>
                )
            })}
        </div>
    )
}