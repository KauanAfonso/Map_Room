import { Header } from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";

export function Layout() {

    const location = useLocation()
    const login_page = location.pathname != "/login"


    return (
        <>
        {login_page &&  <Header/>}
        <Outlet/>
        {login_page &&  <Footer/>}
        </>
    )

}
