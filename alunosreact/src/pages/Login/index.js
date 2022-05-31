import  {React, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import loginImage from '../../assets/login.png';
import api from '../../services/api';

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history =  useHistory();

    async function login(event){
        event.preventDefault();//evita o refresh da tela

        const data = {
            email,
            password
        }

        try{
            const response = await api.post('api/account/loginUser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            history.push('/alunos');
        }
        catch(error){
            alert('falaha ao logar '+ error);
        }
    }

    return (
        <div className='login-container'>
            <section className='form'>
                <img src={loginImage} alt='login'  id='img1'/>
                <form onSubmit={login}>
                    <h1>Login</h1>
                    <input placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className='button' type='submit'>Login</button>
                </form>
            </section> 
        </div>
    );
}