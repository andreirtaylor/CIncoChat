import React, { Component } from 'react';

import { GetUser } from 'helper';
import LogoutButton from 'components/Buttons/Logout.js';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      value: 'general'
    };
  }

  componentDidMount() {
    GetUser().then(user => {
      this.setState({ user });
    });
  }

  render() {
    const user = this.state.user;

    return (
      <div>
         <h1>USER PROFILE</h1>
          <p>{JSON.stringify(user)}</p>   
          <LogoutButton/>
      </div>
    );
  }
}
