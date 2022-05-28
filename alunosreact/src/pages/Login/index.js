import  React from 'react';
import './styles.css';
import loginImage from '../../assets/login.png';

export default function Login(){
    return (
        <div className='login-container'>
            <section className='form'>
                <img src={loginImage} alt='login'  id='img1'/>
                <form>
                    <h1>Login</h1>
                    <input placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <button className='button' type='submit'>Login</button>
                </form>
            </section> 
        </div>
    );
}