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
  let tmp;
  switch (action.type) {
    case 'ADD_USERS':
      return action.users
    case 'NOTIFICATION':
      tmp = [...state]
      tmp.find((el) => el.id === action.message.sender).notification = true;
      return tmp
    case 'SELECT_RECIPIENT':
      tmp = [...state]
      tmp.map((el)=> el.selected = false)
      tmp.find((el) => el.id === action.recipient).notification = false; 
      tmp.find((el) => el.id === action.recipient).selected = true; 
      return tmp
    default:
      return state
  }
}

const recipient = (state = -1, action) => {
  switch (action.type) {
    case 'UPDATE_RECIPIENT':
      return action.recipient
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
  recipient
})
