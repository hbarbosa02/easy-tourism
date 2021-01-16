import React from 'react';
import Swal from 'sweetalert2';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import MonetaryValue from '../../components/MonetaryValue';
import DateTimeComponent from '../../components/DateTimeComponent';

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

            <div className="teacher-item-dates">
                <p>Partida no dia: <strong><DateTimeComponent date={travel.leaving} /></strong></p>
                <p>Chegada no dia: <strong><DateTimeComponent date={travel.arrival} /></strong></p>
            </div>

            <p>{travel.bio}</p>

            <p><strong>Para mais informações, entre em contato com a agencia de viagem.</strong></p>

            <footer>
                <p>Custo da viagem:<strong><MonetaryValue value={travel.cost} /></strong></p>
                
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