import { useState, useEffect } from "react";
import axios from "axios"
import { CardEnviroument } from "../../components/CardEnviroument";
import styles from "./Teacher_Enviroument.module.css";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { useNavigate } from "react-router-dom";


export function Teacher_Envirouments(){
    

    const [enviroument, setEnviroument] = useState([]);
    const [api, setApi] = useState('api/reservas/')
    const token = localStorage.getItem('acess_token');
    const navigate = useNavigate();
    if(!token){
        navigate('/')
    }

    const [mostrar_acoes, set_acoes] = useState(false);
    

    function handleToggle(isOn) {
        if (isOn) {
          setApi('api/professor/reservas/');
          set_acoes(true)
        } else {
            set_acoes(false)
            setApi('api/reservas/');
        }
        console.log("Toggle está", isOn ? "Ligado" : "Desligado");
      }
  
    useEffect(()=>{
     async function getEnvirouments(api) {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/${api}`,{
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
    getEnvirouments(api);
    }, [api])


    return (
        <div className={styles.container}>
            <div className={styles.filtro}>
                <h1>Agendamentos</h1>
                <ToggleSwitch label={"Meus agendamentos"}  onToggle={handleToggle}/>
            </div>

            <div className={styles.container_cards}>
                {enviroument.map((reserva, index) => (
                    <CardEnviroument key={index} sala={reserva.sala_nome} professor={reserva.professor_name} data={reserva.data} periodo={reserva.periodo} acoes={mostrar_acoes} id={reserva.id}/>
                ))}
            </div>
        </div>
    );
    
}

