import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
// import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import api from "../../services/api";

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("/connections").then((response) => {
      const { total } = response.data;
      console.log(response);

      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Eazy-Tourism" />
          <h2>Agende sua viagem online.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/home" className="study">
            <img src={studyIcon} alt="Viagens" />
            Viagens
          </Link>

          {/* <Link to="/login" className="give-classes">
            <img src={giveClassesIcon} alt="Cadastro/Login" />
            Cadastro/Login
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Landing;