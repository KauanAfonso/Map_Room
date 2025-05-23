import { useState, useEffect } from "react";
import axios from "axios"
import { CardEnviroument } from "../components/CardEnviroument";
import { data } from "react-router-dom";
import styles from "./Envirouments.module.css";
import { ToggleSwitch } from "../components/ToggleSwitch";

export function Envirouments(){

    const [enviroument, setEnviroument] = useState([]);
    const [filtrar_en, setFiltrar_env] = useState('api/reservas/')
    const token = localStorage.getItem('acess_token');

    function handleToggle(isOn) {
        if (isOn) {
          setFiltrar_env('api/professor/reservas/');
        } else {
          setFiltrar_env('api/reservas/');
        }
        console.log("Toggle está", isOn ? "Ligado" : "Desligado");
      }

    useEffect(()=>{
     async function getEnvirouments(filtrar_en) {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/${filtrar_en}`,{
                headers:{
                        'Authorization': `Bearer ${token}`, // <- Envia o token corretamente
                        'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            setEnviroument(response.data);
        }catch(err){
            console.log("Erro" + err)
        }
    }
    getEnvirouments(filtrar_en);   
    }, [filtrar_en])  

    return (
        <div className={styles.container}>
            <div className={styles.filtro}>
                <h1>Agendamentos</h1>
                <ToggleSwitch label="Meus agendamentos" onToggle={handleToggle} />
            </div>

            <div className={styles.container_cards}>
                {enviroument.map((reserva, index) => (
                    <CardEnviroument key={index} sala={reserva.sala_nome} professor={reserva.professor_name} data={reserva.data} periodo={reserva.periodo}/>
                ))}
            </div>
        </div>
    );
    
}