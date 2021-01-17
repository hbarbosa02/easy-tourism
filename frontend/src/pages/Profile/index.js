import React, { useState } from 'react';

import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Input from '../../components/Input';
import TravelItem from '../../components/TravelItem';

import './styles.css';

function Profile() {
    const [destination, setDestination] = useState(null)
    const [leaving, setLeaving] = useState('')
    const [arrival , setArrival ] = useState('')

    const userItem = {
        avatar: 'https://avatars2.githubusercontent.com/u/8129124?s=460&u=6ce1acc8ced2c8bad62b90e6241aa9d73ae9a9a0&v=4',
        name: 'Hiran Gondim',
        cpf: '016.770.584-98',
        email: 'hira.g.b.silva@gmail.com'
    }

    const travelItem = {
        avatar: 'https://jeunessetravel.com/wp-content/uploads/jeunesse-travel-video-thumbnail.jpg',
        place: 'Praia Bela',
        destination: 'RN, Natal',
        bio: 'Mussum Ipsum, cacilds vidis litro abertis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Sapien in monti palavris qui num significa nadis i pareci latim.',
        cost: 1500,
        whatsapp: '84998983330',
        leaving: '2020-12-31T08:00:00',
        arrival: '2021-01-05T19:00:00',
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('submit form')
        console.log(destination, leaving, arrival)
    }


    return (
        <div id="page-profile" className="container">
            <PageHeader 
                userItem={userItem}
                title={`Olá ${userItem.name} esse é seu histórico de viagens.`}
            >
                <form id="search-travels-history" onSubmit={(e) => handleSubmit(e)}>
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
                <TravelItem travel={travelItem} hideButtons />
                <TravelItem travel={travelItem} hideButtons />
                <TravelItem travel={travelItem} hideButtons />
            </main>

            <PageFooter />
        </div>
    );
}

export default Profile;