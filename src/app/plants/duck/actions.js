import types from './types'

const get = item => ({
  type: types.GET_PLANTS, item
})

const add = item => ({
  type: types.ADD_PLANTS, item
})

export default {
  get,
  add
}
