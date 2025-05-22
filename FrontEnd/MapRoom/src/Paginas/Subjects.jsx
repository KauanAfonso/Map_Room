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
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>Professor Responsável</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((sub, index) => (
                    <tr key={index}>
                        <td>{sub.nome}</td>
                        <td>{sub.curso}</td>
                        <td>{sub.professor_name}</td>
                    </tr>
                    ))}
                </tbody>
        </table>

        </div>
    )
}