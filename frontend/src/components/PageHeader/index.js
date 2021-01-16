import React, { useState } from 'react';
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import './styles.css';

function PageHeader({ title, description, children }) {
  const [userItem, setUserItem] = useState(null)

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <img src={logoImg} alt="Proffy" />
        {
          userItem ? (
            <img className="user-avatar" src={userItem && userItem.avatar} alt={userItem && userItem.name} />
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