import actions from './actions'
import { BASE_URL } from '../../../firebase/firebase'
import axios from 'axios'

const fetchPlants = async () => {
	const response = await axios.get(`${BASE_URL}/plants.json`)
	const data = Object.values(response.data)

	return data
}

export const getPlants = () => async (dispatch) => {
	const plants = await fetchPlants()
  console.log('oper::', plants)
	plants.map((plant) => dispatch(actions.add(plant)))
}
