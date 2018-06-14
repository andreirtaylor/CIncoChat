import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LogoutButton from 'components/Buttons/Logout.js';

import { connect } from 'react-redux'
import { addUser, addUsers } from '../actions'

import io from "socket.io-client"

class Profile extends Component {
  // TODO make this work
  static propTypes = {
    user: PropTypes.shape({
    }),
  }

  componentDidMount() {
    const { dispatch } = this.props

    this.socket = io.connect(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`)

    this.socket.emit('GET_USERS')
    this.socket.emit('GET_USER')

    this.socket.on('GET_USERS',(list)=>{
      dispatch(addUsers(list))
    })

    this.socket.on('GET_USER',(user)=>{
      dispatch(addUser(user))
    })
  }

  render() {
    const { user } = this.props;
    
    return (
      <div>
         <h1>USER PROFILE</h1>
          <p>{JSON.stringify(user)}</p>   
          <LogoutButton/>
      </div>
    );
  }
}

export default connect(state => state)(Profile)
