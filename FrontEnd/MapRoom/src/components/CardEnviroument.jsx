import styles from "./CardEnviroument.module.css";
import dayjs from 'dayjs';
import Button from "./Button";
import { useState } from 'react';
import axios from "axios";
import { Teacher_update } from '../components/modais/Teacher_update';

export function CardEnviroument({ professor, sala, periodo, data, acoes, id }) {
    


    const [selected_element, set_selected_element] = useState(null);
    const [showModal, setShowModal] = useState(false);

    //MODAL
    function handle_modal(id) {
        setShowModal(true)
        set_selected_element(id)
    }

    const token = localStorage.getItem('acess_token');

    async function ambiente_deletado(id){
      try{
      
        const response = await axios.delete(`http://127.0.0.1:8000/api/reservas/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,  // Envia o token JWT
            "Content-Type": "application/json"
        }
        });
        console.log(response.data);
        alert('Ambiente deletado com sucesso')
  
        }
    catch(error){
        console.log(error)
    }
    }


    function delete_card(id){
        const escolha = confirm("Are you sure to delete this envivorument? ");
        if(escolha){
            ambiente_deletado(id)
        }

    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Sala: {sala}</h2>
            <p>Professor:   {professor}</p>
            <p>Data: {dayjs(data).format("D-MM-YYYY")}</p>
            <p>Período: {periodo === "M" ? " Manhã" : periodo === "T" ? " Tarde" : " Noite"}</p>
            {acoes && (
                <div className="acoes">
                <Button color="# #00807c" text="Editar" function_action={() =>handle_modal(id)} />
                <Button color="#E0031A" text="Excluir" function_action={() =>delete_card(id)} />
                </div>
            )}
            
            {showModal && (
                <Teacher_update
                    id_enviroument={selected_element} // o ID da reserva
                    token={token}
                    element={true} // só para ativar o modal, pode ser true/false
                    onClose={() => setShowModal(false)}
                />
            )}
            
        </div>
    );
}
