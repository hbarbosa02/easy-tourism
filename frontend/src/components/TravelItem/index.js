import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import MonetaryValue from '../../components/MonetaryValue';
import DateTimeComponent from '../../components/DateTimeComponent';

import './styles.css';

function TravelItem({ travel, hideButtons = false }) {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        setWidth(window.innerWidth)
    },[])

    const modalOpen = (image) => {
        Swal.fire({
            imageUrl: image || 'https://jeunessetravel.com/wp-content/uploads/jeunesse-travel-video-thumbnail.jpg',
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
                <img src={travel.image[0] || 'https://jeunessetravel.com/wp-content/uploads/jeunesse-travel-video-thumbnail.jpg'} alt={travel.place} onClick={() => modalOpen(travel.image[0])} />

                <div>
                    <strong>{travel.place}</strong>
                    <span>{travel.destiny}</span>
                    {travel && travel.quantity && (
                        <span>Vagas disponíveis: <label>{travel.quantity}</label></span>
                    )}
                </div>
            </header>

            <div className="teacher-item-dates">
                <p>Partida no dia: <strong><DateTimeComponent date={travel.leaving} /></strong></p>
                <p>Chegada no dia: <strong><DateTimeComponent date={travel.arrival} /></strong></p>
            </div>

            <p>{travel.bio}</p>

            <p><strong>Para mais informações, entre em contato com a agencia de viagem.</strong></p>

            <footer>
                <p>Custo da viagem:<strong><MonetaryValue value={(travel.price).toString()} /></strong></p>
                
                {!hideButtons && (
                    <>
                    {/* <a
                        id="buy-ticket-button"
                        target="_blank"
                        // href={'/payment'}
                    >
                        Comprar passagem
                    </a> */}
{/*                     
                    {
                        width > 800 && ( */}
                            <a
                                target="_blank"
                                href={`https://wa.me/${travel.whatsapp}`}
                            >
                                <img src={whatsappIcon} alt="whatsapp" />
                                Entrar em contato
                            </a>
                        {/* )
                    } */}
                </>
                )}
            </footer>
        </article>
    );
}

export default TravelItem;