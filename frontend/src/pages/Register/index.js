import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './styles.css';

import logoImg from "../../assets/images/logo.svg";

import { cpfMask } from '../../services/mask'
import { fireError } from '../../services/alert'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('')
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
        <div id="page-register" className="container">
            <form id="form-register" className="form" onSubmit={e => { handleSubmit(e) }}>
                <img src={logoImg} alt="Airbnb logo" />
                
                <input
                    type="text"
                    placeholder="Nome completo"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={50}
                    required="required"
                />

                <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={e => setCPF(cpfMask(e.target.value))}
                    maxLength={14}
                    required="required" 
                />

                <input
                    type="email"
                    placeholder="Endereço de e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    maxLength={50}
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

                <button type="submit">Cadastrar grátis</button>
                
                <hr />
                
                <Link to="/login">Fazer login</Link>

                <Link to="/">Retornar à página inicial</Link>
            </form>
      </div>
    );
}

export default Register;