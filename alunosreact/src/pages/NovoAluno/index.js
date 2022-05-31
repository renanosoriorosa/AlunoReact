import {React, useState, useEffect} from "react";
import './style.css';
import {FiUserPlus, FiCornerDownLeft} from 'react-icons/fi';
import { Link, useParams, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function NovoAluno(){

    const [id, setId]= useState(null);
    const [nome, setNome]= useState('');
    const [email, setEmail]= useState('');
    const [idade, setIdade]= useState(0);

    const {alunoId} = useParams();
    const history = useHistory();

    const token = localStorage.getItem('token');
    const authorization = {
        headers : {
            Authorization: 'Bearer '+token,
        }
    }

    async function loadAluno(){
        try{
            const response =  await api.get(`api/aluno/${alunoId}`, authorization);

            setId(response.data.id);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setIdade(response.data.idade);
        }catch(error){
            alert('falha '+ error);
            history.push('/alunos');
        }
    }

    useEffect(() => {
        if(alunoId === '0')
            return;
        else 
            loadAluno();
        // eslint-disable-next-line
    },[])

    async function saveOrUpdate(event){
        event.preventDefault();
        const data = {
            nome,
            email,
            idade
        }

        try {
            if(alunoId === '0'){
                await api.post('api/aluno', data, authorization);
            }else{
                data.id = id;
                await api.put(`api/aluno/${id}`, data, authorization);
            }
        } catch (error) {
            alert('fala ao salvar, erro: '+error);
        }
        history.push('/alunos');
    }

    return(
        <div className="novo-aluno-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size ='105' color="#17202a" />
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno': 'Atualizar Aluno'}</h1>
                    <Link className='back-link' to='/alunos'>
                        <FiCornerDownLeft size='23' color="#17202a" />
                        Retornar
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input placeholder="Idade"
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                    />
                    <button className="button" type='submit'>
                        {alunoId === '0' ? 'Incluir': 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}