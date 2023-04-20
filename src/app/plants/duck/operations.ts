import actions from './actions'
import { DB_URL } from '../../../firebase/firebase'
import axios from 'axios'
import { Plant, ResponseData } from '../../../type/types'
import { AppThunk } from '../../store'

/**
 * Add to local elements ID from API
 * @param ResponseData response.data
 * @returns Array of Objects
 */
const addId = (response: ResponseData): Plant[] => {
	const result = [] as Plant[]
	for (const [key, val] of Object.entries(response)) {
		const elementWithId: Plant = { ...val, id: key }
		result.push(elementWithId)
	}

	return result
}

const fetchAllPlants = async (): Promise<Plant[] | void> => {
	try {
		const response = await axios.get(`${DB_URL}/plants.json`)
		if (response.status === 200) {
			const result = addId(response.data)

			return result
		}
	} catch (error) {
		console.error('error fetchAllPlants::', error)
	}
}

const getPlant = async (plantId: string): Promise<Plant | void> => {
	try {
		const response = await axios.get(`${DB_URL}/plants/${plantId}.json`)
		if (response.status === 200) {
			const result: Plant = response.data
			result.id = plantId

			return result
		}
	} catch (error) {
		console.error('error getPlant::', error)
	}
}

export const getPlants = (): AppThunk => async (dispatch) => {
	try {
		const plants = await fetchAllPlants()
		plants && plants.map((plant) => dispatch(actions.add(plant)))
	} catch (error) {
		console.error('error getPlant::', error)
	}
}

export const addPlant =
	(plant: Plant): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.post(`${DB_URL}/plants.json`, plant)
			if (response.status === 200) {
				const newPlant = await getPlant(response.data.name)
				newPlant && dispatch(actions.add(newPlant))
			}
		} catch (error) {
			console.error('error addPlant::', error)
		}
	}

export const getCurrentPlant =
	(plantId: string): AppThunk =>
	async (dispatch, getState) => {
		const state = getState().plants.plantsList
		const plant = {} as Plant
		if (!state.length) {
			const response = await getPlant(plantId)
			Object.assign(plant, response)
		} else {
			Object.assign(
				plant,
				state.find((element: Plant) => element.id === plantId)
			)
		}

		dispatch(actions.addCurrentPlant(plant))
	}

export const clearCurrentPlant = (): AppThunk => async (dispatch) => {
	dispatch(actions.resetCurrentPlant())
}

export const deletePlant =
	(plantId: string, img?: string): AppThunk =>
	async (dispatch) => {
		try {
			const response = await axios.delete(`${DB_URL}/plants/${plantId}.json`)
			if (response.status === 200) {
				dispatch(actions.deletePlant(plantId))
			}
		} catch (error) {
			console.error('error deletePlant::', error)
		}
	}

export const editPlant =
	(plant: Plant, plantId: string): AppThunk =>
	async (dispatch) => {
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
