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
	const response = await axios.get(`${DB_URL}/plants.json`)
	const data = addId(response)

	return data
}

const getPlant = async (plantId) => {
	const response = await axios.get(`${DB_URL}/plants.json?uid=${plantId}`)
	// TODO this is hacky solution - axios gets all data
	const plantsWithId = addId(response)
	const plant = plantsWithId.find(plant => plant.id === plantId)

	return plant

}

export const getPlants = () => async (dispatch) => {
	const plants = await fetchAllPlants()
	plants.map((plant) => dispatch(actions.add(plant)))
}

export const addPlant = (plant) => async (dispatch) => {
	try {
		const response = await axios.post(`${DB_URL}/plants.json`, plant)
		if (response.status === 200) {
			const newPlant = await getPlant(response.data.name)
			dispatch(actions.add(newPlant))
		}
	} catch (error) {
		console.error('error add Plant::', error)
	}
}
