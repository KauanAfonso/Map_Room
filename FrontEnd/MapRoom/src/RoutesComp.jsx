import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Paginas/Login';
import { Home } from "./Paginas/Home";

export function RoutesComp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login/> } />
            </Routes>
        </BrowserRouter>
    );
}
