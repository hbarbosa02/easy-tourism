import React, { useState, useEffect } from 'react';

import api from "../../services/api";
import { getToken } from "../../services/auth";

import PageHeader from '../../components/PageHeader';
import PageFooter from '../../components/PageFooter';
import TravelItem from '../../components/TravelItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

function Home() {
  const [destination, setDestination] = useState(null)
  const [leaving, setLeaving] = useState('')
  const [arrival , setArrival ] = useState('')
  const [userItem , setUserItem ] = useState(null)
  const [travelItens , setTravelItens ] = useState([])

  useEffect(() => {
      api.get('user',{
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }).then((response) => {
        setUserItem(response.data.user)
      })

      api.get('travel',{
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }).then((response) => {
        setTravelItens(response.data.travels)
      }).catch(err => console.log)
  },[])

  const travelItem = {
    avatar: 'https://jeunessetravel.com/wp-content/uploads/jeunesse-travel-video-thumbnail.jpg',
    place: 'Praia Bela',
    destination: 'RN, Natal',
    bio: 'Mussum Ipsum, cacilds vidis litro abertis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Sapien in monti palavris qui num significa nadis i pareci latim.',
    cost: 1500,
    whatsapp: '84998983330',
    leaving: '2020-12-31T08:00:00',
    arrival: '2021-01-05T19:00:00',
    tickets: 100
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    api.get('travel',{
      params: { destination, leaving, arrival },
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    }).then((response) => {
      setTravelItens(response.data.travels)
    }).catch(err => console.log)
  } 


  return (
    <div id="page-home" className="container">
      <PageHeader userItem={userItem} title="Estas são as viagens disponíveis.">
        <form id="search-travels" onSubmit={handleSubmit}>
          <Select
            name="destination"
            label="Destino"
            options={[
              { value: "0", label: "Test local 1" },
              { value: "1", label: "Test local 2" },
              { value: "2", label: "Test local 3" },
            ]}
            value={destination || ''}
            onChange={e => setDestination(e.target.value)}
          />

            <Input
              name="date"
              label="Data Saida"
              type="date"
              value={leaving}
              onChange={e => setLeaving(e.target.value)}
            />

            <Input
              name="date"
              label="Data Chegada"
              type="date"
              value={arrival}
              onChange={e => setArrival(e.target.value)}
            />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
          {travelItens.map((item, index) => <TravelItem key={index} travel={item} />)}
      </main>

      <PageFooter />
    </div>
  );
}

export default Home;