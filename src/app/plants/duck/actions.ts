/* eslint-disable import/no-anonymous-default-export */
import types from './types'
import type { Plant } from '../../../type/types'

const add = (item: Plant) => ({
  type: types.ADD_PLANTS, item
})

const addCurrentPlant = (item: Plant) => ({
  type: types.ADD_CURRENT_PLANT, item
})

const resetCurrentPlant = () => ({
  type: types.RESET_CURRENT_PLANT
})

const deletePlant = (item: string) => ({
  type: types.DELETE_PLANT, item
})

const editPlant = (item: Plant) => ({
  type: types.EDIT_PLANT, item
})

export default {
  add,
  addCurrentPlant,
  resetCurrentPlant,
  deletePlant,
  editPlant
}
