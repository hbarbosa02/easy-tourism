import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import api from "../../services/api";
import { getToken } from "../../services/auth";

import logoImg from "../../assets/images/logo.svg";
import avatarImg from "../../assets/images/avatar.png";

import './styles.css';

function PageHeader({ title, description, children }) {
  const [userItem , setUserItem ] = useState(null)

  useEffect(() => {
    api.get('user',{
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    }).then((response) => {
      setUserItem(response.data)
    })
  },[])

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={logoImg} alt="Proffy" />
        </Link>

        {
          userItem ? (
            <Link to="/profile">
              <img className="user-avatar" src={avatarImg} alt='user-avatar' />
            </Link>
          ) : (
            <label>
              <strong><Link to="/login">Cadastro/Login</Link></strong>
            </label>
          )

        }
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
}

export default PageHeader;