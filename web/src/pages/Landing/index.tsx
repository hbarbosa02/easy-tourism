import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="PH" />
          <h2>Sua agencia de turimo no Rio Grande do Norte.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/schedule" className="schedule">
            <img src={studyIcon} alt="Schedule" />
            Schedule
          </Link>

          <a
            className="whatsapp"
            href={`https://wa.me/+5584999073153`}
            target="_blank"
          >
            <img src={whatsappIcon} alt="whatsapp" />
            Entrar em contato
          </a>
        </div>
      </div>
    </div>
  )
}

export default Landing
