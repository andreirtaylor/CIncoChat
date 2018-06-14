import { combineReducers } from 'redux'

const user = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.user
    default:
      return state
  }
}

const users = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return action.users
    default:
      return state
  }
}

const messages = (state = [], action) => {
  switch (action.type) {
    case 'RELOAD_MESSAGES':
      return action.messages
    case 'NEW_MESSAGE':
      return [ ...state, action.message ]
    default:
      return state
  }
}


export default combineReducers({
  user,
  messages,
  users,
})
