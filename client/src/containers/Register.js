import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import browserHistory from '../history';
import Paper from '@material-ui/core/Paper';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
    };
  }

  register = () => {
    if (this.state.password === this.state.confirm_password) {
      fetch('/auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(response => {
          if (response.status === 200) {
              browserHistory.push('/');
          } else {
            response.json().then((err) => {
              alert("error from server: " + JSON.stringify(err.err))
            })
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("Your password's do not match");
    }
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
        <div className="reg-login-header">REGISTER</div>
        <div>
          <TextField
            label="Email"
            onChange={this.handleChange("email")}
          />
          <span>&nbsp;&nbsp;</span>
          <TextField
            label=" Username"
            onChange={this.handleChange("username")}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            onChange={this.handleChange("password")}
          />
          <span>&nbsp;&nbsp;</span>
          <TextField
            label=" Confirm Password"
            type="password"
            onChange={this.handleChange("confirm_password")}
          />
        </div>
        <br />
        <Button variant="contained" color="primary" onClick={this.register} >
          Register
        </Button>
        <br/>
        <br/>
        <div className="reg-login-msg">
          Already A MEMBER?<Link to="/login">
            {' '}
            Login Here
          </Link>
        </div>
      </div>
    );
  }
}
