import {
	// collection,
	// onSnapshot,
	doc,
	// addDoc,
	deleteDoc,
} from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux'
import { BASE_URL, db, storage } from '../firebase/firebase'
import AddPlant from './AddPlant'
import PlantsList from './PlantsList'
import axios from 'axios'
// import { getPlants } from '../app/plants/duck/operations'

const Home = () => {
	// const [plants, setPlants] = useState([])
	const [openAdd, setOpenAdd] = useState(false)
	// const [isLoading, setIsLoading] = useState(false); // TODO

	// useEffect(() => {
	// 	const unsubscriebe = () => getPlants()
	// 	console.log('jjjjj', plants)

	// 	return () => unsubscriebe()
	// }, [])

	const addPlant = (plant) => {
		try {
			axios.post(`${BASE_URL}/plants.json`, plant)
		} catch (error) {
			console.error(error)
		}
	}

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
			{/* {!plants ? (
				<div>
					<h2>Wczytuję dane...</h2>
					<button onClick={() => setOpenAdd(true)} className='plant__add'>
						Dodaj
					</button>
				</div>
			) : ( */}
			<PlantsList
				// plants={plants}
				openAdd={handleOpenAdd}
				onDelete={deletePlant}
			/>
			{/* )} */}

			{openAdd && <AddPlant onAdd={addPlant} hideAdd={handleOpenAdd} />}
		</section>
	)
}

// const mapStateToProps = (state) => ({
// 	plants: state.plantsList,
// })

// const mapDispatchToProps = (dispatch) => ({
// 	getPlants: () => dispatch(getPlants()),
// })

export default Home
