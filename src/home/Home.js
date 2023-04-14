import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import React, { useState } from 'react'
import { db, storage } from '../firebase/firebase'
import AddPlant from '../app/plants/components/AddPlant'
import PlantsList from '../app/plants/components/PlantsList'
// import axios from 'axios'
import { useSelector } from 'react-redux'

const Home = () => {
	const [openAdd, setOpenAdd] = useState(false)
	// const [isLoading, setIsLoading] = useState(false); // TODO
	const plantsList = useSelector((state) => state.plants.plantsList)

	// TODO -redux && db | GROW-6
	const deletePlant = (plantId, plantImg) => {
		const plantRef = ref(storage, plantImg)
		try {
			deleteDoc(doc(db, 'plants', plantId))
			deleteObject(plantRef)
		} catch (error) {
			console.error(error)
		}
	}

	const handleOpenAdd = (todo) => {
		setOpenAdd(todo)
	}

	return (
		<section className='home'>
			<h1 className='home__title'>Mój ogródek</h1>
			{!plantsList ? (
				<div>
					<h2>Wczytuję dane...</h2>
					<button onClick={() => setOpenAdd(true)} className='plant__add'>
						Dodaj
					</button>
				</div>
			) : (
				<PlantsList openAdd={handleOpenAdd} onDelete={deletePlant} />
			)}

			{openAdd && (
				<AddPlant
					hideAdd={handleOpenAdd}
				/>
			)}
		</section>
	)
}

export default Home
