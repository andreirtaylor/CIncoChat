export const addUser = (user) => ({
  type: 'ADD_USER',
  user
})

export const addUsers = (users) => ({
  type: 'ADD_USERS',
  users
})

export const reloadMessages = (messages) => ({
  type: 'RELOAD_MESSAGES',
  messages
})

export const newMessage = (message) => ({
  type: 'NEW_MESSAGE',
  message
})

