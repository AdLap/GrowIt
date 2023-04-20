import React, { useState } from 'react'
import AddPlant from '../../plants/components/list/AddPlant'
import PlantsList from '../../plants/components/list/PlantsList'
import { useSelector } from 'react-redux'

const Home = () => {
	const [openAdd, setOpenAdd] = useState(false)
	// const [isLoading, setIsLoading] = useState(false); // TODO
	const plantsList = useSelector((state) => state.plants.plantsList)

	const handleOpenAdd = () => setOpenAdd(!openAdd)

	return (
		<section className='home'>
			<h1 className='home__title'>Mój ogródek</h1>
			{!plantsList ? (
				<div>
					<h2>Wczytuję dane...</h2>
					<button onClick={() => setOpenAdd()} className='plant__add'>
						Dodaj
					</button>
				</div>
			) : (
				<PlantsList openAdd={handleOpenAdd} />
			)}

			{openAdd && <AddPlant hideAdd={handleOpenAdd} />}
		</section>
	)
}

export default Home
