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
  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    return (
      <div style={{textAlign:"center"}} className="form-padding">
        <br/>
        <br/>
        <br/>
        <br/>
        <div>
              <TextField
                label="Email"
                onChange={this.handleChange("email")}
              />
        <br/>
            <div>
              <TextField
                label="Password"
                type="password"
                onChange={this.handleChange("password")}
              />
            </div>
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
        </div>
      </div>
    );
  }
}

export default Login;
