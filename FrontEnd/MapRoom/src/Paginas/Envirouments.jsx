import { useState, useEffect } from "react";
import axios from "axios"

export function Envirouments(){

    const [enviroument, setEnviroument] = useState([]);
    const token = localStorage.getItem('acess_token');

    useEffect(()=>
     async function getEnvirouments() {
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/reservas/',{
                headers:{
                        'Authorization': `Bearer ${token}`, // <- Envia o token corretamente
                        'Content-Type': 'application/json'
                }
            })
            console.log(response.data)

        }catch(err){
            console.log("Erro" + err)
        }
        
        getEnvirouments();
        
    }, [])  


}