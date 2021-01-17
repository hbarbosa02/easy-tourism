import React, { useState } from 'react';
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import './styles.css';

function PageHeader({ title, description, children }) {
  const [userItem, setUserItem] = useState({
    avatar: 'https://avatars2.githubusercontent.com/u/8129124?s=460&u=6ce1acc8ced2c8bad62b90e6241aa9d73ae9a9a0&v=4',
    name: 'Hiran Gondim'
  })

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={logoImg} alt="Proffy" />
        </Link>

        {
          userItem ? (
            <Link to="/profile">
              <img className="user-avatar" src={userItem && userItem.avatar} alt={userItem && userItem.name} />
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