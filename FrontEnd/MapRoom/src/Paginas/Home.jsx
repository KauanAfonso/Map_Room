import { Menu } from "../components/Menu"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

export function Home(){
    //Se o usuário não tiver logado navegue para '/'
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('acess_token');
        console.log("Token:", token);

        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Menu/>
    )
}
