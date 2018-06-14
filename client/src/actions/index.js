export const addUser = (user) => ({
  type: 'ADD_USER',
  user
})

export const addUsers = (users) => ({
  type: 'ADD_USERS',
  users
})

export const fetchUser = dispatch => {
  return fetch('/api/users/me', {
    credentials: 'include'
  })
    .then(res => {
      if (res.status >= 400 && res.status < 600) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then(json => dispatch(addUser(json)))
}
