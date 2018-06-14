import React, { Component } from 'react';
import io from "socket.io-client"
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LogoutButton from 'components/Buttons/Logout.js';
import UserList from 'components/UserList.js';
import MessageList from 'components/MessageList.js';
import ChatInput from 'components/ChatInput.js';
import { addUser, addUsers, reloadMessages} from '../actions'

class Profile extends Component {
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

    this.socket.on('RELOAD_MESSAGES',(messages)=>{
      dispatch(reloadMessages(messages))
    })
  }

  gotToRoom = (room) => {
    this.socket.emit("GET_MESSAGES", {room});
  }

  send = (msg) => {
    this.socket.emit("SEND_MESSAGE", {msg});
  }

  render() {
    const { user, users, messages} = this.props;

    return (
    <div >
      <AppBar style={{display:"flex"}}position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" style={{flex:1}}>
            {user.username}
          </Typography>
          <LogoutButton style={{ textAlign: 'right' }}/>
        </Toolbar>
      </AppBar>
      <Grid container style={{height: window.innerHeight - 500 + 'px'}}>
        <Grid item xs={4} >
          <UserList users={users} updateUser={this.gotToRoom}/>
        </Grid>
        <Grid item xs={8}>
          <MessageList messages={messages}/>
        </Grid>
      </Grid>
      <Grid container justify={'flex-end'} alignItems={"flex-end"}>
        <Grid item xs={8}>
          <ChatInput send={this.send} messages={messages}/>
        </Grid>
      </Grid>

    </div>
    );
  }
}

export default connect(state => state)(Profile)
