import React, { useState, useEffect } from 'react';

import api from "../../services/api";
import { getToken } from "../../services/auth";
import { nameMask } from "../../services/mask";

import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Input from '../../components/Input';
import TravelItem from '../../components/TravelItem';

import './styles.css';

function Profile() {
	const [search, setSearch] = useState('all')
	const [userItem , setUserItem ] = useState(null)
	const [travelItens , setTravelItens ] = useState([1])

	useEffect(() => {
		api.get('user',{
			headers: {
				authorization: `Bearer ${getToken()}`
			}
		}).then((response) => {
			setUserItem(response.data.user)
		})
	},[])

	const travelItem = {
		image: [],
		place: 'Praia Bela',
		destination: 'RN, Natal',
		bio: 'Mussum Ipsum, cacilds vidis litro abertis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Sapien in monti palavris qui num significa nadis i pareci latim.',
		price: 1500,
		whatsapp: '84998983330',
		leaving: '2020-12-31T08:00:00',
		arrival: '2021-01-05T19:00:00',
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		console.log('submit form')
		console.log(search)
	}


	return (
		<div id="page-profile" className="container">
			<PageHeader 
				userItem={userItem}
				title={`Olá ${userItem && nameMask(userItem.name)} esse é seu histórico de viagens.`}
				isPerfil
			>
				<form id="search-travels-history" onSubmit={(e) => handleSubmit(e)}>
					<Select
						name="viagens"
						label="Viagens"
						options={[
						{ value: "all", label: "Todas as Viagens" },
						{ value: "scheduled", label: "Viagens Agendadas" },
						{ value: "history", label: "Histórico de Viagens" },
						]}
						value={search || ''}
						onChange={e => setSearch(e.target.value)}
					/>

					<button type="submit">Buscar</button>
				</form>
			</PageHeader>
									
			<main>
					{
						travelItens.length > 0 ? 
							travelItens.map((item, index) => <TravelItem key={index} travel={travelItem} hideButtons />) : 
							('Nenhuma viagem cadastrada durante esse período.')
					}
			</main>

			<PageFooter />
		</div>
	);
}

export default Profile;