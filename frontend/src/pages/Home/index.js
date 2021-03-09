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
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
      // api.get('user',{
      //   headers: {
      //     authorization: `Bearer ${getToken()}`
      //   }
      // }).then((response) => {
      //   setUserItem(response.data.user)
      // })

      api.get('travel',{
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }).then((response) => {
        setTravelItens(response.data.travels)
      }).catch(err => console.log)

      api.get('destiny',{
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      }).then((response) => {
        const data = response.data.destinations.map(destiny => {
          return {value: destiny.name, label: `${destiny.name} - ${destiny.state}`}
        })
        setDestinations(data)
      }).catch(err => console.log)
  },[])

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
              { value: null, label: "Sem destino especifico" },
              ...destinations
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
          {
            travelItens.length > 0 ? 
              travelItens.map((item, index) => <TravelItem key={index} travel={item} />) : 
              (
                <label>
                  <strong>Nenhuma viagem cadastrada durante esse período.</strong>
                </label>
              )
          }
      </main>

      <PageFooter />
    </div>
  );
}

export default Home;