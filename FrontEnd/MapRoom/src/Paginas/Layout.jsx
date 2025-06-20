import { Header } from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";

export function Layout() {

    // const location = useLocation()
    // const login_page = location.pathname != "/login" //precisa ser verdadeiro , ou seja não ser a pagina de login
    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )

}
