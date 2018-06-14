import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import browserHistory from '../history';
import Paper from '@material-ui/core/Paper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = () => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            // simplest login I could afford
            localStorage.setItem('LoggedIn', 'Yup');
            browserHistory.push('/');
          });
        } else {
          alert('Invalid password or email');
        }
      })
      .catch(err => {
        alert('Error while processing login ' + err);
      });
  };

  render() {
    return (
      <Grid container justify="center" alignItems='center'>
        <Grid item xs={6} alignItems="center">
          <Paper>
            <form>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <div>
                <TextField
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </div>
            </form>
            <br />
            <div className="row">
              <div className="col-6">
                <Button variant="contained" color="primary" onClick={this.login} >
                  Login
                </Button>
              </div>
            </div>
            <br />
            <div className="reg-login-msg">
              NOT A MEMBER?<Link to="/register">
                {' '}
                REGISTER NOW
              </Link>
            </div>
      </Paper>
    </Grid>
  </Grid>
    );
  }
}

export default Login;
