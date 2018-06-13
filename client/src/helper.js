export let GetUser = async function() {
  return fetch('/api/users/me', {
    credentials: 'include'
  })
    .then(res => {
      if (res.status >= 400 && res.status < 600) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .catch(err => {
      console.error(err);
      // If there is an error then you should get an empty object
      return {};
    });
};

export let GetUsers = async function() {
  return fetch('/api/users', {
    credentials: 'include'
  })
    .then(res => {
      if (res.status >= 400 && res.status < 600) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .catch(err => {
      console.error(err);
      return [];
    });
};
