import { useEffect, useState } from 'react';
import style from './Modal.module.css'
import axios from 'axios';

export function Teacher_update({ element, id_enviroument ,token, id}) {

    const [ambiente, setAmbiente] = useState({
        data: "",
        professor: undefined,  // ou 0
        periodo: "",
        sala_reservada: undefined
    });
      

    const [professores, setProfessores] = useState([]);
    const [salas, setSalas] = useState([]);

    
    //caso for nulo, retorna null, ou seja não renderiza nada.
    if (!element) {
        return null
    }
    console.log(element);


    useEffect(() => {
        async function fetchData() {
            try {
                const [reservaResponse, professoresResponse, salasResponse] = await Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/reservas/${id_enviroument}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    axios.get('http://127.0.0.1:8000/api/usuario', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    axios.get('http://127.0.0.1:8000/api/salas', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ]);

                setAmbiente(reservaResponse.data);
                setProfessores(professoresResponse.data);
                setSalas(salasResponse.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [id_enviroument, token]);
    
    async function handle_update(e){
        e.preventDefault(); // impedir o envio padrão do formulário
        try {
            const response = await axios.put(`http://127.0.0.1:8000/reservas/${id}`, ambiente, {
                headers: {
                    'Authorization': `Bearer ${token}`, // <- Envia o token corretamente
                    'Content-Type': 'application/json'
                }
            })
            console.log("Atualizado com sucesso:", response.data);
        } catch (error) {
            console.log(error)
        }
    }



    //retorna o modal com as informações do filme ou série selecionada. Utiliza onCloe para fechar o modal.
    return (
        <div className={style.modalback}>
            <div className={style.modalContainer}>
                <form onSubmit={handle_update}>
                    <input
                        type="date"
                        name="data"
                        value={ambiente.data}
                        onChange={(e) => setAmbiente({ ...ambiente, data: e.target.value })}
                    />

                    <select
                        name="professor"
                        value={ambiente.professor}
                        onChange={(e) => setAmbiente({ ...ambiente, professor: e.target.value })}
                    >
                        <option value="">Selecione</option>
                        {professores.map(prof => {
                                return (
                                <option key={prof.id} value={prof.id}>
                                        {prof.nome}
                                </option>
                            )
                        })}

                    </select>

                    <input
                        type="text"
                        name="periodo"
                        value={ambiente.periodo}
                        onChange={(e) => setAmbiente({ ...ambiente, periodo: e.target.value })}
                    />

                    <select
                        name="sala_reservada"
                        value={ambiente.sala_reservada}
                        onChange={(e) => setAmbiente({ ...ambiente, sala_reservada: e.target.value })}
                    >
                    <option value="">Selecione</option>
                        {salas.map(sala => {
                            return(
                            <option value={sala.id} key={sala.id}>
                                {sala.nome}
                                </option>
                            )
                        })}
  
                    </select>
                
                    <button type="submit">Atualizar</button>

                </form>
            </div>
        </div>
    );
}