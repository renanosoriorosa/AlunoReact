import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png'

function App() {

  const baseUrl = "https://localhost:44393/api/aluno";
  const [data, setData] = useState([]);

  const pedidoGet = async()=>{ 
    await axios.get(baseUrl)
    .then( response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    pedidoGet();
  });

  return (
    <div className="App">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro}  alt='logo' />
        <button className='btn btn-success'>Novo Aluno</button>
      </header>
      <table className='table table-boerdered'>
        <thead>
          <tr>
            <td>Id</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Idade</td>
            <td>Operação</td>
          </tr>
        </thead>
        <tbody>
          {data.map (aluno => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button> {"  "}
                <button className='btn btn-danger'>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
