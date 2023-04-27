export interface Plant {
  name: string
	species: string
	date: string
	care: string
	image: string
	diary: Diary[],
	id?: string
}

export interface Diary {
  date: string
  do: string
  note: string
}

export interface PlantsState {
	plantsList: Plant[]
	currentPlant: Plant
	modalIsOpen: boolean
}

export interface ResponseData {
	[key: string]: Plant
}

export interface User {
	login: string
	password: string
}
