/* eslint-disable import/no-anonymous-default-export */
import types from './types'

const add = item => ({
  type: types.ADD_PLANTS, item
})

const addCurrentPlant = item => ({
  type: types.ADD_CURRENT_PLANT, item
})

const deletePlant = item => ({
  type: types.DELETE_PLANT, item
})

const editPlant = item => ({
  type: types.EDIT_PLANT, item
})

export default {
  add,
  addCurrentPlant,
  deletePlant,
  editPlant
}
