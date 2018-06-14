import { combineReducers } from 'redux'

const user = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.user
    default:
      return state
  }
}

const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.message
      ]
    case 'INITIALIZE':
      return action.messages
    default:
      return state
  }
}

export default combineReducers({
  user,
  messages
})
