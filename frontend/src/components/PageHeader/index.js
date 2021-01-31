import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import avatarImg from "../../assets/images/avatar.png";

import './styles.css';

function PageHeader({userItem = null, title, description, children, isPerfil = false }) {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/home">
          <img src={logoImg} alt="Proffy" />
        </Link>

        {
          userItem && !isPerfil ? (
            <Link to="/profile">
              <img className="user-avatar" src={avatarImg} alt='user-avatar' />
            </Link>
          ) : userItem && isPerfil ? (
            <label>
              <strong><Link to="/logout">Sair</Link></strong>
            </label>
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