import actions from './actions'
import { DB_URL } from '../../../firebase/firebase'
import axios from 'axios'

/**
 * Add to local element Id from API
 * @param {*} response 
 * @returns Array of Objects
 */
const addId = (response) => {
	const result = []
	for (const [key, val] of Object.entries(response.data)) {
			const elementWithId = {...val, id: key}
			result.push(elementWithId)
		}

	return result
}

const fetchPlants = async () => {
	const response = await axios.get(`${DB_URL}/plants.json`)
	const data = addId(response)

	return data
}

export const getPlants = () => async (dispatch) => {
	const plants = await fetchPlants()
	plants.map((plant) => dispatch(actions.add(plant)))
}
