import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from '../Paginas/Login';
import { Home } from "../Paginas/Home";
import { Layout } from "../Paginas/Layout";

import { Teacher_subjects } from "../Paginas/Teachers/Teacher_subjects";
import { Teacher_Envirouments } from "../Paginas/Teachers/Teacher_Envirouments";


import {Classroom_Manager} from "../Paginas/manager/Classroom_Manager";
import { Subjects_Manager} from "../Paginas/manager/Subjects_Manager";
import { Subject_Edit } from "../Paginas/manager/Subject_Edit";
import { Subject_Register } from "../Paginas/manager/Subject_Register";

export function RoutesComp() {
    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path='/disciplinas' element={<Teacher_subjects/>} />
                <Route path='/Reservas' element={<Teacher_Envirouments/>} />

                <Route path='/gestor/disciplinas' element={<Subjects_Manager/>}/>
                <Route path='/gestor/disciplinas/editar/:id' element={<Subject_Edit/>}/>
                <Route path='/gestor/disciplinas/criar/' element={<Subject_Register/>}/>

                <Route path='/gestor/salas' element={<Classroom_Manager/>}/>

            </Route>
        </Routes>
    );
}
