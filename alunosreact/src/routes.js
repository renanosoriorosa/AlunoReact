import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Alunos from './pages/Alunos';
import NovoAluno from './pages/NovoAluno';

export default function Routes(){
    return (
        <BrowserRouter>
            <React.StrictMode>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/alunos" component={Alunos} />
                    <Route exact path="/aluno/novo/:alunoId" component={NovoAluno} />
                </Switch>
            </React.StrictMode>
        </BrowserRouter>
    );
}