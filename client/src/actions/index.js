export const addUser = (user) => ({
  type: 'ADD_USER',
  user
})

export const addUsers = (users) => ({
  type: 'ADD_USERS',
  users
})

export const updateRecipient = (recipient) => ({
  type: 'UPDATE_RECIPIENT',
  recipient
})

export const reloadMessages = (messages) => ({
  type: 'RELOAD_MESSAGES',
  messages
})

export const newMessage = (message) => ({
  type: 'NEW_MESSAGE',
  message
})

export const setNotification = (message) => ({
  type: 'NOTIFICATION',
  message
})

export const setSelected = recipient => ({
  type: 'SELECT_RECIPIENT',
  recipient
})
