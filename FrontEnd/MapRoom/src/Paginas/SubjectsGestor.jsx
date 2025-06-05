import axios from 'axios';
import React, { useState, useEffect } from 'react';

export function Disciplina() {
    const [disciplina, setDisciplinas] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('acsess_token');
        axios.get('http://127.0.0.1:8000/api/disciplinas/', {

        })
    }, [])
    return (
        
    )
}