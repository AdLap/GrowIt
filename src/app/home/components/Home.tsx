import React, { useState } from 'react'
import AddPlant from '../../plants/components/list/AddPlant'
import PlantsList from '../../plants/components/list/PlantsList'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Plant } from '../../../type/types'
import { Login } from '../../auth/components/Login'
import { Register } from '../../auth/components/Register'

const Home = () => {
	const [openAdd, setOpenAdd] = useState(false)
	// const [isLoading, setIsLoading] = useState(false); // TODO
	const plantsList: Plant[] = useSelector((state: RootState) => state.plants.plantsList)

	const handleOpenAdd = (): void => setOpenAdd(!openAdd)

	return (
		<section className='home'>
			<h1 className='home__title'>Mój ogródek</h1>
			{!plantsList.length ? (
				<div>
					<h2>Wczytuję dane...</h2>
					<button onClick={() => handleOpenAdd()} className='plant__add'>
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
