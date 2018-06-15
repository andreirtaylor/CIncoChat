import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import browserHistory from 'history.js';

export default class Tiles extends Component {
  logout = () => {
    localStorage.clear();
    fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include'
    }).then(res => {
      browserHistory.push('/');
    });
  };

  render() {
    return <Button onClick={this.logout}>Logout</Button>;
  }
}
