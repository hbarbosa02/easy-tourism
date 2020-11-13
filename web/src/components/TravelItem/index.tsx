import React from "react";

import smileIcon from "../../assets/images/icons/smile.svg";

import "./styles.css";

export interface Travel {
  id: number;
  image: string;
  description: string;
  cost: number;
  title: string;
  destination: string;
  link: string;
}

interface TravelItemProps {
  travel: Travel;
}

const TravelItem: React.FC<TravelItemProps> = ({ travel }) => {
  return (
    <article className="travel-item">
      <header>
        <img src={travel.image} alt={travel.title} />

        <div>
          <strong>{travel.title}</strong>
          <span>{travel.destination}</span>
        </div>
      </header>

      <p>{travel.description}</p>

      <footer>
        <p>
          Preço <strong>R$ {travel.cost}</strong>
        </p>
        <a href={travel.link} target="_blank">
          <img src={smileIcon} alt="link" />
          Veja mais sobre
        </a>
      </footer>
    </article>
  );
};

export default TravelItem;
