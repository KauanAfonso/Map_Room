import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from '../Paginas/Login';
import { Home } from "../Paginas/Home";
import { Layout } from "../Paginas/Layout";
import { Subjects } from "../Paginas/Subjects";
export function RoutesComp() {
    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path='/disciplinas' element={<Subjects/>} />
            </Route>
        </Routes>
    );
}
