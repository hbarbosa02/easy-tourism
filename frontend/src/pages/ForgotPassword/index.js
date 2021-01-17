import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from "../../assets/images/logo.svg";

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const checkPassword = () => {
        const uppercase = /[A-Z]/
        const lowercase = /[a-z]/
    
        if (!password || password.length < 7) {
          fireError('A senha deve conter mínimo 7 dígitos.')
          return false
        } else if (!uppercase.test(password)) {
          fireError('A senha deve conter letras maiúsculas.')
          return false
        } else if (!lowercase.test(password)) {
          fireError('A senha deve conter letras minúsculas.')
          return false
        } else if(password !== confirmPassword) {
            fireError('Senha digitada é diferente da senha de confirmação.')
            return false
        }
    
        return true
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(checkPassword()){
            window.location.href = '/login'
        }
    }

    return (
        <div id="page-forgot" className="container">
            <form id="form-forgot" className="form" onSubmit={e => { handleSubmit(e) }}>
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
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    minLength={7}
                    maxLength={20}
                    required="required" 
                />

                <input
                    type="password"
                    placeholder="Confirmação de Senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    minLength={7}
                    maxLength={20}
                    required="required" 
                />

                <button type="submit">Alterar senha</button>

                <hr />

                <Link to="/">Retornar à página inicial</Link>
            </form>
        </div>
    );
}

export default ForgotPassword;