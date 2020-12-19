import React from 'react';
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import './styles.css';

function PageHeader({ title, description, children }) {
  
  const userItem = {
    avatar: 'https://jeunessetravel.com/wp-content/uploads/jeunesse-travel-video-thumbnail.jpg',
    name: 'Praia Bela',
  }

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <img src={logoImg} alt="Proffy" />
        {
          !userItem ? (
            <img className="user-avatar" src={userItem.avatar} alt={userItem.name} />
          ) : (
            <Link to="/">
              <strong>Cadastro/Login</strong>
            </Link>
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