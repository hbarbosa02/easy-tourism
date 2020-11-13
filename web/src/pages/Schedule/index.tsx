import React, { useState } from 'react'

import PageHeader from "../../components/PageHeader";
import TravelItem from "../../components/TravelItem";
import Input from "../../components/Input";

import './styles.css'

function Schedule() {
  const data1 = {
    id: 1,
    image: "https://cf.bstatic.com/images/hotel/max1024x768/134/134923914.jpg",
    description: "Viagem com destino ao Rio de Janeiro, com estadia no Windsor California Hotel por 5 dias, viagem ocorre na data $$/$$/$$$$ até $$/$$/$$$$.",
    cost: 5000,
    title: "Conheça o Windsor California Hotel",
    destination: "Avenida Atlantica 2616, Copacabana, Rio de Janeiro",
    link: "https://windsorhoteis.com/hotel/windsor-california/",

  }

  const [date, setDate] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");

  return (
    <div id="page-travel-list" className="container">
      <PageHeader title="Estas são as viagens agendadas para o futuro.">
        <form id="search-travels" >
          <Input
            name="date"
            label="Data da viagem"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            name="date_in"
            label="Data de entrada"
            type="date"
            value={dateIn}
            onChange={(e) => setDateIn(e.target.value)}
          />

          <Input
            name="date"
            label="Data de saida"
            type="date"
            value={dateOut}
            onChange={(e) => setDateOut(e.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        <TravelItem key="1" travel={data1} />

        <TravelItem key="2" travel={data1} />

        <TravelItem key="3" travel={data1} />

        <TravelItem key="4" travel={data1} />

        <TravelItem key="5" travel={data1} />

        <TravelItem key="6" travel={data1} />

      </main>
    </div>
  )
}

export default Schedule
