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
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [updateData, setupdateData] = useState(true);

  const abrirFecharModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalDeletar = () => {
    setModalDeletar(!modalDeletar);
  }

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);
    (opcao === "Editar") ?
      abrirFecharModalEditar(): abrirFecharModalDeletar();
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
      //setData(data.concat(response.data));
      abrirFecharModalIncluir();
      setupdateData(true);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const pedidoPut = async()=>{
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    
    await axios.put(baseUrl+"/"+alunoSelecionado.id, alunoSelecionado)
    .then( response => {
      /*var resposta = response.data;
      var dadosAuxiliar = data;
      dadosAuxiliar.map(aluno=>{
        if(aluno.id === alunoSelecionado.id){
          aluno.nome = resposta.nome;
          aluno.email = resposta.email;
          aluno.idade = resposta.idade;
        }
    });*/
      setupdateData(true);
      abrirFecharModalEditar();
    })
    .catch(error => {
      console.log(error);
    })
  }

  const pedidoDelete = async()=>{
    await axios.delete(baseUrl+"/"+alunoSelecionado.id)
    .then( response => {
      //setData(data.filter( aluno => aluno.id !== response.data));
      setupdateData(true);
      abrirFecharModalDeletar();
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    if(updateData){
      pedidoGet();
      setupdateData(false);
    }
  },[updateData]);

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
                <button className='btn btn-primary' onClick={()=> selecionarAluno(aluno, "Editar")}>Editar</button> {"  "}
                <button className='btn btn-danger' onClick={()=> selecionarAluno(aluno, "Deletar")}>Deletar</button>
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
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Aluno</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Id: </label>
            <br/>
            <input readOnly name='id'value={alunoSelecionado && alunoSelecionado.id} className='form-control' />
            <br/>
            <label>Nome: </label>
            <br/>
            <input type="text" name='nome' value={alunoSelecionado && alunoSelecionado.nome} onChange={handleChange} className='form-control' />
            <br/>
            <label>Email: </label>
            <br/>
            <input type="text" name='email' value={alunoSelecionado && alunoSelecionado.email} onChange={handleChange} className='form-control' />
            <br/>
            <label>Idade: </label>
            <br/>
            <input type="text" name='idade' value={alunoSelecionado && alunoSelecionado.idade} onChange={handleChange} className='form-control' />
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => abrirFecharModalEditar()}>Cancelar</button> {"   "}
          <button className='btn btn-primary' onClick={() => pedidoPut()}>Editar</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalDeletar}>
        <ModalHeader>Deletar Aluno</ModalHeader>
        <ModalBody>
          Tem certeza que deseja deletar o(a) anluno(a): {alunoSelecionado && alunoSelecionado.nome} ?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => abrirFecharModalDeletar()}>Cancelar</button> {"   "}
          <button className='btn btn-primary' onClick={() => pedidoDelete()}>Deletar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
