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
  data: string
  do: string
  note: string
}

export interface PlantsState {
	plantsList: Plant[]
	currentPlant: Plant
}

export interface ResponseData {
	[key: string]: Plant
}
