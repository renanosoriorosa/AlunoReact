import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Alunos from './pages/Alunos';

export default function Routes(){
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route exact path="/alunos" component={Alunos} />
        </BrowserRouter>
    );
}