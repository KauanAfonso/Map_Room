import { useState, useEffect } from "react";

export function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const token = localStorage.getItem('acess_token')
    useEffect(() => {
        async function getSubjects() {
            try {
                console.log(token)
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
            
        </div>
    )
}