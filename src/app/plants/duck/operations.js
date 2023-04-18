import actions from './actions'
import { DB_URL } from '../../../firebase/firebase'
import axios from 'axios'

/**
 * Add to local element ID from API
 * @param {*} response
 * @returns Array of Objects
 */
const addId = (response) => {
	const result = []
	for (const [key, val] of Object.entries(response.data)) {
		const elementWithId = { ...val, id: key }
		result.push(elementWithId)
	}

	return result
}

const fetchAllPlants = async () => {
	try {
		const response = await axios.get(`${DB_URL}/plants.json`)
		if (response.status === 200) {
			const result = addId(response)

			return result
		}
	} catch (error) {
		console.error('error fetchAllPlants::', error)
	}
}

const getPlant = async (plantId) => {
	try {
		const response = await axios.get(`${DB_URL}/plants/${plantId}.json`)
		if (response.status === 200) {
			const result = response.data
			result.id = plantId

			return result
		}
	} catch (error) {
		console.error('error getPlant::', getPlant)
	}
}

export const getPlants = () => async (dispatch) => {
	try {
		const plants = await fetchAllPlants()
		plants && plants.map((plant) => dispatch(actions.add(plant)))
	} catch (error) {
		console.error('error getPlant::', error)
	}
}

export const addPlant = (plant) => async (dispatch) => {
	try {
		const response = await axios.post(`${DB_URL}/plants.json`, plant)
		if (response.status === 200) {
			const newPlant = await getPlant(response.data.name)
			dispatch(actions.add(newPlant))
		}
	} catch (error) {
		console.error('error addPlant::', error)
	}
}

export const getCurrentPlant = (plantId) => async (dispatch, getState) => {
	const state = getState().plants.plantsList
	const plant = {}
	if (!state.length) {
		const response = await getPlant(plantId)
		Object.assign(plant, response)
	} else {
		Object.assign(
			plant,
			state.find((element) => element.id === plantId)
		)
	}

	dispatch(actions.addCurrentPlant(plant))
}

export const deletePlant = (plant, img) => async (dispatch) => {
	try {
		const response = await axios.delete(`${DB_URL}/plants/${plant}.json`)
		if (response.status === 200) {
			dispatch(actions.deletePlant(plant))
		}
	} catch (error) {
		console.error('error deletePlant::', error)
	}
}

export const editPlant = (plant, plantId) => async (dispatch) => {
	delete plant.id
	try {
		const response = await axios.patch(
			`${DB_URL}/plants/${plantId}.json`,
			plant
		)
		if (response.status === 200) {
			const result = response.data
			result.id = plantId
			dispatch(actions.editPlant(result))
		}
	} catch (error) {
		console.error('error editPlant::', error)
	}
}
