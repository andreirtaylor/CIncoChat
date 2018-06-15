import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import LogoutButton from 'components/Logout.js';
import UserList from 'components/UserList.js';
import MessageList from 'components/MessageList.js';
import ChatInput from 'components/ChatInput.js';
import {
  addUser,
  setSelected,
  addUsers,
  setNotification,
  updateRecipient,
  reloadMessages,
  newMessage
} from '../actions';

class Profile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    this.socket = io.connect(
      `${window.location.protocol}//${window.location.hostname}:${
        window.location.port
      }`
    );

    this.socket.emit('GET_USERS');
    this.socket.emit('GET_USER');

    this.socket.on('GET_USERS', list => {
      dispatch(addUsers(list));
    });

    this.socket.on('GET_USER', user => {
      dispatch(addUser(user));
    });

    this.socket.on('NEW_USER', user => {
      // HACK this is used to make the UI know about the
      // new user I would make this more robust if
      // this were a longer project
      window.location.reload();
    });

    this.socket.on('RELOAD_MESSAGES', messages => {
      dispatch(reloadMessages(messages));
    });

    this.socket.on('NEW_MESSAGE', message => {
      // if you are currently looking at the person who sent this message
      // you should append it to the messages
      const { recipient, user } = this.props;

      if (message.sender === recipient || user.id === message.sender) {
        dispatch(newMessage(message));
      } else {
        // othewise just alert that there is a new message
        dispatch(setNotification(message));
      }
    });
  }

  changeRecipient = recipient => {
    const { dispatch } = this.props;
    dispatch(updateRecipient(recipient));
    dispatch(setSelected(recipient));
    this.socket.emit('GET_MESSAGES', { room: recipient });
  };

  send = msg => {
    const { recipient } = this.props;
    this.socket.emit('NEW_MESSAGE', { msg, recipient });
  };

  render() {
    const { user, users, recipient, messages } = this.props;

    return (
      <div>
        <AppBar style={{ display: 'flex' }} position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              {user.username}
            </Typography>
            <LogoutButton style={{ textAlign: 'right' }} />
          </Toolbar>
        </AppBar>
        <Grid container>
          {/*offset*/}
          <Grid item md={2} lg={3} />
          <Grid item md={3} lg={2}>
            <UserList
              users={users}
              recipient={recipient}
              changeRecipient={this.changeRecipient}
            />
          </Grid>
          {recipient !== -1 && (
            <Grid item md={5} lg={4}>
              <Grid item md={12}>
                {recipient !== -1 && (
                  <MessageList recipient={recipient} messages={messages} />
                )}
              </Grid>
              <Grid container justify={'flex-end'} alignItems={'flex-end'}>
                <Grid item md={12}>
                  <ChatInput send={this.send} messages={messages} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(state => state)(Profile);
