import {React, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from './../../services/api';
import {FiXCircle, FiEdit, FiUserX } from 'react-icons/fi'
import './styles.css';
import logoCadastro from '../../assets/cadastro.png';

export default function Alunos(){

    const [searchInput, setsearchInput] = useState('');
    const [filtro, setfiltro] = useState([]);

    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useHistory();

    const authorization = {
        headers : {
            Authorization: 'Bearer '+token,
        }
    }

    useEffect(() => {
        api.get('api/aluno', authorization)
        .then(
            response => {setAlunos(response.data);}
        , token)
    });

    async function logout(){
        try{
            localStorage.clear();
            localStorage.getItem('token', '');
            authorization.headers='';
            history.push('/');
        }catch(error){
            alert('erro ao deslogar '+error);
        }
    }

    async function editAluno(id){
        try{
            history.push(`aluno/novo/${id}`);
        }catch(error){
            alert('falha ao editar '+error);
        }
    }

    const searchAlunos = (searchValue) => {
        setsearchInput(searchValue);
        if(searchInput !== ''){
            const dadosFiltrados = alunos.filter( item => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
            });
            setfiltro(dadosFiltrados);
        }else{
            setfiltro(alunos);
        }
    }

    async function deleteAluno(id){
        try {
            if(window.confirm('Deseja mesmo deletar o aluno de id '+id+'?')){
                await api.delete(`api/aluno/${id}`,authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            }
        } catch (error) {
            alert('falha ao deletar '+ error);
        }
    }

    return(
        <div className='aluno-container'>
            <header>
                <img src={logoCadastro} alt="logoCadastro" />
                <span>Bem-Vindo, <strong>{email}</strong>!</span>
                <Link className='button' to="aluno/novo/0">Novo Aluno</Link>
                <button onClick={logout} type='button'>
                    <FiXCircle size={35} color="#17202a"/>
                </button>
            </header>
            <form>
                <input type="text" 
                    placeholder='Filtrar por nome...'
                    onChange={(e) => searchAlunos(e.target.value)}
                />
            </form>
            <h1>Relação de Alunos</h1>
            {searchInput.length > 1 ? (
                <ul>
                {filtro.map(aluno => 
                    (
                        <li key={aluno.id}>
                            <b>Nome: </b>{aluno.nome}<br/><br/>
                            <b>Email: </b>{aluno.email}<br/><br/>
                            <b>Idade: </b>{aluno.idade}<br/><br/>
                            <button onClick={() => editAluno(aluno.id)} type='button'>
                                <FiEdit size="25" color="#17202a" />
                            </button>
                            <button onClick={() => deleteAluno(aluno.id)} type='button'>
                                <FiUserX size="25" color="#17202a" />
                            </button>
                        </li>
                    )
                )}
            </ul>
            ):(
                <ul>
                {alunos.map(aluno => 
                    (
                        <li key={aluno.id}>
                            <b>Nome: </b>{aluno.nome}<br/><br/>
                            <b>Email: </b>{aluno.email}<br/><br/>
                            <b>Idade: </b>{aluno.idade}<br/><br/>
                            <button onClick={() => editAluno(aluno.id)} type='button'>
                                <FiEdit size="25" color="#17202a" />
                            </button>
                            <button onClick={() => deleteAluno(aluno.id)} type='button'>
                                <FiUserX size="25" color="#17202a" />
                            </button>
                        </li>
                    )
                )}
            </ul>
            )}
        </div>    
    );
}