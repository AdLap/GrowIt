/* eslint-disable import/no-anonymous-default-export */
import types from './types'

const add = item => ({
  type: types.ADD_PLANTS, item
})

const deletePlant = item => ({
  type: types.DELETE_PLANT, item
})

export default {
  add,
  deletePlant
}
