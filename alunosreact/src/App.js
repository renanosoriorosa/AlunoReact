import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png'

function App() {

  const baseUrl = "https://localhost:44393/api/aluno";
  const [data, setData] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email:'',
    idade:''
  });
  const [modalIncluir, setModalIncluir] = useState(false);

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado, [name]:value
    });
    console.log(alunoSelecionado);
  }

  const pedidoGet = async()=>{ 
    await axios.get(baseUrl)
    .then( response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const pedidoPost = async()=>{
    delete alunoSelecionado.id;
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    
    await axios.post(baseUrl, alunoSelecionado)
    .then( response => {
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
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
        <button className='btn btn-success' onClick={() => abrirFecharModalIncluir()}>Novo Aluno</button>
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
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <br/>
            <input type="text" name='nome' onChange={handleChange} className='form-control' />
            <br/>
            <label>Email: </label>
            <br/>
            <input type="text" name='email' onChange={handleChange} className='form-control' />
            <br/>
            <label>Idade: </label>
            <br/>
            <input type="text" name='idade' onChange={handleChange} className='form-control' />
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => abrirFecharModalIncluir()}>Cancelar</button> {"   "}
          <button className='btn btn-primary' onClick={() => pedidoPost()}>Incluir</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
