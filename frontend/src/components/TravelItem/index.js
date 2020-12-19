import React from 'react';
import Swal from 'sweetalert2';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import './styles.css';

function TravelItem({ travel }) {
    const modalOpen = () => {
        Swal.fire({
            imageUrl: travel.avatar,
            width: 1000,
            heightAuto: true,
            imageAlt: travel.place,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
          })
    } 

    return (
        <article className="teacher-item">
            <header>
                <img src={travel.avatar} alt={travel.place} onClick={modalOpen} />

                <div>
                    <strong>{travel.place}</strong>
                    <span>{travel.destination}</span>
                </div>
            </header>

            <p>{travel.bio}</p>

            <footer>
                <p>Custo da viagem:<strong>R$ {travel.cost}</strong></p>
                <a
                    target="_blank"
                    href={`https://wa.me/${travel.whatsapp}`}
                >
                    <img src={whatsappIcon} alt="whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TravelItem;