import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './styles.css';

import logoImg from "../../assets/images/logo.svg";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = '/'
    }

    return (
        <div id="page-login" className="container">
            <form id="form-login" className="form" onSubmit={e => { handleSubmit(e) }}>
                <img src={logoImg} alt="Airbnb logo" />

                <input
                    name="email"
                    type="email"
                    placeholder="Endereço de e-mail"
                    onChange={e => setEmail(e.target.value)}
                    maxLength={75}
                    required="required" 
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Senha"   
                    onChange={e => setPassword(e.target.value)}
                    minLength={7}
                    maxLength={20}
                    required="required" 
                />

                <button type="submit">Entrar</button>

                <hr />
                
                <Link to="/register">Cadastre se</Link>
                
                <Link to="/forgot">Esqueci minha senha</Link>

                <Link to="/">Retornar à página inicial</Link>
                
            </form>
      </div>
    );
}

export default Login;