import types from './types'

const add = item => ({
  type: types.ADD_PLANTS, item
})

export default {
  add
}
