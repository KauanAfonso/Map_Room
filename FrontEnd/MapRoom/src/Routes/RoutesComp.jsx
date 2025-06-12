import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from '../Paginas/Login';
import { Home } from "../Paginas/Home";
import { Layout } from "../Paginas/Layout";

import { Teacher_subjects } from "../Paginas/Teachers/Teacher_subjects";
import { Teacher_Envirouments } from "../Paginas/Teachers/Teacher_Envirouments";
import { Teacher_Classroom } from "../Paginas/Teachers/Teacher_Classroom";

import { User_Edit } from "../Paginas/manager/User_Edit";
import { User_Register } from "../Paginas/manager/User_Register";
import { User_Manager } from "../Paginas/manager/User_Manager";

import {Classroom_Register} from "../Paginas/manager/Classroom_Register";
import {Classroom_Manager} from "../Paginas/manager/Classroom_Manager";
import {Classroom_edit} from "../Paginas/manager/Classroom_edit";

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
                <Route path="/salas" element={<Teacher_Classroom/>} />

                <Route path='/gestor/disciplinas' element={<Subjects_Manager/>}/>
                <Route path='/gestor/disciplinas/editar/:id' element={<Subject_Edit/>}/>
                <Route path='/gestor/disciplinas/criar/' element={<Subject_Register/>}/>

                <Route path='/gestor/salas' element={<Classroom_Manager/>}/>
                <Route path="/gestor/salas/editar/:id" element={<Classroom_edit/>}/>
                <Route path="/gestor/salas/register/" element={<Classroom_Register/>}/>

                <Route path='/gestor/usuarios' element={<User_Manager/>}/>
                <Route path="/gestor/usuario/register/" element={<User_Register/>}/>
                <Route path="/gestor/usuario/editar/:id" element={<User_Edit/>}/>
            </Route>
        </Routes>
    );
}
