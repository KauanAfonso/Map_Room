import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from '../Paginas/Login';
import { Home } from "../Paginas/Home";
import { Layout } from "../Paginas/Layout";

export function RoutesComp() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
}
