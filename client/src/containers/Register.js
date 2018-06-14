import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
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
    alert(JSON.stringify(this.state))
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
            response.json().then(data => {
              browserHistory.push('/');
            });
          } else {
            if (response.status === 400) {
              alert('Invalid email or all fields are not filled in');
            }
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("Your password's do not match");
    }
  };

  handleChange = name => e => {
    console.log(name, e)
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    return (
      <Paper>
        <div className="form-padding">
          <div className="reg-login-header">REGISTER</div>
          <form>
            <div>
              <TextField
                label="Email"
                onChange={this.handleChange("email")}
              />
              <TextField
                label="username"
                onChange={this.handleChange("username")}
              />
            </div>
            <div>
              <TextField
                label="Password"
                onChange={this.handleChange("password")}
              />
              <TextField
                label="Confirm Password"
                onChange={this.handleChange("confirm_password")}
              />
            </div>
          </form>
          <br />
          <div className="row">
            <div className="col-6" />
            <div className="col-6">
              <Button
                className="reg-login-btn"
                onClick={this.register}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}
