import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

import './styles.css';

import logoImg from "../../assets/images/logo.svg";

import api from "../../services/api";
import { cpfMask, phoneMask } from '../../services/mask'
import { fireSuccess, fireError } from '../../services/alert'

function Register() {
    const history = useHistory();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('')
    const [phone, setPhone] = useState('')
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
            api
                .post("signup", {
                    name, email, cpf, phone, password
                })
                .then(() => {
                    fireSuccess("Cadastro realizado com sucesso!");
                    history.push("/login");
                })
                .catch(() => fireError("Ouve um erro com o cadastro!"));
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
                    type="text"
                    placeholder="Telefone"
                    value={phoneMask(phone)}
                    onChange={e => setPhone(e.target.value)}
                    maxLength={11}
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